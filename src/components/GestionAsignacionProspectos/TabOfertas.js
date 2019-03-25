import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { styles } from './styles/styles';
import { withStyles } from '@material-ui/core/styles';
import { DETALLES_PROSPECTO_OFERTAS_PRODUCTO_ACTUAL_COLUMNS, DETALLES_PROSPECTO_OFERTAS_PRODUCTOS_NUEVOS_COLUMNS } from '../../constants/GestionAsignacionProspectos';

const TabOfertas = props => {
    const { classes } = props;
    const { tipoProductoUltContrato, descripcionCatUltContrato, descripcionCodProducUltContrato, montoUltContrato, plazoUltContrato, frecuenciaPagoUltContrato, montoPagoUltContrato, tasaUltContrato } = props.selectedProspect;
    const { ofertas } = props.selectedProspect;
    return (
        <div>
            <div>
                <Typography
                    variant="subtitle1"
                    style={
                        {
                            fontWeight: 500
                        }
                    }
                >
                    Producto Actual
                </Typography>
                <div
                    style={
                        {
                            margin: 10
                        }
                    }
                >
                    <Table>
                        <TableHead>
                            <TableRow>
                                {DETALLES_PROSPECTO_OFERTAS_PRODUCTO_ACTUAL_COLUMNS.map(column => column && <TableCell className={classes.tableCell} key={column.key}>{column.label}</TableCell>)}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow
                                hover={true}
                                key={0}
                            >
                                <TableCell className={classes.tableCell}>{tipoProductoUltContrato}</TableCell>
                                <TableCell className={classes.tableCell}>{descripcionCatUltContrato}</TableCell>
                                <TableCell className={classes.tableCell}>{descripcionCodProducUltContrato}</TableCell>
                                <TableCell className={classes.tableCell}>{montoUltContrato}</TableCell>
                                <TableCell className={classes.tableCell}>{plazoUltContrato}</TableCell>
                                <TableCell className={classes.tableCell}>{frecuenciaPagoUltContrato}</TableCell>
                                <TableCell className={classes.tableCell}>{montoPagoUltContrato}</TableCell>
                                <TableCell className={classes.tableCell}>{tasaUltContrato}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>
            <div
                style={
                    {
                        marginTop: 50
                    }
                }
            >
                <Typography
                    variant="subtitle1"
                    style={
                        {
                            fontWeight: 500
                        }
                    }
                >
                    Productos Nuevos
                </Typography>
                <div
                    style={
                        {
                            margin: 10
                        }
                    }
                >
                    <Table>
                        <TableHead>
                            <TableRow>
                                {DETALLES_PROSPECTO_OFERTAS_PRODUCTOS_NUEVOS_COLUMNS.map(column => column && <TableCell className={classes.tableCell} key={column.key}>{column.label}</TableCell>)}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {ofertas.map(oferta => {
                                return (
                                    <TableRow
                                        hover={true}
                                        key={oferta.idOferta}
                                    >
                                        <TableCell className={classes.tableCell}>{oferta.idOferta}</TableCell>
                                        <TableCell className={classes.tableCell}>{oferta.tipoProducto}</TableCell>
                                        <TableCell className={classes.tableCell}>{oferta.descripcionCatOferta}</TableCell>
                                        <TableCell className={classes.tableCell}>{oferta.descripcionCodProducOferta}</TableCell>
                                        <TableCell className={classes.tableCell}>{oferta.montoMinimo}</TableCell>
                                        <TableCell className={classes.tableCell}>{oferta.montoMaximo}</TableCell>
                                        <TableCell className={classes.tableCell}>{oferta.frecuenciaPago}</TableCell>
                                        <TableCell className={classes.tableCell}>{oferta.tasa}</TableCell>
                                        <TableCell className={classes.tableCell}>{oferta.plazo}</TableCell>
                                        <TableCell className={classes.tableCell}>{oferta.montoPago}</TableCell>
                                        <TableCell className={classes.tableCell}>{oferta.grupoRenovacion}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

TabOfertas.propTypes = {
    selectedProspect: PropTypes.object.isRequired,
};

export default withStyles(styles)(TabOfertas);