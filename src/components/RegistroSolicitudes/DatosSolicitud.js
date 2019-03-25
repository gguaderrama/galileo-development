import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import SnackbarNotificacion from './../Generic/SnackbarNotificacion';
import Paper from '@material-ui/core/Paper';
import { renderSelectField, renderField } from 'utilities/index';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { registroStyle } from './styles/styles';
import { reduxForm, Field } from 'redux-form';
const DatosSolicitud = (props) => {
    const { classes, required, handleGetDrools, handleReset } = props;
    const { openSnackBar, snackbarNotificacion, error, handleCloseSnack } = props;
    const { vendedores, descripciones, corresponsales, tipoDisposicion } = props;
    const { onBlurMonto, blurCategoria, onBlurPlazo, tipoProductoBlur, onBlurSolicitud, onBlurTipoDisposicion } = props;
    const { handleSubmit } = props;
    const { selectTipoDisposicion, selectCorresponsal, handleSelectTipoProducto, handleSelectCategoria, selectProducto, handleChangeFrecuencia, handleChangePlazo, changeMonto, changeTasa, selectVendedor } = props;
    const { comboProductoItems, comboFrecuenciasItems, comboCategoriasItems, productosSeleccionados, comboTipoProductoItems } = props;
    const { productoSeleccionado, frecuenciaSeleccionada, tipoProductoSeleccionado, plazoSeleccionado, esRangoPlazo, esRangoMonto, solicitud, disabledMonto } = props;

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex' }}>
            <div style={{ paddingTop: '24px', width: '338px', height: '227px', marginRight: '20px', display: 'inline-grid' }}>
                <Paper>
                    <Field InputLabelProps={{ required: required }} onBlur={onBlurSolicitud} //inputProps={{}}
                        InputProps={{ inputProps: { readOnly: solicitud !== null ? true : false, maxLength: 12 } }} className={classes.vendedorCorresponsal} name="solicitud" component={renderField}
                        label="Solicitud" />

                    <Field disabled={vendedores && vendedores.length > 0 ? false : true}
                        onChange={selectVendedor} error={error} padding='30px' className={classes.vendedorCorresponsal} name="vendedor" component={renderSelectField}
                        label="Vendedor">
                        {vendedores && vendedores.map((item, i) => {
                            return (
                                < MenuItem key={i} value={item.persona}>
                                    <Typography align="left" color='textPrimary'>
                                        {item.persona} - {item.nombre} {item.apellidoPaterno}
                                    </Typography>
                                </MenuItem>
                            );
                        })}
                    </Field>
                    {corresponsales.length > 0 &&
                        <Field onChange={selectCorresponsal} error={error} padding='30px' className={classes.vendedorCorresponsal} name="corresponsal" component={renderSelectField}
                            label="Corresponsal">
                            {corresponsales.map((item, i) => {
                                return (
                                    < MenuItem key={i} value={item.claveCorresponsal}>
                                        <Typography align="left" color='textPrimary'>
                                            {item.nombreComercial}
                                        </Typography>
                                    </MenuItem>
                                );
                            })}
                        </Field>
                    }
                    <div>
                        <Button
                            size="small"
                            color="primary"
                            className={classes.btnsFolio}
                            onClick={handleReset}>
                            Limpiar</Button>
                        <Button
                            size="small"
                            variant="contained"
                            color="primary"
                            className={classes.btnsFolio}
                            onClick={handleGetDrools}>
                            Generar Folio</Button>
                    </div>
                </Paper>
            </div>
            <div style={{ paddingTop: '24px', width: '994px', height: '184px' }} >
                <Paper>
                    <div>
                        <Field InputProps={{ readOnly: true }} className={classes.textFieldsDatosCredito}
                            disabled={descripciones ? false : true} name="segmento" component={renderField} label="Segmento"
                            padding='30px' />

                        <Field onBlur={tipoProductoBlur} padding='30px' className={classes.textFieldsDatosCredito}
                            disabled={comboTipoProductoItems.length > 0 ? false : true}
                            name="tipoProducto" component={renderSelectField} label="Tipo Producto"
                            onChange={handleSelectTipoProducto}>
                            {comboTipoProductoItems && comboTipoProductoItems.map((item, i) => {
                                return (
                                    <MenuItem key={i} value={item.codigo}>
                                        <Typography align="left" color='textPrimary'>
                                            {item.descripcion}
                                        </Typography>
                                    </MenuItem>
                                );
                            })
                            }
                        </Field>
                        <Field
                            padding='30px'
                            className={classes.textFieldsDatosCredito}
                            onFocus={blurCategoria}
                            disabled={comboTipoProductoItems.length > 0 ? false : true} name="categoria"
                            component={renderSelectField}
                            label="Categoria" onChange={handleSelectCategoria}>
                            {comboCategoriasItems && comboCategoriasItems.filter(categoria => categoria.tipoProducto === tipoProductoSeleccionado).map((item, i) => {
                                return (
                                    <MenuItem key={i} value={item.codigo}>
                                        <Typography align="left" color='textPrimary'>
                                            {item.descripcion}
                                        </Typography>
                                    </MenuItem>
                                );
                            })
                            }
                        </Field>
                        <Field padding='30px' className={classes.textFieldsDatosCredito} onChange={selectProducto}
                            disabled={comboProductoItems && comboProductoItems.length > 0 ? false : true} name="producto"
                            component={renderSelectField} label="Producto">
                            {comboProductoItems && comboProductoItems.map((item, i) => {
                                return (
                                    <MenuItem key={i} value={item.producto}>
                                        <Typography align="left" color='textPrimary'>
                                            {item.descripcion}
                                        </Typography>
                                    </MenuItem>);
                            })
                            }
                        </Field>
                    </div>

                    <div>
                        <Field padding='30px' className={classes.textFieldsDatosCredito} onChange={handleChangeFrecuencia}
                            disabled={productosSeleccionados && productosSeleccionados.length > 0 ? false : true}
                            name="frecuencia"
                            component={renderSelectField} label="Frecuencia Pago" >
                            {comboFrecuenciasItems && comboFrecuenciasItems.filter(producto => producto.producto === productoSeleccionado).map((item, i) => {
                                return (
                                    <MenuItem key={i} value={item.frecuencia} >
                                        <Typography align="left" color='textPrimary'>
                                            {item.descripcion}
                                        </Typography>
                                    </MenuItem>
                                );
                            })}
                        </Field>
                        <Field padding='30px' className={classes.textFieldsDatosCredito} onBlur={onBlurPlazo} onChange={handleChangePlazo}
                            disabled={productosSeleccionados && productosSeleccionados.length > 0 ? false : true}
                            name="plazo" label="Plazo"
                            texto={esRangoPlazo ? `Plazos desde ${productosSeleccionados[0].plazoMin} hasta ${productosSeleccionados[0].plazoMax}` : undefined}
                            component={esRangoPlazo && esRangoPlazo === true ? renderField : renderSelectField}>
                            {productosSeleccionados && productosSeleccionados.filter(producto => producto.frecuencia === frecuenciaSeleccionada).map((item, i) => {
                                return (
                                    <MenuItem key={i} value={item.plazoMax} >
                                        <Typography align="left" color='textPrimary'>
                                            {item.plazoMax}
                                        </Typography>
                                    </MenuItem>
                                );
                            })}
                        </Field>
                        <Field padding='30px' className={classes.textFieldsDatosCredito} readOnly={true} onChange={changeTasa} name="tasa" component={renderSelectField} label="Tasa">
                            {productosSeleccionados && productosSeleccionados.filter(producto => producto.frecuencia === frecuenciaSeleccionada && (plazoSeleccionado >= producto.plazoMin && plazoSeleccionado <= producto.plazoMax)).map((item, i) => {
                                return (
                                    <MenuItem key={i} value={item.tasa} >
                                        <Typography align="left" color='textPrimary'>
                                            {item.tasa} {item.tipoAnalisis}
                                        </Typography>
                                    </MenuItem>
                                );
                            })}
                        </Field>
                        <Field padding='30px' className={classes.textFieldsDatosCredito} onBlur={onBlurMonto} onChange={changeMonto}
                            texto={esRangoMonto && esRangoMonto === true ? `Montos Desde $ ${productosSeleccionados[0].montoMin} Hasta $ ${productosSeleccionados[0].montoMax}` : undefined}
                            disabled={productosSeleccionados && productosSeleccionados.length > 0 ? false : true} name="monto" label="Monto"
                            component={esRangoMonto && esRangoMonto === true ? renderField : renderSelectField}
                            readOnly={disabledMonto}

                        >
                            {productosSeleccionados && productosSeleccionados.map((item, i) => {
                                return (
                                    <MenuItem key={i} value={item.montoMax} >
                                        <Typography align="left" color='textPrimary'>
                                            {item.montoMax}
                                        </Typography>
                                    </MenuItem>
                                );
                            })}
                        </Field>

                        {tipoDisposicion.length > 0 &&
                            <Field onBlur={onBlurTipoDisposicion} onChange={selectTipoDisposicion} error={error} padding='30px' className={classes.textFieldsDatosCredito}
                                name="tipoDisposicion" component={renderSelectField}
                                label="Tipo Disposición">
                                {tipoDisposicion.map((item, i) => {
                                    return (
                                        < MenuItem key={i} value={item.codigo}>
                                            <Typography align="left" color='textPrimary'>
                                                {item.descripcion}
                                            </Typography>
                                        </MenuItem>
                                    );
                                })}
                            </Field>
                        }

                    </div>
                </Paper>
            </div>

            <div>
                <SnackbarNotificacion
                    {...snackbarNotificacion}
                    opened={openSnackBar}
                    onClose={handleCloseSnack}>
                </SnackbarNotificacion>
            </div>

        </form>


    );
};

DatosSolicitud.propTypes = {
    handleSelectTipoProducto: PropTypes.func.isRequired,
    selectProducto: PropTypes.func.isRequired,
    handleChangeFrecuencia: PropTypes.func.isRequired,
    handleChangePlazo: PropTypes.func.isRequired,
    onBlurMonto: PropTypes.func.isRequired,
    blurCategoria: PropTypes.func.isRequired,
    onBlurPlazo: PropTypes.func.isRequired,
    descripciones: PropTypes.array,
    vendedores: PropTypes.array,
    productosWS: PropTypes.array,
    corresponsales: PropTypes.array,
    tipoDisposicion: PropTypes.array
};


const DatosCreditoForm = reduxForm({
    form: 'DatosSolicitud',
    destroyOnUnmount: false
})(DatosSolicitud);

export default withStyles(registroStyle)(DatosCreditoForm);
