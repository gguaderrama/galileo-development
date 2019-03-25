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
  { id: 'tipo-telefono', numeric: false, disablePadding: true, label: 'Tipo Teléfono' },
  { id: 'telefono', numeric: false, disablePadding: false, label: 'Teléfono' },
  { id: 'plan', numeric: false, disablePadding: false, label: 'Plan' },
  { id: 'proveedor', numeric: false, disablePadding: false, label: 'Proveedor' },
  { id: 'fecha-verificacion-telefono', numeric: false, disablePadding: false, label: 'Fecha Verificación' },
];

class TablaTelefonos extends React.Component {
  state = {
    order: 'asc',
    orderBy: 'efectivo-solicitado',
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

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: this.props.telefonos.map(n => n) }));
      return;
    }
    this.setState({ selected: [] });
  };
  
  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = telefono => this.props.selected.indexOf(telefono) !== -1;

  render() {
    const { classes, telefonos, handleClick, selected, handleClickDelete, handleClickEdit } = this.props;
    const { order, orderBy, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, telefonos.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar 
          numSelected={selected.length} 
          handleClickDelete={handleClickDelete}
          handleClickEdit={handleClickEdit} 
          selected={selected}/>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={telefonos.length}
              rows={rows}
            />
            <TableBody>
              {stableSort(telefonos, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const isSelected = this.isSelected(n);
                  return (
                    <TableRow
                      hover
                      onClick={event => handleClick(event, n)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.telefono}
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isSelected} />
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        {n.tipoTelefono}
                      </TableCell>
                      <TableCell >{n.telefono}</TableCell>
                      <TableCell >{n.tipoPlan}</TableCell>
                      <TableCell >{n.claveProveedorServicios}</TableCell>
                      <TableCell >{n.fechaStatus}</TableCell>
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
          count={telefonos.length}
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

TablaTelefonos.propTypes = {
  classes: PropTypes.object.isRequired,
  telefonos: PropTypes.array.isRequired,
  handleClickDelete: PropTypes.func.isRequired,
  handleClickEdit: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  selected: PropTypes.array.isRequired,
};

export default withStyles(stylesTabla)(TablaTelefonos);
