import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import { Grid, Row } from 'react-flexbox-grid';
import { Field, reduxForm } from 'redux-form';
import { renderField, renderSelectField, renderRadioGroup, toUpper } from './../../utilities/index';
import { STYLES } from '../../constants/styles';
import { setPropsAsInitial } from './../../utilities/setPropsAsInitials';
import { isNumber, validaRango } from '../../utilities/validations';
import { NumberFormatCustomRF } from '../../utilities/format';

class DatosCreditoComponent extends Component {
    state = {
        value: 'si',        
      };

    render() {
        const { classes, 
            iformularios, 
            handleSubmitDatosCredito, 
            listaCatalogos, 
            catalogoOficinas, 
            descripcionCatalogos, 
            segmento, 
            tipoProducto,
            categoria,
            frecuenciaPago,
            // esReactivacion, 
            catalogoProductos, 
            catalogoFrecuencias,
            catalogoPlazos,
            handleSelectProducto, 
            handleSelectPlazo,
            handleSelectFrecuencia,
            handleOnBlurPlazo,
            disabledFrecuencia, 
            esRangoPlazo, 
            plazoMin,
            plazoMax,
            montoMin, 
            montoMax, } = this.props;
        const descripcionSegmento = descripcionCatalogos && descripcionCatalogos.find(dc => dc.codigo === segmento ).descripcion;
        const descripcionTipoProducto = descripcionCatalogos && descripcionCatalogos.find(dc => dc.codigo === tipoProducto ).descripcion;
        const descripcionCategoria = descripcionCatalogos && descripcionCatalogos.find(dc => dc.codigo === categoria ).descripcion;
        const descripcionFrecuencia = descripcionCatalogos && descripcionCatalogos.find(dc => dc.codigo === frecuenciaPago ).descripcion;        
        return (
            <Paper>                
                <Grid fluid>
                    <form onSubmit={handleSubmitDatosCredito}> 
                        <div>
                            <div>
                                <Typography style={{paddingTop: '18px', paddingLeft: '18px'}} >Producto</Typography>
                            </div>
                            <TextField
                                disabled
                                id="descripcionSegmento"
                                label="Segmento"
                                value={descripcionSegmento || ""}
                                className={classes.textField}
                                />
                            <TextField
                                disabled
                                id="descripcionTipoProducto"
                                label="Tipo Producto"
                                value={descripcionTipoProducto || ""}
                                className={classes.textField}
                                />
                            <TextField
                                disabled
                                id="descripcionCategoria"
                                label="Categoría"
                                value={descripcionCategoria || ""}
                                className={classes.textField}
                                />
                            <Field
                                name="codigoProducto"
                                component={renderSelectField}
                                label="Producto"
                                onChange={handleSelectProducto}
                                className={classes.formControlCredito}
                                padding='18px'
                                >
                                { 
                                    catalogoProductos ? catalogoProductos.map(item => item && <MenuItem key={item.codigo} value={item.codigo}>{item.descripcion}</MenuItem>): null
                                }
                            </Field>
                        </div>
                        <Divider variant="middle" style={{marginTop: '18px'}}/>
                        <div>
                            <div>
                                <Typography style={{paddingTop: '18px', paddingLeft: '18px'}}>Datos de crédito</Typography>
                            </div>
                            { catalogoFrecuencias && catalogoFrecuencias.length === 1 ?
                                <TextField
                                    disabled={disabledFrecuencia}
                                    id="descripcionFrecuencia"
                                    label="Frecuencia pago"
                                    value={descripcionFrecuencia || ""}
                                    className={classes.textField}
                                /> :
                                <Field
                                    name="frecuenciaPago"
                                    component={renderSelectField}
                                    label="Frecuencia pago" 
                                    className={classes.formControlCredito}
                                    padding='18px'
                                    required={iformularios ? iformularios.find( iform => (iform.valor === 'frecuenciaPago' && iform.esRequerido==='S')) !== undefined: false }
                                    disabled={disabledFrecuencia}
                                    onChange={handleSelectFrecuencia}
                                    >
                                    { 
                                        catalogoFrecuencias ? catalogoFrecuencias.map(item => item && <MenuItem key={item.codigo} value={item.codigo}>{item.descripcion}</MenuItem>): null
                                    }
                                </Field>
                            }
                            { esRangoPlazo ?
                                <Field
                                    className={classes.textField}
                                    name="plazo"
                                    component={renderField}
                                    label="Plazo"
                                    placeholder="Plazo"
                                    texto={`Rango: ${plazoMin} - ${plazoMax}`}
                                    validate={validaRango(plazoMin, plazoMax)}
                                    onBlur={handleOnBlurPlazo}
                                    required={iformularios ? iformularios.find( iform => (iform.valor === 'plazo' && iform.esRequerido==='S')) !== undefined: false }
                                /> :
                                <Field
                                    name="plazo"
                                    component={renderSelectField}
                                    label="Plazo" 
                                    className={classes.formControlCredito}
                                    padding='18px'
                                    required={iformularios ? iformularios.find( iform => (iform.valor === 'plazo' && iform.esRequerido==='S')) !== undefined: false }
                                    onChange={handleSelectPlazo}
                                    >
                                    { 
                                        catalogoPlazos ? catalogoPlazos.map(item => item && <MenuItem key={item.codigo} value={item.codigo}>{item.descripcion}</MenuItem>): null
                                    }                        
                                </Field>
                            }
                            <Field
                                className={classes.textField}
                                parse={toUpper}
                                name="tasa"
                                component={renderField}
                                label="Tasa"
                                placeholder="Tasa"
                                disabled
                                required={iformularios ? iformularios.find( iform => (iform.valor === 'tasa' && iform.esRequerido==='S')) !== undefined: false }
                                />
                            <Field
                                className={classes.textField}
                                name="efectivoOtorgado"
                                component={renderField}
                                label="Monto"
                                placeholder="Monto"
                                type="text"
                                validate={validaRango(montoMin, montoMax)}
                                InputProps={{
                                    inputComponent: NumberFormatCustomRF,
                                }}
                                texto={montoMin !== montoMax && `Rango: ${montoMin} - ${montoMax}`}
                                required={iformularios ? iformularios.find( iform => (iform.valorGenerico === 'efectivoOtorgado' && iform.esRequerido==='S')) !== undefined: false } />
                        </div>
                        <Divider variant="middle" style={{marginTop: '18px'}} />
                        <div>
                            <div>
                                <Typography style={{paddingTop: '18px', paddingLeft: '18px'}}>Detalle de crédito</Typography>
                            </div>
                            <Field
                                name="codigoDestinoCredito"
                                component={renderSelectField}
                                label="Destino del Crédito" 
                                className={classes.formControlCredito}
                                padding='18px'
                                required={iformularios ? iformularios.find( iform => (iform.valor === 'codigoDestinoCredito' && iform.esRequerido==='S')) !== undefined: false }
                                >
                                { 
                                    listaCatalogos ? listaCatalogos.filter(item => item.tipoCodigo === 'DEST').map(item => <MenuItem key={item.codigo} value={item.codigo}>{item.descripcion}</MenuItem>): null
                                }
                            </Field>
                            <Field
                                name="medioContacto"
                                component={renderSelectField}
                                label="¿Cómo se enteró de nosotros?" 
                                className={classes.formControlCredito}
                                padding='18px'
                                required={iformularios ? iformularios.find( iform => (iform.valor === 'medioContacto' && iform.esRequerido==='S')) !== undefined: false }
                                >
                                { 
                                    listaCatalogos ? listaCatalogos.filter(item => item.tipoCodigo === 'CONT').map(item => <MenuItem key={item.codigo} value={item.codigo}>{item.descripcion}</MenuItem>): null
                                }
                            </Field>
                            <Field
                                name="submedioContacto"
                                component={renderSelectField}
                                label="Submedio de contacto" 
                                className={classes.formControlCredito}
                                padding='18px'
                                required={iformularios ? iformularios.find( iform => (iform.valor === 'submedioContacto' && iform.esRequerido==='S')) !== undefined: false }
                                >
                                { 
                                    listaCatalogos ? listaCatalogos.filter(item => item.tipoCodigo === 'CONT').map(item => <MenuItem key={item.codigo} value={item.codigo}>{item.descripcion}</MenuItem>): null
                                }
                            </Field>
                            <Field
                                className={classes.textField}
                                parse={toUpper}
                                name="contratoRecomienda"
                                component={renderField}
                                label="No. contrato Recomienda"
                                placeholder="No. contrato Recomienda"
                                inputProps={{
                                    maxLength: 12,
                                }}
                                validate={isNumber}
                                required={iformularios ? iformularios.find( iform => (iform.valor === 'contratoRecomienda' && iform.esRequerido==='S')) !== undefined: false }
                                />
                            <Field
                                name="oficinaDisposicion"
                                component={renderSelectField}
                                label="Lugar Disposición" 
                                className={classes.formControlCredito}
                                padding='18px'
                                required={iformularios ? iformularios.find( iform => (iform.valor === 'oficinaDisposicion' && iform.esRequerido==='S')) !== undefined: false }
                                >
                                { 
                                    catalogoOficinas ? catalogoOficinas.map(item => <MenuItem key={item.oficina} value={item.oficina}>{item.nombre}</MenuItem>): null
                                }
                            </Field>
                            <Field
                                name="diaPago"
                                component={renderSelectField}
                                label="Día de pago" 
                                className={classes.formControlCredito}
                                padding='18px'
                                required={iformularios ? iformularios.find( iform => (iform.valor === 'diaPago' && iform.esRequerido==='S')) !== undefined: false }
                                >
                                { 
                                    listaCatalogos ? listaCatalogos.filter(item => item.tipoCodigo === 'DIAPGS').map(item => <MenuItem key={item.codigo} value={item.codigo}>{item.descripcion}</MenuItem>): null
                                }
                            </Field>
                            <div>
                                <div>
                                    <Typography style={{paddingTop: '18px', paddingLeft: '18px'}}>Disposición</Typography>
                                </div>
                                <Field
                                    name="tipoDisposicion"
                                    component={renderSelectField}
                                    label="Tipo Disposición" 
                                    className={classes.formControlCredito}
                                    padding='18px'
                                    required={iformularios ? iformularios.find( iform => (iform.valor === 'tipoDisposicion' && iform.esRequerido==='S')) !== undefined: false }
                                    >
                                    { 
                                        listaCatalogos ? listaCatalogos.filter(item => item.tipoCodigo === 'TPDISP').map(item => <MenuItem key={item.codigo} value={item.codigo}>{item.descripcion}</MenuItem>): null
                                    }
                                </Field>
                                <Field
                                    className={classes.textField}
                                    name="numeroCuenta"
                                    component={renderField}
                                    label="No. de cuenta"
                                    placeholder="No. de cuenta"
                                    type="text"
                                    required={iformularios ? iformularios.find( iform => (iform.valorGenerico === 'numeroCuenta' && iform.esRequerido==='S')) !== undefined: false } />
                                <Field
                                    className={classes.textField}
                                    name="banco"
                                    component={renderField}
                                    label="Banco"
                                    placeholder="Banco"
                                    type="text"
                                    required={iformularios ? iformularios.find( iform => (iform.valorGenerico === 'banco' && iform.esRequerido==='S')) !== undefined: false } />
                                <Field
                                    className={classes.textField}
                                    name="clabe"
                                    component={renderField}
                                    label="Clabe"
                                    placeholder="Clabe"
                                    type="text"
                                    required={iformularios ? iformularios.find( iform => (iform.valorGenerico === 'Clabe' && iform.esRequerido==='S')) !== undefined: false } />
                            </div>
                            <div>
                                <div>
                                    <Typography style={{paddingTop: '18px', paddingLeft: '18px'}}>Domiciliación</Typography>
                                </div>
                                <Field 
                                    name="domiciliacion" 
                                    component={renderRadioGroup} 
                                    label="Domiciliación de pago"
                                    className={classes.formControlCredito}
                                    marginLeft='18px'
                                    row
                                    required={iformularios ? iformularios.find( iform => (iform.valor === 'domiciliacion' && iform.esRequerido==='S')) !== undefined: false }
                                    >
                                    <FormControlLabel value="S" control={<Radio color="primary" />} label="Si" />
                                    <FormControlLabel value="N" control={<Radio color="primary" />} label="No" />
                                </Field>
                                <Field
                                className={classes.textField}
                                name="numeroCuentaDomiciliacion"
                                component={renderField}
                                label="No. de cuenta"
                                placeholder="No. de cuenta"
                                type="text"
                                required={iformularios ? iformularios.find( iform => (iform.valorGenerico === 'numeroCuenta' && iform.esRequerido==='S')) !== undefined: false } />
                                <Field
                                    className={classes.textField}
                                    name="bancoDomiciliacion"
                                    component={renderField}
                                    label="Banco"
                                    placeholder="Banco"
                                    type="text"
                                    required={iformularios ? iformularios.find( iform => (iform.valorGenerico === 'banco' && iform.esRequerido==='S')) !== undefined: false } />
                                <Field
                                    className={classes.textField}
                                    name="clabeDomiciliacion"
                                    component={renderField}
                                    label="Clabe"
                                    placeholder="Clabe"
                                    type="text"
                                    required={iformularios ? iformularios.find( iform => (iform.valorGenerico === 'Clabe' && iform.esRequerido==='S')) !== undefined: false } />
                            </div>
                            <Row between="xs">
                                <Field 
                                    name="funcionarioPublico" 
                                    component={renderRadioGroup} 
                                    className={classes.formControlCredito}
                                    marginLeft='18px'
                                    label={'¿Desempeña o ha desempeñado funciones públicas ... partidos políticos?'}
                                    row
                                    required={iformularios ? iformularios.find( iform => (iform.valor === 'funcionarioPublico' && iform.esRequerido==='S')) !== undefined: false }
                                    >
                                    <FormControlLabel value="S" control={<Radio color="primary" />} label="Si" />
                                    <FormControlLabel value="N" control={<Radio color="primary" />} label="No" />
                                </Field>
                                <Field 
                                    name="parienteFuncionarioPublico" 
                                    component={renderRadioGroup} 
                                    className={classes.formControlCredito}
                                    marginLeft='18px'
                                    label={'¿Es cónyuge o tiene parentesco por consanguinidad ... parrafo anterior?'}
                                    row
                                    required={iformularios ? iformularios.find( iform => (iform.valor === 'parienteFuncionarioPublico' && iform.esRequerido==='S')) !== undefined: false }
                                    >
                                    <FormControlLabel value="S" control={<Radio color="primary" />} label="Si" />
                                    <FormControlLabel value="N" control={<Radio color="primary" />} label="No" />
                                </Field>                                
                            </Row>                            
                        </div>
                    </form>                
                </Grid>
            </Paper>
        )
    }
}

DatosCreditoComponent.propTypes = {
    categoria: PropTypes.string,
    segmento: PropTypes.string,
    tipoProducto: PropTypes.string,
    codigoProducto: PropTypes.string,
    diaPago: PropTypes.number,
    plazo: PropTypes.number,
    montoOtorgado: PropTypes.string,
    tasa: PropTypes.string,
    frecuenciaPago: PropTypes.string,
    tipoDisposicion: PropTypes.string,
    oficinaDisposicion: PropTypes.number,
    codigoDestinoCredito: PropTypes.string,
    medioContacto: PropTypes.string,
    listaCatalogos: PropTypes.array,
    descripcionCatalogos: PropTypes.array,
    iformularios: PropTypes.array,
    catalogoProductos: PropTypes.array,
    catalogoFrecuencias: PropTypes.array,
    catalogoPlazos: PropTypes.array,
    handleSelectPlazo: PropTypes.func.isRequired,
    handleOnBlurPlazo: PropTypes.func.isRequired,
};

const DatosCreditoForm = reduxForm({ 
    form: 'DatosCredito', 
    destroyOnUnmount: false 
})(DatosCreditoComponent);

export default withStyles(STYLES)(setPropsAsInitial(DatosCreditoForm));