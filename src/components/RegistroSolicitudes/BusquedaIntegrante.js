import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import FormControl from '@material-ui/core/FormControl';
import { renderField, toUpper } from './../../utilities/index';
import SnackbarNotificacion from './../Generic/SnackbarNotificacion'
import DialogNotificationModal from 'App/_commons/components/DialogNotificationModal';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import { textValidation } from '../../constants/Generic';
import { setPropsAsInitial } from './../../utilities/setPropsAsInitials';
import { Field, reduxForm } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import { registroStyle } from './styles/styles';

const valiateText = value => !textValidation(value) ? 'Solo letras' : undefined
const validateRFC = rfc => rfc && !/^([A-ZÑ\x26]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1]))([A-Z\d]{3})?$/i.test(rfc) ? 'Formato Incorrecto' : undefined ? 'Formato Incorrecto' : undefined

const BusquedaIntegrante = (props) => {
    const { classes } = props;
    const { handleSubmit, handleCloseSnack, handleClean, handleCloseDialog, handleOnCloseDialg, handleDateChange } = props;
    const { openSnackBar, snackbarNotificacion, errorNombre, errorPaterno, errorRFC, required, openDialog } = props;
    const { selectedDate } = props;
    return (
        <div className={classes.containerBusqueda}>
            <Paper >
                <form onSubmit={handleSubmit}>
                    <FormControl className={classes.formControlStyle}>
                        <Field
                            validate={valiateText}
                            parse={toUpper}
                            className={classes.textFieldBusqueda}
                            InputProps={{ error: errorNombre }}
                            InputLabelProps={{ error: errorNombre, required: required }}
                            name="nombre"
                            component={renderField} label="Nombre"
                            placeholder="Ingresé nombre"
                        />
                        <Field
                            validate={valiateText}
                            parse={toUpper}
                            className={classes.textFieldBusqueda}
                            name="apellidoPaterno"
                            InputProps={{ error: errorPaterno }}
                            InputLabelProps={{ error: errorPaterno, required: required }}
                            component={renderField} label="Primer Apellido"
                            placeholder="Ingresé primer apellido"
                        />
                        <Field
                            validate={valiateText}
                            parse={toUpper}
                            className={classes.textFieldBusqueda}
                            name="apellidoMaterno"
                            component={renderField} label="Segundo Apellido"
                            placeholder="Ingresé segundo apellido" />
                        <MuiPickersUtilsProvider
                            utils={MomentUtils}>
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
                            validate={validateRFC}
                            parse={toUpper}
                            className={classes.textFieldBusqueda}
                            name="rfcCapturado" component={renderField}
                            label="RFC"
                            InputProps={{ error: errorRFC }}
                            InputLabelProps={{ error: errorRFC, required: required }}
                            placeholder="Ingresé su rfc"
                        />

                        <div className={classes.divBtnBusqueda}>
                            <Tooltip title="Buscar persona">
                                <Button
                                    className={classes.btnsBusqueda}
                                    variant="contained" color="primary"
                                    type="submit">
                                    Buscar</Button>
                            </Tooltip>
                            <Tooltip title="Limpiar pantalla">
                                <Button
                                    onClick={handleClean}
                                    color="primary"
                                    className={classes.btnsBusquedaL}
                                >Limpiar</Button>
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
                <DialogNotificationModal
                    {...openDialog}
                    handleClose={handleCloseDialog}
                    handleOnClose={handleOnCloseDialg} />
            </div>
        </div>


    );
};

BusquedaIntegrante.propTypes = {
    classes: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleCloseSnack: PropTypes.func.isRequired,
    handleClean: PropTypes.func.isRequired,
    handleCloseDialog: PropTypes.func.isRequired

};

const BusquedaForm = reduxForm({ form: 'BusquedaIntegrante', destroyOnUnmount: false, initialValues: { oficina: 254 } })(BusquedaIntegrante);

export default withStyles(registroStyle)(setPropsAsInitial(BusquedaForm));
