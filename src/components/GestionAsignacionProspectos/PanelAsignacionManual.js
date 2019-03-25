import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { PANEL_ASIGNACION_MANUAL_COLUMNS } from '../../constants/GestionAsignacionProspectos';
import { styles } from './styles/styles';
import { withStyles } from '@material-ui/core/styles';

const PanelAsignacionManual = props => {
    const { classes } = props;
    const { title } = props;
    return (
        <div
            style={
                {
                    margin: 10
                }
            }
        >
            <div>
                <Typography
                    variant='h6'
                    style={
                        {
                            textAlign: 'left'
                        }
                    }
                >
                    {title}
                </Typography>
            </div>
            <div>
                <Table>
                    <TableHead>
                        <TableRow>
                            {PANEL_ASIGNACION_MANUAL_COLUMNS.map(column => column && <TableCell className={classes.tableCellHeader} key={column.key} variant='head'>{column.label}</TableCell>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* {prospectos.map(prospecto =>
                        <TableRow
                            hover={true}
                            key={`${prospecto.claveEmpresa}-${prospecto.codigoCampania}-${prospecto.periodo}-${prospecto.idProspecto}`}
                        >
                            <TableCell className={classes.tableCell}>{prospecto.persona}</TableCell>
                            <TableCell className={classes.tableCell}>{`${prospecto.nombre} ${prospecto.apellidoPat} ${prospecto.apellidoMat}`}</TableCell>
                            <TableCell className={classes.tableCell}>{prospecto.contrato}</TableCell>
                            <TableCell className={classes.tableCell}>{prospecto.status}</TableCell>
                            <TableCell className={classes.tableCell}>{prospecto.descripcionCodigoMotivoStatus}</TableCell>
                            <TableCell className={classes.tableCell}>{prospecto.nombreOficina}</TableCell>
                            {prospecto.fechaUltGestion !== null ?
                                <TableCell className={classes.tableCell}>
                                    <Moment format="DD/MM/YYYY">
                                        {prospecto.fechaUltGestion}
                                    </Moment>
                                </TableCell> :
                                <TableCell className={classes.tableCell}>{'-'}</TableCell>
                            }
                            <TableCell className={classes.tableCell}>{prospecto.destinos[0].nombreGestor}</TableCell>
                            <TableCell className={classes.tableCell}>{prospecto.descripcionUltGestionPrincipal !== null ? prospecto.descripcionUltGestionPrincipal : '-'}</TableCell>
                            <TableCell className={classes.tableCell}>{prospecto.descripcionUltGestionSecundaria !== null ? prospecto.descripcionUltGestionSecundaria : '-'}</TableCell>
                            <TableCell className={classes.tableCell}>
                                <Moment format="DD/MM/YYYY">
                                    {prospecto.fechaUltMod}
                                </Moment>
                            </TableCell>
                            <TableCell className={classes.tableCell}>
                                <Tooltip title="Ver Detalle">
                                    <IconButton
                                        color="primary"
                                        onClick={() => handleSelectedProspectChange(prospecto)}
                                    >
                                        <Icon>visibility</Icon>
                                    </IconButton>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    )} */}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

PanelAsignacionManual.propTypes = {
    title: PropTypes.string.isRequired,
};

export default withStyles(styles)(PanelAsignacionManual);