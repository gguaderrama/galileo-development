import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import NumberFormat from 'react-number-format';
import isEmpty from 'lodash.isempty';
import moment from 'moment';
import DialogoSolicitante from './DialogoSolicitante';
import EnhancedTableToolbar from '../Generic/EnhancedTableToolbar';
import EnhancedTableHead from '../Generic/EnhancedTableHead';
import { stylesTabla } from '../../constants/styles';
import { validaRequeridos } from '../../utilities/validations';
import { DIALOGO_NOTIFICACION_INITIAL_STATE, DIALOGO_NOTIFICACION_CARGANDO } from '../../constants/Generic/index';
import DialogNotificationModal from 'App/_commons/components/DialogNotificationModal';

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const rows = [
  { id: 'nombre', numeric: false, disablePadding: true, label: 'Nombre' },
  { id: 'efectivo-solicitado', numeric: true, disablePadding: false, label: 'Efectivo solicitado' },
  { id: 'monto-seguro', numeric: true, disablePadding: false, label: 'Monto seguro' },
  { id: 'monto-pago', numeric: true, disablePadding: false, label: 'Monto pago' },
  { id: 'tipo-relacion', numeric: false, disablePadding: false, label: 'Tipo relación' },
];

class TablaIntegrantes extends React.Component {

