import React from 'react';
import PropTypes from 'prop-types';
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
import { BUSQUEDA_CITAS_COLUMNS } from '../../constants/GestionAsignacionProspectos';


const TabCitas = props => {
    const { classes } = props;
    const { citas, paginacionCitas } = props;
    const { handleSelectedDateChange , handleCitasPageChange } = props;
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
                citas.length > 0 &&
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
                                    {BUSQUEDA_CITAS_COLUMNS.map(column => column && <TableCell className={classes.tableCellHeader} key={column.key} variant='head'>{column.label}</TableCell>)}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {citas.map(cita =>
                                    <TableRow
                                        hover={true}
                                        key={`${cita.claveEmpresa}-${cita.codigoCampania}-${cita.periodo}-${cita.idProspecto}-${cita.idGestion}`}
                                    >
                                        <TableCell className={classes.tableCell}>
                                            <Moment format='DD/MM/YYYY'>
                                                {cita.fechaCita}
                                            </Moment>
                                        </TableCell>
                                        <TableCell className={classes.tableCell}>
                                            <Moment format='LTS'>
                                                {cita.horaCita}
                                            </Moment>
                                        </TableCell>
                                        <TableCell className={classes.tableCell}>{cita.idProspecto}</TableCell>
                                        <TableCell className={classes.tableCell}>{cita.nombreProspecto}</TableCell>
                                        <TableCell className={classes.tableCell}>{cita.codigoCampania}</TableCell>
                                        <TableCell className={classes.tableCell}>{cita.codigoResultado === 'LLDP' ? 'TELEFONICA' : 'SUCURSAL'}</TableCell>
                                        <TableCell className={classes.tableCell}>{cita.nombreGestor}</TableCell>
                                        <TableCell className={classes.tableCell}>
                                            <Tooltip title="Ver Detalle">
                                                <IconButton
                                                    color="primary"
                                                    onClick={() => handleSelectedDateChange(cita)}
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
                            component='div'
                            count={paginacionCitas.total}
                            rowsPerPage={10}
                            rowsPerPageOptions={[]}
                            page={paginacionCitas.page}
                            labelDisplayedRows={paginationProperties => `Mostrando Registros ${paginationProperties.from}-${paginationProperties.to} de ${paginationProperties.count}`}
                            backIconButtonProps={{
                                'aria-label': 'Previous Page',
                            }}
                            nextIconButtonProps={{
                                'aria-label': 'Next Page',
                            }}
                            onChangePage={handleCitasPageChange}
                        >
                        </TablePagination>
                    </div>
                </div>
            }
        </div>
    );
};

TabCitas.propTypes = {
    paginacionCitas: PropTypes.object.isRequired,

    handleSelectedDateChange: PropTypes.func.isRequired,
    handleCitasPageChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(TabCitas);