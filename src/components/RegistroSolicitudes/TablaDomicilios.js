import React from 'react';
import PropTypes from 'prop-types';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { toolbarStyles } from './styles/styles'
import { DATOS_DOMICILIO_INTEGRANTES } from '../../constants/RegistroSolicitud/registroSolicitud';
import { registroStyle } from './styles/styles'
import { withStyles } from '@material-ui/core/styles';


const TableDomiciliosHead = props => {
    const { classes, onSelectAllClick, numSelected, rowCount } = props;
    return (
        <TableHead>
            <TableRow>
                <TableCell>
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={numSelected === rowCount}
                        onChange={onSelectAllClick}
                        disabled={numSelected < 1 && true} />
                </TableCell>
                {DATOS_DOMICILIO_INTEGRANTES.map(row => {
                    return (
                        <TableCell
                            className={classes.tableCell}
                            key={row.id}
                            numeric={row.numeric}>
                            {row.label}
                        </TableCell>
                    );
                }, this)}
            </TableRow>
        </TableHead>
    );
}

let EnhancedTableToolbar = props => {
    const { numSelected, classes, handleClickDelete, handleLoadDomicilio } = props;
    return (
        <Toolbar >
            <div className={classes.spacer}>
                <Typography
                    align='left'
                    color="inherit">
                    Domicilios Agregados</Typography>
            </div>
            <div className={classes.actions}>
                {numSelected > 0 ? (
                    <div style={{ display: 'flex' }} >
                        <Tooltip title="Eliminar">
                            <IconButton
                                color="primary"
                                onClick={handleClickDelete}>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Editar">
                            <IconButton
                                color="primary"
                                onClick={handleLoadDomicilio}>
                                <EditIcon />
                            </IconButton>
                        </Tooltip>

                    </div>
                ) : null}
            </div>
        </Toolbar >
    );
};
EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const TablaDomicilios = props => {
    const { classes, domicilios, catalogoEstados, listaCatalogos } = props;
    const { selected } = props;
    const { handleSelectAllClick, handleClickDelete, isSelected, handleClick, handleLoadDomicilio } = props;

    return (
        <div >
            <Paper style={{ marginTop: '24px' }}>
                <EnhancedTableToolbar
                    numSelected={selected.length}
                    handleClickDelete={handleClickDelete}
                    handleLoadDomicilio={handleLoadDomicilio} />

                <Table className={classes.table}>
                    <TableDomiciliosHead
                        classes={classes}
                        numSelected={selected.length}
                        onSelectAllClick={handleSelectAllClick}
                        rowCount={domicilios ? domicilios.length : 2}
                    />
                    <TableBody>
                        {
                            domicilios ? domicilios.map((domicilio, i) => {
                                const domicilioSelected = isSelected(domicilio);
                                const estado = catalogoEstados.filter(estado => estado.codigoEstado === domicilio.codigoEstado);
                                const tipoDomicilioAux = listaCatalogos && listaCatalogos.filter(item => item.tipoCodigo === 'VIVI');
                                const tipoDomicilio = tipoDomicilioAux.length > 0 && tipoDomicilioAux.filter(item => item.codigo === domicilio.tipoVivienda)
                                return (
                                    <TableRow
                                        hover={true}
                                        onClick={event => handleClick(event, domicilio)}
                                        key={i} selected={domicilioSelected}>
                                        <TableCell ><Checkbox color="primary" checked={domicilioSelected} /></TableCell>
                                        <TableCell className={classes.tableCell}>{domicilio.tipoDomicilio}</TableCell>
                                        <TableCell className={classes.tableCell} >{domicilio.calle}</TableCell>
                                        <TableCell className={classes.tableCell} >{domicilio.noExterior}</TableCell>
                                        <TableCell className={classes.tableCell} >{domicilio.noInterior ? domicilio.noInterior : '-'}</TableCell>
                                        <TableCell className={classes.tableCell} >{domicilio.ciudad ? domicilio.ciudad : '-'}</TableCell>
                                        <TableCell className={classes.tableCell} >{domicilio.cp}</TableCell>
                                        <TableCell className={classes.tableCell}>{domicilio.colonia}</TableCell>
                                        <TableCell className={classes.tableCell} >{tipoDomicilio.length > 0 ? tipoDomicilio[0].descripcion : '-'}</TableCell>
                                        <TableCell className={classes.tableCell} >{domicilio.codigoPais ? domicilio.codigoPais : '-'}</TableCell>
                                        <TableCell className={classes.tableCell} >{estado.length > 0 ? estado[0].descripcion : '-'}</TableCell>
                                    </TableRow>
                                );
                            }) : null}
                    </TableBody>
                </Table>
            </Paper>
        </div>
    )
}

TablaDomicilios.propTypes = {
    classes: PropTypes.object,
    domicilios: PropTypes.array,
    selected: PropTypes.array,
    isSelected: PropTypes.func.isRequired,
    handleClick: PropTypes.func.isRequired,
    handleSelectAllClick: PropTypes.func.isRequired,
    handleClickDelete: PropTypes.func

};

export default (withStyles(registroStyle)(TablaDomicilios));