  state = {
    order: 'asc',
    orderBy: 'efectivo-solicitado',
    selected: [],
    page: 0,
    rowsPerPage: 5,
    open: false,
    openDialog: {},
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: this.props.integrantes.map(n => n) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, integrante) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(integrante);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, integrante);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  closeDialog = () => {
    this.setState({ openDialog: DIALOGO_NOTIFICACION_INITIAL_STATE })
  }

  openDialog = (mensaje) => {
      this.setState({ openDialog: mensaje })
  }

  handleClickAceptar = () => {
    this.handleClose();
  }

  handleClickGuardar = () => {
    const { iformularios,
      valuesDatosPersonales,
      valuesDatosEmpleo,
      validaForm,
      fetchValidarZonaAutorizada,
      getEvaluacionReferencias,
      consultarRfcCalculado,
      numeroReferencias
     } = this.props;
    const errorsPersonales = validaRequeridos(
      iformularios,
      ['datospersonalesform', 'datospersonaviveform'],
      valuesDatosPersonales,
      'DatosPersonales',
      validaForm
      );
    const errorsEmpleo = validaRequeridos(
      iformularios,
      ['datosempleoform'],
      valuesDatosEmpleo,
      'DatosEmpleo',
      validaForm
      );
    if (isEmpty(errorsPersonales) && isEmpty(errorsEmpleo)) {
      const solicitud = {
        "tipoProducto":"TRAD",
        "tipoCredito":"N",
        "oficina":{"oficina":254},
        "integrantes":[
          {"persona":
            { "domiciliosParticulares":[
                {"cp":"50000",
                 "colonia":"CENTRO"}],
              "domiciliosEmpleo":[
                {"cp":"50000",
                 "colonia":"CENTRO"}]
            }
          }
        ],
        "categoria":"PFEN"
      } ;
      this.openDialog(DIALOGO_NOTIFICACION_CARGANDO);
      fetchValidarZonaAutorizada(solicitud, () => { }).then(response => {
        if (response.payload.value) {
          const dialogo = {
            opened: true,
            icon: 'text',
            title: 'Zona Autorizada',
            subcontent: response.payload.value,
            flag: false,
          }
          this.openDialog(dialogo);
        } else {
          const referencia = {
            "oficina":254,
            "empresa":"000100000000",
            "categoria":"PFEN",
            "tipoAnalisis":"COMP"
          };
          getEvaluacionReferencias(referencia, () => { }).then(response => {
            const numeroReferenciasPayload = response.payload.numeroReferencias;
            console.log(numeroReferencias, numeroReferenciasPayload);
            if (numeroReferencias === numeroReferenciasPayload){
              const personaRfcCalculado = {
                "nombre":valuesDatosPersonales.nombre,
                "apellidoPaterno":valuesDatosPersonales.apellidoPaterno,
                "apellidoMaterno":valuesDatosPersonales.apellidoMaterno,
                "fechaNacimiento":moment(valuesDatosPersonales.fechaNacimiento, 'YYYY-MM-DD').format('DD/MM/YYYY'),
                "rfcCapturado":valuesDatosPersonales.rfcCapturado
              };
              consultarRfcCalculado(personaRfcCalculado, () => { }).then(response => {
                console.log(response);
                //TODO: implementar guardado de solicitud
                //this.setState({ open: false });
                this.closeDialog();
              });
            } else {
              const dialogoReferencias = {
                opened: true,
                icon: 'text',
                title: 'Referencias',
                subcontent: `Se requieren ${numeroReferenciasPayload} referencias`,
                flag: false,
              }
              this.openDialog(dialogoReferencias);
            }
          });
        }
      });
    } else {
      console.log('Hay errores');
    }
  };

  handleClickDelete = () => {
    this.props.delIntegrante(this.state.selected);
    this.setState({ selected: [] });
  }

  render() {
    const { classes, pantalla, integrantes } = this.props;
    const { order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, integrantes.length - page * rowsPerPage);
    let nombreCompleto = '';
    return (
      <div style={{ padding: "24px" }}>
        <Paper className={classes.root}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            handleClickEdit={this.handleClickOpen}
            handleClickDelete={this.handleClickDelete}
            selected={selected}/>
          <div className={classes.tableWrapper}>
            <Table className={classes.table} aria-labelledby="tableTitle">
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onRequestSort={this.handleRequestSort}
                rowCount={integrantes.length}
                rows={rows}
              />
              <TableBody>
                {stableSort(integrantes, getSorting(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(n => {
                    const isSelected = this.isSelected(n);
                    if (pantalla && n.apellidoMaterno) {
                      nombreCompleto = `${n.nombre} ${n.apellidoPaterno} ${n.apellidoMaterno}`;

                    } else if (pantalla && !n.apellidoMaterno) {
                      nombreCompleto = `${n.nombre} ${n.apellidoPaterno}`;
                    }

                    return (
                      <TableRow
                        hover
                        onClick={event => this.handleClick(event, n)}
                        role="checkbox"
                        aria-checked={isSelected}
                        tabIndex={-1}
                        key={pantalla ? n.nombre : n.persona}
                        selected={isSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox color="primary" checked={isSelected} />
                        </TableCell>
                        {pantalla ?
                          <TableCell component="th" scope="row" padding="none">
                            {nombreCompleto}
                          </TableCell>
                          : <TableCell component="th" scope="row" padding="none">
                            {`${n.persona.nombre} ${n.persona.apellidoPaterno} ${n.persona.apellidoMaterno}`}
                          </TableCell>

                        }
                        <TableCell>
                        <NumberFormat value={n.efectivoSolicitado} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2}/>
                        </TableCell>
                        <TableCell >{n.fat}</TableCell>
                        <TableCell >
                          <NumberFormat value={n.montoPago} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2}/>
                        </TableCell>
                        <TableCell >{n.relacionConPersona}</TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 49 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <TablePagination
            component="div"
            count={integrantes.length}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
              'aria-label': 'Previous Page',
            }}
            nextIconButtonProps={{
              'aria-label': 'Next Page',
            }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
          <DialogoSolicitante
              pantalla={pantalla}
              open={this.state.open}
              onClose={this.handleClose}
              handleClickAceptar={this.handleClickAceptar}
              integrante={selected}></DialogoSolicitante>
          <DialogNotificationModal
            {...this.state.openDialog}
            handleClose={this.closeDialog}
            handleOnClose={this.closeDialog} />
        </Paper>
      </div>
    );
  }
}

TablaIntegrantes.propTypes = {
  classes: PropTypes.object.isRequired,
  pantalla: PropTypes.bool,
  integrantes: PropTypes.array,
  delIntegrante: PropTypes.func,
  iformularios: PropTypes.array,
  valuesDatosPersonales: PropTypes.object,
  valuesDatosEmpleo: PropTypes.object,
  fetchValidarZonaAutorizada: PropTypes.func.isRequired,
  getEvaluacionReferencias: PropTypes.func.isRequired,
  consultarRfcCalculado: PropTypes.func.isRequired,
  numeroReferencias: PropTypes.number,
};

export default withStyles(stylesTabla)(TablaIntegrantes);
