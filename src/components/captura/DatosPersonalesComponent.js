import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import { STYLES } from '../../constants/styles';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Field, reduxForm } from 'redux-form';
import { renderField, renderSelectField, renderRadioGroup, toUpper } from './../../utilities/index';
import { setPropsAsInitial } from './../../utilities/setPropsAsInitials';
import FormConQuienVive from './FormConQuienVive';
import { validaCorreo, esEntero } from '../../utilities/validations';

const validate = values => {
    const errors = {}
    return errors
}

class DatosPersonalesComponent extends Component {
    render() {
        const { classes,
            pantalla,
            catalogoRelaciones,
            catalogoEstados,
            catalogoPaises,
            listaCatalogos,
        } = this.props;
        return (
            <div>
                <Paper>
                <Typography
                    align="left"
                    >
                    Datos Personales</Typography>
                <Field
                    className={classes.textField}
                    parse={toUpper}
                    name="nombre"
                    component={renderField}
                    label="Nombre"
                    placeholder="Nombre"
                    inputProps={{
                        maxLength: 40,
                    }}
                />
                <Field
                    className={classes.textField}
                    parse={toUpper}
                    name="apellidoPaterno"
                    component={renderField}
                    label="Apellido Paterno"
                    placeholder="Apellido Paterno"
                    inputProps={{
                        maxLength: 40,
                    }}
                />
                <Field
                    className={classes.textField}
                    parse={toUpper}
                    name="apellidoMaterno"
                    component={renderField}
                    label="Apellido Materno"
                    placeholder="Apellido Materno"
                    inputProps={{
                        maxLength: 40,
                    }}
                />
                <Field
                    className={classes.textField}
                    name="fechaNacimiento"
                    component={renderField}
                    label="Fecha Nacimiento"
                    placeholder="Fecha Nacimiento"
                    type="date"
                />
                <Field
                    className={classes.textField}
                    parse={toUpper}
                    name="rfcCapturado"
                    component={renderField}
                    label="RFC"
                    placeholder="RFC"
                    inputProps={{
                        maxLength: 13,
                    }}
                />
                <Field
                    className={!pantalla ?
                        classes.textField :
                        classes.textFieldDisabled}
                    parse={toUpper}
                    name="rfcCalculado"
                    component={renderField}
                    label="RFC Calculado"
                    placeholder="RFC Calculado"
                    disabled
                    inputProps={{
                        maxLength: 13,
                    }}
                />
                <Field
                    name="nacionalidad"
                    component={renderSelectField}
                    label={!pantalla && "Nacionalidad"}
                    className={classes.formControlCredito}
                    padding='18px'
                >
                    {
                        listaCatalogos ? listaCatalogos.filter(item => item.tipoCodigo === 'NACI').map(item => <MenuItem key={item.codigo} value={item.codigo}>{item.descripcion}</MenuItem>) : null
                    }
                </Field>
                <Field
                    name="codigoEstadoNacimiento"
                    component={renderSelectField}
                    label={!pantalla && "Lugar Nacimiento"}
                    className={classes.formControlCredito}
                    padding='18px'
                >
                    {
                        catalogoEstados ? catalogoEstados.map(estado => <MenuItem key={estado.codigoEstado} value={estado.codigoEstado}>{estado.descripcion}</MenuItem>) : null
                    }
                </Field>
                <Field
                    className={!pantalla ?
                        classes.textField :
                        classes.textFieldDisabled}
                    parse={toUpper}
                    name="curp"
                    component={renderField}
                    label="CURP"
                    placeholder="CURP"
                    inputProps={{
                        maxLength: 18,
                    }}
                />
                <Field
                    name="codigoIdentificacion"
                    component={renderSelectField}
                    label={!pantalla && "Tipo Identificación"}
                    className={classes.formControlCredito}
                    padding='18px'
                >
                    {
                        listaCatalogos ? listaCatalogos.filter(item => item.tipoCodigo === 'IDEN').map(item => <MenuItem key={item.codigo} value={item.codigo}>{item.descripcion}</MenuItem>) : null
                    }
                </Field>
                <Field
                    name="gradoEstudio"
                    component={renderSelectField}
                    label={!pantalla && "Grado Estudios"}
                    disabled={!!pantalla}
                    className={classes.formControlCredito}
                    padding='18px'
                >
                    {
                        listaCatalogos ? listaCatalogos.filter(item => item.tipoCodigo === 'ESTU').map(item => <MenuItem key={item.codigo} value={item.codigo}>{item.descripcion}</MenuItem>) : null
                    }
                </Field>
                <Field
                    name="codigoPaisNacimiento"
                    component={renderSelectField}
                    label={!pantalla && "País"}
                    className={classes.formControlCredito}
                    padding='18px'
                    disabled={!!pantalla}
                >
                    {
                        catalogoPaises ? catalogoPaises.map(pais => <MenuItem key={pais.codigoPais} value={pais.codigoPais}>{pais.descripcion}</MenuItem>) : null
                    }
                </Field>
                <Field
                    className={!pantalla ?
                        classes.textField :
                        classes.textFieldDisabled}
                    parse={toUpper}
                    name="numeroDependientes"
                    component={renderField}
                    label="Dependientes"
                    placeholder="Dependientes"
                    validate={esEntero}
                    disabled={!!pantalla}
                />
                <Field
                    className={!pantalla ?
                        classes.textField :
                        classes.textFieldDisabled}
                    parse={toUpper}
                    name="correo"
                    component={renderField}
                    label="Correo"
                    placeholder="Correo"
                    disabled={!!pantalla}
                    validate={validaCorreo}
                    inputProps={{
                        maxLength: 100,
                    }}
                />
                <Field
                    name="estadoCivil"
                    component={renderSelectField}
                    label={!pantalla && "Estado Civil"}
                    className={classes.formControlCredito}
                    padding='18px'
                    disabled={!!pantalla}
                >
                    {
                        listaCatalogos ? listaCatalogos.filter(item => item.tipoCodigo === 'ECIV').map(item => <MenuItem key={item.codigo} value={item.codigo}>{item.descripcion}</MenuItem>) : null
                    }
                </Field>
                <Field
                    className={classes.textField}
                    parse={toUpper}
                    name="tiempo"
                    component={renderField}
                    label="Tiempo"
                    placeholder="Tiempo"
                />
                <Field
                    name="sexo"
                    component={renderRadioGroup}
                    label={'Genero'}
                    className={classes.formControlCredito}
                    marginLeft='18px'
                    row
                >
                    <FormControlLabel value="M" control={<Radio color="primary" />} label="Masculino" />
                    <FormControlLabel value="F" control={<Radio color="primary" />} label="Femenino" />
                </Field>
                { this.props.personaVive &&
                    <FormConQuienVive catalogoRelaciones={catalogoRelaciones} {...this.props.personaVive[0]}></FormConQuienVive>
                }
                </Paper>
                <Paper>
                    <Typography
                        align="left"
                        >
                        Datos Con Quien Vive</Typography>
                    <Field
                        className={classes.textField}
                        parse={toUpper}
                        name="nombrePersonaVive"
                        component={renderField}
                        label="Nombre"
                        placeholder="Nombre"
                        />
                    <Field
                        className={classes.textField}
                        parse={toUpper}
                        name="apellidoPaternoPersonaVive"
                        component={renderField}
                        label="Apellido Paterno"
                        placeholder="Apellido Paterno"
                        />
                    <Field
                        className={classes.textField}
                        parse={toUpper}
                        name="apellidoMaternoPersonaVive"
                        component={renderField}
                        label="Apellido Materno"
                        placeholder="Apellido Materno"
                        />
                    <Field
                        name="codigoRelacionPersonaVive"
                        component={renderSelectField}
                        label="Relación Persona" 
                        className={classes.formControlCredito}
                        padding='18px'
                        >
                        { 
                            catalogoRelaciones ? catalogoRelaciones.map(relacion => <MenuItem key={relacion.codigoRelacion} value={relacion.codigoRelacion}>{relacion.descripcion}</MenuItem>): null
                        }
                    </Field>
                    <Field 
                        name="sexoPersonaVive" 
                        component={renderRadioGroup} 
                        label={'Genero'}
                        className={classes.formControlCredito}
                        marginLeft='18px'
                        row
                        >
                        <FormControlLabel value="M" control={<Radio color="primary" />} label="Masculino" />
                        <FormControlLabel value="F" control={<Radio color="primary" />} label="Femenino" />
                    </Field>
                </Paper>
            </div>
        )
    }
}

const DatosPersonalesForm = reduxForm({
    form: 'DatosPersonales',
    validate,
    destroyOnUnmount: false 
})(DatosPersonalesComponent);

export default withStyles(STYLES)(setPropsAsInitial(DatosPersonalesForm));