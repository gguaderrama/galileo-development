import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import { InlineDateTimePicker } from 'material-ui-pickers';
import { Fragment } from 'react';
import { InputAdornment } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import { styles } from './styles/styles';
import { withStyles } from '@material-ui/core/styles';

const PanelGestionProspecto = props => {
    moment.locale('es');
    const { classes } = props;
    const { telefonos } = props.selectedProspect;
    const { selectedProspect, selectedDate } = props;
    const { mediosGestion, medioGestion, respuestasGestion, respuestaGestion, contactoGestion, fechaHoraCitaGestion, comentarioGestion } = props;
    const { handleGestionPersonaMedioGestionChange, handleGestionPersonaRespuestaGestionChange, handleGestionPersonaContactoGestionChange, handleGestionPersonaFechaHoraCitaGestionChange, handleGestionPersonaComentarioGestionChange, handleGestionPersonaRegistrarGestionOnClick } = props;
    return (
        <div
            style={
                {
                    width: '100%'
                }
            }
        >
            <div>
                <FormControl
                    className={classes.formControl}
                    required={true}
                >
                    <InputLabel htmlFor="medio-gestion-simple">Medio</InputLabel>
                    <Select
                        value={medioGestion}
                        onChange={handleGestionPersonaMedioGestionChange}
                        inputProps={{
                            name: 'medio-gestion',
                            id: 'medio-gestion-simple',
                        }}
                    >
                        {mediosGestion.map(catalogoMedioGestion => <MenuItem key={catalogoMedioGestion.claveMedioGestion} value={catalogoMedioGestion.claveMedioGestion}>{catalogoMedioGestion.nombreMedioGestion}</MenuItem>)}
                    </Select>
                </FormControl>
                <FormControl
                    className={classes.formControl}
                    required={true}
                >
                    <InputLabel htmlFor="respuesta-gestion-simple">Respuesta</InputLabel>
                    <Select
                        value={respuestaGestion}
                        onChange={handleGestionPersonaRespuestaGestionChange}
                        inputProps={{
                            name: 'respuesta-gestion',
                            id: 'respuesta-gestion-simple',
                        }}
                    >
                        {respuestasGestion.map(respuestaGestion => <MenuItem key={respuestaGestion.claveRespuestaGestion} value={respuestaGestion.claveRespuestaGestion}>{respuestaGestion.nombreRespuestaGestion}</MenuItem>)}
                    </Select>
                </FormControl>
                <FormControl
                    className={classes.formControl}
                    required={true}
                >
                    <InputLabel htmlFor="contacto-gestion-simple">Contacto</InputLabel>
                    <Select
                        value={contactoGestion}
                        onChange={handleGestionPersonaContactoGestionChange}
                        inputProps={{
                            name: 'contacto-gestion',
                            id: 'contacto-gestion-simple',
                        }}
                    >
                        {telefonos.map(telefono => <MenuItem key={telefono.telefono} value={telefono.telefono}>{telefono.telefono}</MenuItem>)}
                    </Select>
                </FormControl>
                {(respuestaGestion === 'CITA' || respuestaGestion === 'LLDP') &&
                    <MuiPickersUtilsProvider
                        utils={MomentUtils}
                        locale={
                            {
                                es: 'es'
                            }
                        }
                    >
                        <Fragment>
                            <InlineDateTimePicker
                                className={classes.formControl}
                                disablePast={true}
                                required={true}
                                label='Fecha/Hora Cita'
                                invalidLabel='No'
                                value={fechaHoraCitaGestion}
                                onChange={handleGestionPersonaFechaHoraCitaGestionChange}
                                format='DD/MM/YYYY hh:mm:ss a'
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <Icon
                                                color='primary'
                                            >
                                                date_range
                                            </Icon>
                                        </InputAdornment>
                                    )
                                }}
                            >
                            </InlineDateTimePicker>
                        </Fragment>
                    </MuiPickersUtilsProvider>
                }
            </div>
            <div>
                <TextField
                    className={classes.formControl}
                    required={true}
                    label='Comentario'
                    margin='normal'
                    fullWidth={true}
                    multiline={true}
                    value={comentarioGestion}
                    onChange={handleGestionPersonaComentarioGestionChange}
                >
                </TextField>
            </div>
            <div className={classes.divButtonContainer}>
                <Tooltip
                    title={props.session.usuario.usuario !== selectedProspect.destinos[0].gestor ? 'Solo el gestor asignado puede gestionar' : Object.keys(selectedDate).length > 0 ? 'Registrar Cierre Cita' : 'Registrar Gestión'}
                >
                    <div>
                        <Button
                            className={classes.button}
                            variant='contained'
                            color='primary'
                            onClick={handleGestionPersonaRegistrarGestionOnClick}
                            disabled={props.session.usuario.usuario !== selectedProspect.destinos[0].gestor}
                        >
                            {Object.keys(selectedDate).length > 0 ? 'Registrar Cierre Cita' : 'Registrar Gestión'}
                        </Button>
                    </div>
                </Tooltip>
            </div>
        </div>
    );
};

PanelGestionProspecto.propTypes = {
    mediosGestion: PropTypes.array.isRequired,
    respuestasGestion: PropTypes.array.isRequired,

    selectedProspect: PropTypes.object.isRequired,
    selectedDate: PropTypes.object.isRequired,

    medioGestion: PropTypes.string.isRequired,
    comentarioGestion: PropTypes.string.isRequired,
    respuestaGestion: PropTypes.string.isRequired,
    contactoGestion: PropTypes.string.isRequired,
    fechaHoraCitaGestion: PropTypes.instanceOf(Date),

    handleGestionPersonaMedioGestionChange: PropTypes.func.isRequired,
    handleGestionPersonaRespuestaGestionChange: PropTypes.func.isRequired,
    handleGestionPersonaContactoGestionChange: PropTypes.func.isRequired,
    handleGestionPersonaFechaHoraCitaGestionChange: PropTypes.func.isRequired,
    handleGestionPersonaComentarioGestionChange: PropTypes.func.isRequired,
    handleGestionPersonaRegistrarGestionOnClick: PropTypes.func.isRequired
};

export default withStyles(styles)(PanelGestionProspecto);