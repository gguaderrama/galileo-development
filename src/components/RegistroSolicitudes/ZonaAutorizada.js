import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import DialogNotificationModal from 'App/_commons/components/DialogNotificationModal';
import SnackbarNotificacion from 'components/Generic/SnackbarNotificacion';
import { renderField, renderSelectField } from 'utilities/index';
import { reduxForm, Field } from 'redux-form';
import { registroStyle } from './styles/styles'
import { withStyles } from '@material-ui/core/styles';

const number = value => value && isNaN(Number(value)) ? 'Solo Número' : undefined

const ZonaAutorizada = (props) => {
    const { classes, onBlurAutorizadaDomicilio, onBlurAutorizadaEmpleo, onBlurZona, asentamientoDomiciliosChange, asentamientoEmpleoChange } = props;
    const { asentamientosDomicilio, asentamientosEmpleo, openDialog, handleClose, handleOnClose } = props;
    const { snackbarNotificacion, openSnackBar, handleCloseSnack } = props;
    const { muestraZona } = props;
    console.log("muestraZona", muestraZona)
    return (
        <div style={{ display: 'flex' }}>


            <div className={classes.divZonaAutorizadaDomicilio} >
                <Paper className={classes.containerZonaAutorizadaDomicilio} >
                    <Typography
                        align="left" color="inherit" className={classes.titleZona}>
                        Zona Autorizada Domicilio
                </Typography>
                    <Field
                        disabled={!muestraZona ? true : false}
                        validate={number}
                        inputProps={{ maxLength: 5 }}
                        className={classes.textFields}
                        name="cpDomicilio" component={renderField}
                        label="Código Postal" placeholder="Ingresé el código postal"
                        onBlur={onBlurAutorizadaDomicilio} >
                    </Field>
                    <Field padding='50px' disabled={asentamientosDomicilio && asentamientosDomicilio.length > 0 ? false : true} className={classes.textFields}
                        name="colonia" onChange={asentamientoDomiciliosChange}
                        component={renderSelectField} label="Colonia" >
                        {asentamientosDomicilio && asentamientosDomicilio.map((item, i) => {
                            return (
                                < MenuItem key={i} value={item.asentamiento}>
                                    <Typography align="left" color='textPrimary'>
                                        {item.asentamiento}
                                    </Typography>
                                </MenuItem>
                            );
                        })}
                    </Field>
                    <div>
                        {
                            !muestraZona &&

                            <Typography className={classes.titleZona2} color="primary"> El producto seleccionado no requiere de zona autorizada</Typography>

                        }
                    </div>
                </Paper>
            </div>

            <div style={{ marginTop: '31px' }}>
                <Paper className={classes.containerZonaAutorizadaDomicilio} >
                    <Typography
                        align="left" color="inherit" className={classes.titleZona}>
                        Zona Autorizada Empleo
                </Typography>
                    <Field
                        disabled={!muestraZona ? true : false}
                        validate={number}
                        inputProps={{ maxLength: 5 }}
                        onBlur={onBlurAutorizadaEmpleo} className={classes.textFields}
                        name="cpEmpleo"
                        component={renderField} label="Código Postal"
                        placeholder="Ingresé el código postal" >
                    </Field>
                    <Field padding='50px'
                        onBlur={onBlurZona} onChange={asentamientoEmpleoChange}
                        disabled={asentamientosEmpleo && asentamientosEmpleo.length > 0 ? false : true} className={classes.textFields} name="coloniaEmpleo"
                        component={renderSelectField} label="Colonia" >
                        {asentamientosEmpleo && asentamientosEmpleo.map((item, i) => {
                            return (
                                < MenuItem key={i} value={item.asentamiento}>
                                    <Typography align="left" color='textPrimary'>
                                        {item.asentamiento}
                                    </Typography>
                                </MenuItem>
                            );
                        })}
                    </Field>
                    <div>
                        {
                            !muestraZona &&
                            <Typography className={classes.titleZona2} color="primary"> El producto seleccionado no requiere de zona autorizada</Typography>

                        }
                    </div>
                </Paper>
            </div>



            <DialogNotificationModal
                {...openDialog}
                handleClose={handleClose}
                handleOnClose={handleOnClose} />

            <SnackbarNotificacion
                {...snackbarNotificacion}
                opened={openSnackBar}
                onClose={handleCloseSnack} />


        </div>



    );
};

ZonaAutorizada.propTypes = {
    asentamientosDomicilio: PropTypes.array,
    asentamientosEmpleo: PropTypes.array,
    onBlurAutorizadaDomicilio: PropTypes.func.isRequired,
    onBlurAutorizadaEmpleo: PropTypes.func.isRequired

};

const ZonaAutorizadaForm = reduxForm({ form: 'ZonaAutorizada', destroyOnUnmount: false })(ZonaAutorizada);

export default withStyles(registroStyle)(ZonaAutorizadaForm);
