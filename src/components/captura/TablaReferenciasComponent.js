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
import EnhancedTableToolbar from '../Generic/EnhancedTableToolbar';
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
  { id: 'tipo-referencia', numeric: false, disablePadding: true, label: 'Tipo Referencia' },
  { id: 'nombre', numeric: true, disablePadding: false, label: 'Nombre' },
  { id: 'apellido-paterno', numeric: true, disablePadding: false, label: 'Apellido Paterno' },
  { id: 'apellido-materno', numeric: true, disablePadding: false, label: 'Apellido Materno' },
  { id: 'te-part', numeric: false, disablePadding: false, label: 'Teléfono Particular' },
  { id: 'tel-cel', numeric: true, disablePadding: false, label: 'Teléfono Celular' },
  { id: 'parentesco', numeric: false, disablePadding: false, label: 'Parentesco' },
];

class TablaReferencias extends React.Component {
  state = {
    order: 'asc',
    orderBy: 'efectivo-solicitado',    
    page: 0,
    rowsPerPage: 5,
    open: false,
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };
  
  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = referencia => this.props.selected.indexOf(referencia) !== -1;

  render() {
    const { classes, referencias, handleClickOpen, handleClick, selected, handleSelectAllClick, handleDeleteClick } = this.props;
    const { order, orderBy, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, referencias.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar 
          numSelected={selected.length} 
          handleClickAdd={handleClickOpen} 
          handleClickEdit={handleClickOpen}
          handleClickDelete={handleDeleteClick} 
          selected={selected}/>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={referencias.length}
              rows={rows}
            />
            <TableBody>
              {stableSort(referencias, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((n, index) => {
                  const isSelected = this.isSelected(n);
                  return (
                    <TableRow
                      hover
                      onClick={event => handleClick(event, n)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={index}
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isSelected} />
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        {n.persona}
                      </TableCell>
                      <TableCell >{n.nombre}</TableCell>
                      <TableCell >{n.apellidoPaterno}</TableCell>
                      <TableCell >{n.apellidoMaterno}</TableCell>
                      <TableCell >{n.telefonos && n.telefonos.find(telefono => telefono.tipoPlan === 'FIJO') && n.telefonos.find(telefono => telefono.tipoPlan === 'FIJO').telefono}</TableCell>
                      <TableCell >{n.telefonos && n.telefonos.find(telefono => telefono.tipoPlan === 'MOVIL') && n.telefonos.find(telefono => telefono.tipoPlan === 'MOVIL').telefono}</TableCell>
                      <TableCell >{n.codigoRelacion}</TableCell>
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
          count={referencias.length}
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
      </Paper>
    );
  }
}

TablaReferencias.propTypes = {
  classes: PropTypes.object.isRequired,
  referencias: PropTypes.array,
  handleClickOpen: PropTypes.func.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  selected: PropTypes.array.isRequired,
  handleSelectAllClick: PropTypes.func.isRequired,
};

export default withStyles(stylesTabla)(TablaReferencias);
