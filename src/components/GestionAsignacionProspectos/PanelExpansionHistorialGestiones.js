import React from 'react';
import PropTypes from 'prop-types';
import { GESTION_PERSONA_HISTORIAL_GESTIONES_COLUMNS } from '../../constants/GestionAsignacionProspectos';
import { CATALOGO_MEDIOS_GESTION, CATALOGO_RESPUESTAS_GESTION } from '../../constants/Generic';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Moment from 'react-moment';
import { styles } from './styles/styles';
import { withStyles } from '@material-ui/core/styles';

const PanelExpansionHistorialGestiones = props => {
    const { classes } = props;
    const { gestiones } = props.selectedProspect;
    return (
        <div
            style={
                {
                    marginTop: 20
                }
            }
        >
            {
                gestiones.length > 0 &&
                <ExpansionPanel>
                    <ExpansionPanelSummary
                        expandIcon={<Icon>expand_more</Icon>}
                    >
                        <Tooltip title='Historial Gestiones'>
                            <div className={classes.divButtonContainer}>
                                {<Icon className={classes.button} color='primary'>history</Icon>}
                                <Typography variant='subtitle1'>Historial Gestiones</Typography>
                            </div>
                        </Tooltip>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <div
                            style={
                                {
                                    width: '100%'
                                }
                            }
                        >
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        {GESTION_PERSONA_HISTORIAL_GESTIONES_COLUMNS.map(column => column && <TableCell className={classes.tableCell} key={column.key}>{column.label}</TableCell>)}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {gestiones.map(gestion => {
                                        return (
                                            <TableRow
                                                hover={true}
                                                key={gestion.idGestion}
                                            >
                                                <TableCell className={classes.tableCell}>{gestion.idGestion}</TableCell>
                                                <TableCell className={classes.tableCell}>{gestion.periodo}</TableCell>
                                                <TableCell className={classes.tableCell}>{gestion.codigoCampania}</TableCell>
                                                <TableCell className={classes.tableCell}>
                                                    <Moment format="DD/MM/YYYY HH:mm">
                                                        {gestion.fechaGestion}
                                                    </Moment>
                                                </TableCell>
                                                <TableCell className={classes.tableCell}>{gestion.gestor}</TableCell>
                                                <TableCell className={classes.tableCell}>{CATALOGO_MEDIOS_GESTION.find(medioGestion => medioGestion.claveMedioGestion === gestion.codigoContacto).nombreMedioGestion}</TableCell>
                                                <TableCell className={classes.tableCell}>{CATALOGO_RESPUESTAS_GESTION.find(respuestaGestion => respuestaGestion.claveRespuestaGestion === gestion.codigoResultado).nombreRespuestaGestion}</TableCell>
                                                <TableCell className={classes.tableCell}>{gestion.comentarios}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            }
        </div>
    );
};

PanelExpansionHistorialGestiones.propTypes = {
    selectedProspect: PropTypes.object.isRequired,
};

export default withStyles(styles)(PanelExpansionHistorialGestiones);