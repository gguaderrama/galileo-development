import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
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
  { id: 'nombre', numeric: false, disablePadding: true, label: 'Nombre' },
  { id: 'apellido-paterno', numeric: false, disablePadding: false, label: 'Apellido Paterno' },
  { id: 'apellido-materno', numeric: false, disablePadding: false, label: 'Apellido Materno' },
  { id: 'relacion', numeric: false, disablePadding: false, label: 'Relación' },
  { id: 'porcentaje-suma-asegurada', numeric: false, disablePadding: false, label: 'Porcentaje Suma Asegurada' },
];

class TablaBeneficiarios extends React.Component {
  state = {
    order: 'asc',
    orderBy: 'nombre',
    selected: [],
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
      this.setState(state => ({ selected: this.props.beneficiarios.map(n => n) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, beneficiario) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(beneficiario);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, beneficiario);
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

  isSelected = beneficiario => this.state.selected.indexOf(beneficiario) !== -1;

  handleClickDelete = () => {
    const { beneficiarios, handleClickDeleteBeneficiario } = this.props;
    const { selected } = this.state;
    selected.forEach(beneficiario => {
      const selectedIndex = beneficiarios.indexOf(beneficiario);
      handleClickDeleteBeneficiario(selectedIndex);
    });
    this.setState({ selected: [] });
  }

  render() {
    const { classes, beneficiarios, maxBeneficiarios, handleClickOpen, index } = this.props;
    const { order, orderBy, selected, rowsPerPage, page } = this.state;
    //const emptyRows = rowsPerPage - Math.min(rowsPerPage, beneficiarios.length - page * rowsPerPage);
    return (
      <Paper className={index % 2 ? classes.rootnon : classes.rootpar} >
        <EnhancedTableToolbar 
          numSelected={selected.length} 
          handleClickAdd={handleClickOpen}
          handleClickDelete={this.handleClickDelete} 
          maxRows={maxBeneficiarios}
          totalRows={beneficiarios.length}
          titulo='Beneficiarios' />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={beneficiarios.length}
              rows={rows}
            />
            <TableBody>
              {stableSort(beneficiarios, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((n, index) => {
                  const isSelected = this.isSelected(n);
                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleClick(event, n)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={index}
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isSelected} color="primary"/>
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        {n.nombre}
                      </TableCell>
                      <TableCell >{n.apellidoPaterno}</TableCell>
                      <TableCell >{n.apellidoMaterno}</TableCell>
                      <TableCell >{n.codigoRelacion}</TableCell>
                      <TableCell >{n.pctSumaAsegurada}</TableCell>
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

TablaBeneficiarios.propTypes = {
  classes: PropTypes.object.isRequired,
  beneficiarios: PropTypes.array,
  handleClickDeleteBeneficiario: PropTypes.func.isRequired,
  maxBeneficiarios: PropTypes.number.isRequired,
};

export default withStyles(stylesTabla)(TablaBeneficiarios);