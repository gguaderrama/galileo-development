import React from 'react';
import PropTypes from 'prop-types';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import { DATOS_BUSQUEDA_PERSONA } from 'constants/RegistroSolicitud/registroSolicitud';
import { withStyles } from '@material-ui/core/styles';
import { registroStyle } from './styles/styles'


const ResultadoBusqueda = props => {
    const { classes } = props;
    const { clientes, handleSelectedPersonChange, catalogoEstados } = props;
    return (
        <div className={classes.containerBusqueda} >
            <Paper className={classes.resultado}>
                <Typography
                    align='left'
                    color="inherit">
                    Resultados de la búsqueda
                   </Typography>
                <Table>
                    <TableHead  >
                        <TableRow>
                            {DATOS_BUSQUEDA_PERSONA.map(fila => {
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
                    {clientes && clientes.length > 0 &&
                        <TableBody>
                            {clientes.map((cliente, i) => {
                                const estado = catalogoEstados.filter(estado => estado.codigoEstado === cliente.codigoEstado);
                                const domicilioAsocioado = cliente.domiciliosParticulares.find(domicilio => domicilio.asociadoUltSolicitud === 'S')
                                const domicilioAsociadoEmpleo = cliente.domiciliosEmpleo.find(domicilioEmpleo => domicilioEmpleo.asociadoUltSolicitud === 'S')
                                return (
                                    <TableRow hover={true} key={i}>
                                        <TableCell className={classes.tableCell}>{cliente.persona}</TableCell>
                                        <TableCell className={classes.tableCell} >{`${cliente.nombre} ${cliente.apellidoPaterno} ${cliente.apellidoMaterno}`}</TableCell>
                                        <TableCell className={classes.tableCell} >{cliente.rfcCalculado}</TableCell>
                                        <TableCell className={classes.tableCell} >{estado.length > 0 ? estado[0].descripcion : '-'}</TableCell>
                                        <TableCell className={classes.tableCell} >{cliente.relacionConPersona}</TableCell>
                                        <TableCell className={classes.tableCell} >{domicilioAsocioado ?
                                            `CALLE: ${domicilioAsocioado.calle} NÚM: ${domicilioAsocioado.noExterior} CP: ${domicilioAsocioado.cp} COLONIA: ${domicilioAsocioado.colonia} MUNICIPIO/DELEGACIÓN: ${domicilioAsocioado.municipioDelegacion}`
                                            : '-'}</TableCell>
                                        <TableCell className={classes.tableCell}>{domicilioAsociadoEmpleo ?
                                            `CALLE: ${domicilioAsociadoEmpleo.calle} NÚM: ${domicilioAsociadoEmpleo.noExterior} CP: ${domicilioAsociadoEmpleo.cp} COLONIA: ${domicilioAsociadoEmpleo.colonia} MUNICIPIO/DELEGACIÓN: ${domicilioAsociadoEmpleo.municipioDelegacion}`
                                            : '-'}</TableCell>
                                        <Tooltip title="Seleccionar persona">
                                            <TableCell className={classes.tableCell}>
                                                <IconButton
                                                    color="primary"
                                                    onClick={() => handleSelectedPersonChange(cliente)}>
                                                    <Icon>person_add</Icon>
                                                </IconButton>{cliente.agregar}
                                            </TableCell>
                                        </Tooltip>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    }
                </Table>
            </Paper>
        </div >
    );
};

ResultadoBusqueda.propTypes = {
    clientes: PropTypes.array,
    catalogoEstados: PropTypes.array,
    classes: PropTypes.object.isRequired,
    handleSelectedPersonChange: PropTypes.func.isRequired,
};

export default withStyles(registroStyle)(ResultadoBusqueda);