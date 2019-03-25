import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Button, DialogActions } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import DialogNotificationModal from 'App/_commons/components/DialogNotificationModal';
import SnackbarNotificacion from './../Generic/SnackbarNotificacion';
import { Field, reduxForm } from 'redux-form';
import { renderField, renderSelectField, toUpper } from './../../utilities/index';
import { withStyles } from '@material-ui/core/styles';
import { registroStyle } from './styles/styles'

const number = value => value && isNaN(Number(value)) ? 'Solo Número' : undefined
const Domicilios = props => {
    const { classes } = props;
    const { openDialog, edicion } = props;
    const { handleSubmit, handleOnChangeEstado, handleOnChangeCP, handleClose, handleOnCloseDialg, handleFillCiudad } = props;
    const { listaCatalogos, catalogoEstados, catalogoPaises, catalogoColonias } = props;
    const { errorCalle, errorExterior, errorEstado, errorCp, errorColonia, errorCiudad, errorPais, errorTipoViv, required } = props;
    const { snackbarNotificacion, openSnackBar, handleCloseSnack } = props;
    return (
        <Paper style={{ marginTop: '10px' }}  >
            <div style={{ paddingTop: '10px', marginTop: '10px' }}>
                <Typography
                    style={{
                        marginBottom: '24px',
                        marginLeft: '18px',
                        color: 'rgba(0, 0, 0, 1)',
                        fontSize: '15px'
                    }}
                    align="left">
                    Domicilios</Typography>
            </div>
            <form onSubmit={handleSubmit}>
                <div style={{ marginTop: '15px' }}>
                    <Field
                        InputProps={{ readOnly: true }}
                        padding='38px'
                        name="tipoDomicilio" component={renderField}
                        label="Tipo Domicilio" className={classes.textFieldDatosDomicilio} />

                    <Field
                        InputProps={{ error: errorCalle }}
                        InputLabelProps={{ error: errorCalle, required: required }}
                        className={classes.textFieldDatosDomicilio}
                        parse={toUpper} name="calle"
                        component={renderField} label="Calle"
                        placeholder="Calle" />

                    <Field
                        InputProps={{ error: errorExterior }}
                        InputLabelProps={{ error: errorExterior, required: required }}
                        validate={number}
                        className={classes.textFieldDatosDomicilio}
                        parse={toUpper} name="noExterior"
                        component={renderField} label="Número Exterior"
                        placeholder="Número Exterior" />
                    <Field
                        className={classes.textFieldDatosDomicilio}
                        parse={toUpper} name="noInterior"
                        component={renderField}
                        label="Número Interior"
                        placeholder="Número Interior" />
                    <Field
                        error={errorEstado} required={required}
                        padding='38px'
                        name="codigoEstado"
                        component={renderSelectField}
                        label="Estado"
                        className={classes.textFieldDatosDomicilio}
                        onChange={handleOnChangeEstado}>
                        {
                            catalogoEstados && catalogoEstados.map(item =>
                                <MenuItem key={item.idEstado} value={item.codigoEstado}>
                                    {item.descripcion
                                    }</MenuItem>)
                        }
                    </Field>
                </div>
                <div>
                    <Field
                        InputProps={{ inputProps: { maxLength: 5 }, error: errorCp }}
                        InputLabelProps={{ error: errorCp, required: required }}
                        validate={number}
                        className={classes.textFieldDatosDomicilio2}
                        parse={toUpper} name="cp"
                        //inputProps={{  }}
                        component={renderField} label="Código Postal"
                        placeholder="Código Postal" onBlur={handleOnChangeCP} />
                    <Field
                        error={errorColonia} required={required}
                        padding='38px'
                        onChange={handleFillCiudad}
                        disabled={catalogoColonias && catalogoColonias.length > 0 ? false : true}
                        name="colonia" component={renderSelectField}
                        label="Colonia" className={classes.textFieldDatosDomicilio3}>
                        {
                            catalogoColonias ? catalogoColonias.map(item =>
                                <MenuItem key={item.asentamiento} value={item.asentamiento}>
                                    {item.asentamiento}
                                </MenuItem>) : null
                        }
                    </Field>
                    <Field
                        InputProps={{ error: errorCiudad, readOnly: true }}
                        InputLabelProps={{ error: errorCiudad, required: required }}
                        className={classes.textFieldDatosDomicilio3}
                        parse={toUpper} name="ciudad"
                        component={renderField}
                        label="Ciudad" placeholder="Ciudad" />
                    <Field
                        error={errorPais} required={required}
                        padding='38px'
                        name="codigoPais" component={renderSelectField}
                        label="Pais" className={classes.textFieldDatosDomicilio2}>
                        {catalogoPaises &&
                            catalogoPaises.map(item =>
                                <MenuItem key={item.codigoPais} value={item.codigoPais}>
                                    {item.descripcion}
                                </MenuItem>)
                        }
                    </Field>
                    <Field
                        error={errorTipoViv} required={required}
                        padding='38px'
                        name="tipoVivienda"
                        component={renderSelectField}
                        label="Tipo Vivienda"
                        className={classes.textFieldDatosDomicilio}>
                        {listaCatalogos &&
                            listaCatalogos.filter(item => item.tipoCodigo === 'VIVI').map(item =>
                                <MenuItem key={item.codigo} value={item.codigo}>
                                    {item.descripcion}
                                </MenuItem>)
                        }
                    </Field>
                </div>
                <div style={{ padding: '15px' }}>
                    {!edicion ?
                        <DialogActions >
                            <Button variant="contained" color="primary"
                                type="submit" >
                                Agregar
                    </Button>
                        </DialogActions>
                        :
                        <DialogActions> <Button variant="contained" color="primary"
                            type="submit" >
                            Actualizar
                    </Button>
                        </DialogActions>
                    }
                </div>
                <div>
                    <DialogNotificationModal
                        {...openDialog}
                        handleClose={handleClose}
                        handleOnClose={handleOnCloseDialg} />

                    <SnackbarNotificacion
                        {...snackbarNotificacion}
                        opened={openSnackBar}
                        onClose={handleCloseSnack} />

                </div>
            </form>
        </Paper>
    )
}


Domicilios.propTypes = {
    classes: PropTypes.object.isRequired,
    catalogosCaptura: PropTypes.object,
    listaCatalogos: PropTypes.array,
    catalogoEstados: PropTypes.array,
    catalogoPaises: PropTypes.array,
    handleSubmit: PropTypes.func,
    handleOnChangeEstado: PropTypes.func.isRequired,
    handleOnChangeCP: PropTypes.func.isRequired
};

const DomiciliosForm = reduxForm({ form: 'DomiciliosForm', destroyOnUnmount: false })(Domicilios);

export default withStyles(registroStyle)(DomiciliosForm);
