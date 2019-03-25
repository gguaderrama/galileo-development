import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { DETALLES_PROSPECTO_DESTINOS_COLUMNS } from '../../constants/GestionAsignacionProspectos';
import { styles } from './styles/styles';
import { withStyles } from '@material-ui/core/styles';

const TabAsignacion = props => {
    const { classes } = props;
    const { destinos } = props.selectedProspect;
    return (
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
                        {DETALLES_PROSPECTO_DESTINOS_COLUMNS.map(column => column && <TableCell className={classes.tableCell} key={column.key}>{column.label}</TableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {destinos.map(destino => {
                        return (
                            <TableRow
                                hover={true}
                                key={destino.codigoDestino}
                            >
                                <TableCell className={classes.tableCell}>{destino.codigoDestino}</TableCell>
                                <TableCell className={classes.tableCell}>{destino.nombreGestor}</TableCell>
                                <TableCell className={classes.tableCell}>{destino.usuarioAsignacion}</TableCell>
                                <TableCell className={classes.tableCell}>
                                    <Moment format="DD/MM/YYYY">
                                        {destino.fechaAsignacion}
                                    </Moment>
                                </TableCell>
                                <TableCell className={classes.tableCell}>
                                    <Moment format="DD/MM/YYYY">
                                        {destino.fechaUltMod}
                                    </Moment>
                                </TableCell>
                                <TableCell className={classes.tableCell}>{destino.usuarioUltMod}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
};

TabAsignacion.propTypes = {
    selectedProspect: PropTypes.object.isRequired,
};

export default withStyles(styles)(TabAsignacion);