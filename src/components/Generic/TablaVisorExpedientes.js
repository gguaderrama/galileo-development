import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import EnhancedTableHead from '../Generic/EnhancedTableHead';
import { stylesTabla } from '../../constants/styles';


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
  { id: 'solicitud', numeric: false, disablePadding: true, label: 'Solicitud' },
  { id: 'contrato', numeric: false, disablePadding: false, label: 'Contrato' },
  { id: 'cliente', numeric: false, disablePadding: false, label: 'Cliente' },
  { id: 'nombre', numeric: false, disablePadding: false, label: 'Nombre' },
  { id: 'hora-registro', numeric: false, disablePadding: false, label: 'Hora Registro' },
  { id: 'hora-resolucion-col', numeric: false, disablePadding: false, label: 'Hora Resolución COL' },
  { id: 'hora-resolucion-coa', numeric: false, disablePadding: false, label: 'Hora Resolución COA' },
  { id: 'nombre-archivo', numeric: false, disablePadding: false, label: 'Nombre Archivo' },
  { id: 'expediente', numeric: false, disablePadding: false, label: 'Expediente' },
];

class TablaVisorExpedientes extends React.Component {
  state = {
    order: 'asc',
    orderBy: 'solicitud',
    page: 0,
    rowsPerPage: 5,
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

//   handleSelectAllClick = event => {
//     if (event.target.checked) {
//       this.setState(state => ({ selected: this.props.telefonos.map(n => n) }));
//       return;
//     }
//     this.setState({ selected: [] });
//   };
  
  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  //isSelected = telefono => this.props.selected.indexOf(telefono) !== -1;

  handleClickDelete = () => {
    this.props.delTelefono(this.state.selected);
    this.setState({ selected: [] });
  }

  render() {
    const { classes, expedientes, handleClickExpediente } = this.props;
    const { order, orderBy, rowsPerPage, page } = this.state;
    //const emptyRows = rowsPerPage - Math.min(rowsPerPage, expedientes.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              rowCount={expedientes.length}
              rows={rows}
            />
            <TableBody>
              {stableSort(expedientes, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((n,index) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={index}
                    >
                      <TableCell component="th" scope="row" padding="none">
                        {n.solicitud}
                      </TableCell>
                      <TableCell >{n.contrato}</TableCell>
                      <TableCell >{n.cliente}</TableCell>
                      <TableCell >{n.nombreCliente}</TableCell>
                      <TableCell >{n.horaRegistro}</TableCell>
                      <TableCell >{n.horaResolucionCol}</TableCell>
                      <TableCell >{n.horaResolucionCoa}</TableCell>
                      <TableCell >{n.nombreArchivo}</TableCell>
                      <TableCell >
                        <IconButton aria-label="Ver expediente" onClick={() => {handleClickExpediente(n.nombreArchivo)}}>
                            <PictureAsPdfIcon color="primary" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {/* {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )} */}
            </TableBody>
          </Table>
        </div>
      </Paper>
    );
  }
}

TablaVisorExpedientes.propTypes = {
  classes: PropTypes.object.isRequired,
  expedientes: PropTypes.array.isRequired,
  handleClickExpediente: PropTypes.func.isRequired,
};

export default withStyles(stylesTabla)(TablaVisorExpedientes);
