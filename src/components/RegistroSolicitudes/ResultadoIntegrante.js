import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';
import { DATOS_BUSQUEDA_INTEGRANTE } from '../../constants/RegistroSolicitud/registroSolicitud';
import { toolbarStyles, registroStyle } from './styles/styles'
import { withStyles } from '@material-ui/core/styles';

const TableIntegranteHead = props => {
    const { onSelectAllClick, numSelected, rowCount, classes } = props;
    return (
        <TableHead>
            <TableRow>
                <TableCell>
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={numSelected === rowCount}
                        onChange={onSelectAllClick} />
                </TableCell>
                {DATOS_BUSQUEDA_INTEGRANTE.map(fila => {
                    return (
                        <TableCell
                            className={classes.tableCell}
                            key={fila.id}>
                            {fila.label}
                        </TableCell>
                    );
                })}
            </TableRow>
        </TableHead>
    );
}

let EnhancedTableToolbar = props => {
    const { numSelected, classes, handleSelectedAddPerson } = props;
    return (
        <Toolbar >
            <div className={classes.spacer} />
            {numSelected === 1 ? (
                <Tooltip title="Añadir a lista de integrantes">
                    <IconButton onClick={handleSelectedAddPerson}>
                        <Icon >add_box</Icon>
                    </IconButton>
                </Tooltip>

            ) : null
            }
        </Toolbar >
    );
};
EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const ResultadoIntegrante = props => {
    const { classes } = props;
    const { clientes, selectedbusqueda } = props;
    const { isSelectedPerson, handleClickPerson, handleSelectedAddPerson, handleSelectAllClickClientes } = props;
    let personaSelected = false;

    return (
        <div style={{
            textAlign: 'center',
            height: 'calc(100% - 20px)',

        }} >

            <Typography align="left"
                color="inherit">
                Resultado
                   </Typography>
            <EnhancedTableToolbar handleSelectedAddPerson={handleSelectedAddPerson} numSelected={selectedbusqueda.length} />
            <Table className={classes.tablaPreScoreRoot}>
                <TableIntegranteHead
                    numSelected={selectedbusqueda.length}
                    onSelectAllClick={handleSelectAllClickClientes}
                    rowCount={clientes.length}
                    classes={classes} />
                {
                    clientes && clientes.length > 0 &&
                    <TableBody >
                        {clientes.map((cliente, i) => {
                            personaSelected = isSelectedPerson(cliente);
                            return (
                                <TableRow hover={true} key={i} selected={personaSelected}
                                    onClick={event => handleClickPerson(event, cliente)}>
                                    <TableCell>
                                        <Checkbox color="primary" checked={personaSelected}
                                        />
                                    </TableCell>
                                    <TableCell className={classes.tableCell} >{cliente.persona}</TableCell>
                                    <TableCell className={classes.tableCell} >{`${cliente.nombre} ${cliente.apellidoPaterno} ${cliente.apellidoMaterno}`}</TableCell>
                                    <TableCell className={classes.tableCell} >{cliente.rfcCalculado}</TableCell>
                                    <TableCell className={classes.tableCell} >{cliente.codigoEstado}</TableCell>
                                    <TableCell className={classes.tableCell} >{cliente.relacionConPersona}</TableCell>
                                    <TableCell className={classes.tableCell} >{cliente.domicilio}</TableCell>
                                    <TableCell className={classes.tableCell}>{cliente.domEmpleo}</TableCell>

                                </TableRow>
                            );
                        })}
                    </TableBody>
                }
            </Table>


        </div >
    );
};



export default withStyles(registroStyle)(ResultadoIntegrante);