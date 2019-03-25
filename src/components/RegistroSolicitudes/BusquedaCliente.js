import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import FormControl from '@material-ui/core/FormControl';
import SnackbarNotificacion from 'components/Generic/SnackbarNotificacion'
import DialogNotificationModal from 'App/_commons/components/DialogNotificationModal';
import { textValidation } from '../../constants/Generic';
import MomentUtils from '@date-io/moment';
import { renderField, toUpper } from 'utilities/index';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import { setPropsAsInitial } from 'utilities/setPropsAsInitials';
import { Field, reduxForm } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import { registroStyle } from 'components/RegistroSolicitudes/styles/styles';
import moment from 'moment';

const valiateText = value => !textValidation(value) ? 'Solo letras' : undefined
const validateRFC = rfc => rfc && !/^([A-ZÑ\x26]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1]))([A-Z\d]{3})?$/i.test(rfc) ? 'Formato Incorrecto' : undefined ? 'Formato Incorrecto' : undefined

const BusquedaCliente = (props) => {
    const { classes, clientes, selectedDate } = props;
    const { handleOnClick, handleSubmit, handleCloseSnack } = props;
    const { openSnackBar, snackbarNotificacion, errorNombre, errorPaterno, errorRFC, required, openDialog } = props;
    const { handleOnClose, handleClose, handleDateChange } = props;
    moment.locale('ES');
    return (
        <div className={classes.containerBusqueda}>
            <Paper >
                <form onSubmit={handleSubmit}>
                    <FormControl className={classes.formControlStyle}>
                        <Field

                            validate={valiateText}
                            className={classes.textFieldBusqueda}
                            parse={toUpper} name="nombre"
                            component={renderField} label="Nombre"
                            placeholder="Ingresé nombre"
                            InputProps={{ error: errorNombre }}
                            InputLabelProps={{ error: errorNombre, required: required }} />
                        <Field
                            validate={valiateText}
                            className={classes.textFieldBusqueda}
                            parse={toUpper} name="apellidoPaterno"
                            component={renderField} label="Primer Apellido"
                            placeholder="Ingresé primer apellido"
                            InputProps={{ error: errorPaterno }}
                            InputLabelProps={{ error: errorPaterno, required: required }} />
                        <Field
                            validate={valiateText}
                            className={classes.textFieldBusqueda}
                            parse={toUpper} name="apellidoMaterno"
                            component={renderField} label="Segundo Apellido"
                            placeholder="Ingresé segundo apellido" />
                        <MuiPickersUtilsProvider
                            utils={MomentUtils}
                            locale={{ 'ES': 'ES' }}>
                            <Fragment>
                                <DatePicker
                                    className={classes.textFieldBusqueda}
                                    keyboard={true} disableFuture={true}
                                    name="fechaNacimiento" label='Fecha Nacimiento'
                                    value={selectedDate} onChange={handleDateChange}
                                    format='DD/MM/YYYY' animateYearScrolling={false}
                                    mask={value =>
                                        value ? [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/] : []
                                    }
                                    disableOpenOnEnter
                                    invalidDateMessage='Formato de fecha incorrecto'
                                    maxDateMessage='Fecha de Nacimiento incorrecta'>
                                </DatePicker>
                            </Fragment>
                        </MuiPickersUtilsProvider>
                        <Field
                            className={classes.textFieldBusqueda}
                            name="rfcCapturado" component={renderField}
                            label="RFC"
                            parse={toUpper} placeholder="Ingresé su rfc"
                            InputProps={{ inputProps: { maxLength: 13 }, error: errorRFC }}
                            InputLabelProps={{ error: errorRFC, required: required }}
                            validate={validateRFC}
                        />
                        <Field
                            style={{ display: 'none' }}
                            name="relacionConPersona" component={renderField}
                            label="RFC"

                        />
                        <div className={classes.divBtnBusqueda}>
                            {clientes.length > 0 ?
                                <Tooltip title="Buscar persona">
                                    <Button
                                        className={classes.btnsBusqueda}
                                        variant="contained" color="primary"
                                        onClick={handleOnClose}>
                                        No existe
                                        </Button>
                                </Tooltip>
                                : <Tooltip title="Buscar persona">
                                    <Button
                                        className={classes.btnsBusqueda}
                                        variant="contained" color="primary"
                                        type="submit">
                                        Buscar</Button>
                                </Tooltip>
                            }
                            <Tooltip title="Limpiar pantalla">
                                <Button
                                    color="primary"
                                    className={classes.btnsBusquedaL}
                                    onClick={handleOnClick} >Limpiar</Button>
                            </Tooltip>
                        </div>
                    </FormControl>
                </form>
            </Paper>
            <div>
                <SnackbarNotificacion
                    {...snackbarNotificacion}
                    opened={openSnackBar}
                    onClose={handleCloseSnack} />

            </div>
            <div>
                <DialogNotificationModal
                    {...openDialog}
                    handleClose={handleClose}
                    handleOnClose={handleOnClose} />
            </div>
        </div>
    );
};

BusquedaCliente.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    opened: PropTypes.bool,
    errorNombre: PropTypes.bool,
    errorPaterno: PropTypes.bool,
    errorRFC: PropTypes.bool,
    required: PropTypes.bool,
    selectedDate: PropTypes.object,
    clientes: PropTypes.array,
    handleOnClick: PropTypes.func,
    handleClose: PropTypes.func,
    handleOnClose: PropTypes.func,
    handleDateChange: PropTypes.func,
    snackbarNotificacion: PropTypes.object.isRequired,
    openDialog: PropTypes.object.isRequired,

};

const BusquedaForm = reduxForm({ form: 'BusquedaCliente', destroyOnUnmount: false })(BusquedaCliente);

export default withStyles(registroStyle)(setPropsAsInitial(BusquedaForm));
