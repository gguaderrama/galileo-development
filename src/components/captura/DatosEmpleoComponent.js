import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import { STYLES } from '../../constants/styles';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import { Field, reduxForm } from 'redux-form';
import { renderField, renderSelectField, toUpper } from './../../utilities/index';
import { setPropsAsInitial } from './../../utilities/setPropsAsInitials';
import { NumberFormatCustomRF } from '../../utilities/format';

const validate = values => {    
    const errors = {};
    return errors
}

class DatosEmpleoComponent extends Component {
    render() {
        const { classes, 
            listaCatalogos, 
            catalogoGiros, 
            puestos } = this.props;
        return (
            <div>
                <Paper>
                    <Typography align="left">
                        Datos del Empleo
                    </Typography>
                    <Field
                        className={classes.textField}
                        parse={toUpper}
                        name="nombreEmpresa"
                        component={renderField}
                        label="Nombre Empresa"
                        placeholder="Nombre Empresa"
                        inputProps={{
                            maxLength: 100,
                        }}
                        />
                    <Field
                        className={classes.textField}
                        parse={toUpper}
                        name="razonSocialEmpresa"
                        component={renderField}
                        label="Razon Social Empresa"
                        placeholder="Razon Social Empresa"
                        inputProps={{
                            maxLength: 60,
                        }}
                        />
                    <Field
                        className={classes.textField}
                        name="egresos"
                        component={renderField}
                        label="Egresos"
                        placeholder="Egresos"
                        type="text"
                        InputProps={{
                            inputComponent: NumberFormatCustomRF,
                        }}
                        />
                    <Field
                        name="frecuenciaCobro"
                        component={renderSelectField}
                        label="Frecuencia Cobro" 
                        className={classes.formControlCredito}
                        padding='18px'
                        >
                        { 
                            listaCatalogos ? listaCatalogos.filter(item => item.tipoCodigo === 'FREC').map(item => <MenuItem key={item.codigo} value={item.codigo}>{item.descripcion}</MenuItem>): null
                        }
                    </Field>
                    <Field
                        className={classes.textField}
                        name="fechaIngresoEmpresa"
                        component={renderField}
                        label="Fecha Ingreso Empresa"
                        placeholder="Fecha Ingreso Empresa"
                        type="date"
                    />
                    <Field
                        className={classes.textField}
                        parse={toUpper}
                        name="codigoTipoEmpleadoEmpresa"
                        component={renderField}
                        label="Tipo Empleado"
                        placeholder="Tipo Empleado"
                        />
                    <Field
                        className={classes.textField}
                        parse={toUpper}
                        name="grupoEmpleado"
                        component={renderField}
                        label="Grupo Empleado"
                        placeholder="Grupo Empleado"
                        />
                    <Field
                        name="codigoRelacionEmpresa"
                        component={renderSelectField}
                        label="Es Usted" 
                        className={classes.formControlCredito}
                        padding='18px'
                        >
                        { 
                            listaCatalogos ? listaCatalogos.filter(item => item.tipoCodigo === 'RELEMP').map(item => <MenuItem key={item.codigo} value={item.codigo}>{item.descripcion}</MenuItem>): null
                        }
                    </Field>
                    <Field
                        name="codigoPuestoOcupacion"
                        component={renderSelectField}
                        label="Puesto Ocupacion" 
                        className={classes.formControlCredito}
                        padding='18px'
                        >
                        { 
                            puestos ? puestos.map(item => <MenuItem key={item.codigoPuesto} value={item.codigoPuesto}>{item.descripcion}</MenuItem>): null
                        }
                    </Field>
                    <Field
                        className={classes.textField}
                        parse={toUpper}
                        name="objetoVentaEmpresa"
                        component={renderField}
                        label="Si es Venta ¿Que Vende?"
                        placeholder="Si es Venta ¿Que Vende?"
                        inputProps={{
                            maxLength: 40,
                        }}
                        />
                    <Field
                        name="codigoEstablecimiento"
                        component={renderSelectField}
                        label="Usted Trabaja en" 
                        className={classes.formControlCredito}
                        padding='18px'
                        >
                        { 
                            listaCatalogos ? listaCatalogos.filter(item => item.tipoCodigo === 'TPOEST').map(item => <MenuItem key={item.codigo} value={item.codigo}>{item.descripcion}</MenuItem>): null
                        }
                    </Field>
                    <Field
                        className={classes.textField}
                        parse={toUpper}
                        name="rfcEmpresa"
                        component={renderField}
                        label="RFC Empresa"
                        placeholder="RFC Empresa"
                        inputProps={{
                            maxLength: 13,
                        }}
                        />
                    <Field
                        className={classes.textField}
                        name="ingresos"
                        component={renderField}
                        label="Ingresos"
                        placeholder="Ingresos"
                        type="text"
                        InputProps={{
                            inputComponent: NumberFormatCustomRF,
                        }}                        
                        />
                    <Field
                        className={classes.textField}
                        parse={toUpper}
                        name="otrosIngresos"
                        component={renderField}
                        label="Otros Ingresos"
                        placeholder="Otros Ingresos"
                        type="text"
                        InputProps={{
                            inputComponent: NumberFormatCustomRF,
                        }}
                        />
                    <Field
                        className={classes.textField}
                        name="numeroEmpleadoEmpresa"
                        component={renderField}
                        label="Número Empleado"
                        placeholder="Número Empleado"
                        inputProps={{
                            maxLength: 12,
                        }}
                        />
                    <Field
                        className={classes.textField}
                        parse={toUpper}
                        name="nss"
                        component={renderField}
                        label="NSS"
                        placeholder="NSS"
                        inputProps={{
                            maxLength: 11,
                        }}
                        />
                    <Field
                        className={classes.textField}
                        parse={toUpper}
                        name="codigoTipoContratoEmpresa"
                        component={renderField}
                        label="Tipo Contrato"
                        placeholder="Tipo Contrato"
                        inputProps={{
                            maxLength: 6,
                        }}
                        />                    
                </Paper>
                <Paper>
                    <Field
                        className={classes.textField}
                        parse={toUpper}
                        name="nombreJefe"
                        component={renderField}
                        label="Nombre Jefe"
                        placeholder="Nombre Jefe"
                        inputProps={{
                            maxLength: 40,
                        }}
                        />
                    <Field
                        className={classes.textField}
                        parse={toUpper}
                        name="apellidoPaternoJefe"
                        component={renderField}
                        label="Apellido Paterno Jefe"
                        placeholder="Apellido Paterno Jefe"
                        inputProps={{
                            maxLength: 40,
                        }}
                        />
                    <Field
                        className={classes.textField}
                        parse={toUpper}
                        name="apellidoMaternoJefe"
                        component={renderField}
                        label="Apellido Materno Jefe"
                        placeholder="Apellido Materno Jefe"
                        inputProps={{
                            maxLength: 40,
                        }}
                        />
                    <Field
                        className={classes.textField}
                        parse={toUpper}
                        name="areaPuestoJefe"
                        component={renderField}
                        label="Area Puesto Jefe"
                        placeholder="Area Puesto Jefe"
                        inputProps={{
                            maxLength: 30,
                        }}
                        />
                    <Field
                        name="tipoCotizacion"
                        component={renderSelectField}
                        label="Cotiza En" 
                        className={classes.formControlCredito}
                        padding='18px'
                        >
                        { 
                            listaCatalogos ? listaCatalogos.filter(item => item.tipoCodigo === 'LCOT').map(item => <MenuItem key={item.codigo} value={item.codigo}>{item.descripcion}</MenuItem>): null
                        }
                    </Field>
                    <Field
                        name="codigoGiroEmpresa"
                        component={renderSelectField}
                        label="Giro" 
                        className={classes.formControlCredito}
                        padding='18px'
                        >
                        { 
                            catalogoGiros ? catalogoGiros.map(item => <MenuItem key={item.codigoGiro} value={item.codigoGiro}>{item.descripcion}</MenuItem>): null
                        }
                    </Field>
                    <Field
                        className={classes.textField}
                        parse={toUpper}
                        name="aniosExperienciaGiro"
                        component={renderField}
                        label="Años experiencia giro"
                        placeholder="Años experiencia giro"
                        inputProps={{
                            maxLength: 2,
                        }}
                        />
                    <Field
                        className={classes.textField}
                        parse={toUpper}
                        name="mesesExperienciaGiro"
                        component={renderField}
                        label="Meses experiencia giro"
                        placeholder="Meses experiencia giro"
                        inputProps={{
                            maxLength: 2,
                        }}
                        />
                </Paper>
            </div>
        )
    }
}

const DatosEmpleoForm = reduxForm({ 
    form: 'DatosEmpleo', 
    validate,
    destroyOnUnmount: false 
})(DatosEmpleoComponent);

export default withStyles(STYLES)(setPropsAsInitial(DatosEmpleoForm));