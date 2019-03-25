import React from 'react';
import PropTypes from 'prop-types';
import { BUSQUEDA_PROSPECTOS_COLUMNS } from '../../constants/GestionAsignacionProspectos';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import TablePagination from '@material-ui/core/TablePagination';
import Moment from 'react-moment';
import { styles } from './styles/styles';
import { withStyles } from '@material-ui/core/styles';

const PanelResultadosBusquedaProspecto = props => {
    const { classes } = props;
    const { prospectos, paginacionProspectos } = props;
    const { handleSelectedProspectChange } = props;
    const { handleProspectosPageChange } = props;
    return (
        <div
            style={
                {
                    height: '100%',
                    width: '100%',
                }
            }
        >
            {
                prospectos.length > 0 &&
                <div
                    style={
                        {
                            height: '100%',
                            margin: 10
                        }
                    }
                >
                    <div
                        style={
                            {
                                height: 'calc(10% - 10px)',
                            }
                        }
                    >
                        <Typography
                            variant='h6'
                        >
                            Resultados de la búsqueda
                        </Typography>
                    </div>
                    <div
                        style={
                            {
                                height: 'calc(80% - 10px)',
                                overflow: 'auto'
                            }
                        }
                    >
                        <Table>
                            <TableHead>
                                <TableRow>
                                    {BUSQUEDA_PROSPECTOS_COLUMNS.map(column => column && <TableCell className={classes.tableCellHeader} key={column.key} variant='head'>{column.label}</TableCell>)}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {prospectos.map(prospecto =>
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
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    <div
                        style={
                            {
                                height: 'calc(10% - 20px)',
                            }
                        }
                    >
                        <TablePagination
                            component="div"
                            count={paginacionProspectos.total}
                            rowsPerPage={10}
                            rowsPerPageOptions={[]}
                            page={paginacionProspectos.page}
                            labelDisplayedRows={paginationProperties => `Mostrando Registros ${paginationProperties.from}-${paginationProperties.to} de ${paginationProperties.count}`}
                            backIconButtonProps={{
                                'aria-label': 'Previous Page',
                            }}
                            nextIconButtonProps={{
                                'aria-label': 'Next Page',
                            }}
                            onChangePage={handleProspectosPageChange}
                        >
                        </TablePagination>
                    </div>
                </div>
            }
        </div>
    );
};

PanelResultadosBusquedaProspecto.propTypes = {
    paginacionProspectos: PropTypes.object.isRequired,

    handleSelectedProspectChange: PropTypes.func.isRequired,

    handleProspectosPageChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(PanelResultadosBusquedaProspecto);