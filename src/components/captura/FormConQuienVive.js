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

const validate = values => {
    const errors = {}
    const requiredFields = [
      'monto',
    ]
    requiredFields.forEach(field => {
      if (!values[field]) {
        errors[field] = 'Required'
      }
    })
    return errors
}

class ConQuienViveComponent extends Component {

    render() {
        const { classes,
            catalogoRelaciones } = this.props;
        return (
            <Paper>
                <Typography
                    align="left"
                    color='primary'
                    variant="h6">
                    Datos Con Quien Vive</Typography>
                <Field
                    className={classes.textField}
                    parse={toUpper}
                    name="nombre"
                    component={renderField}
                    label="Nombre"
                    placeholder="Nombre"
                    />
                <Field
                    className={classes.textField}
                    parse={toUpper}
                    name="apellidoPaterno"
                    component={renderField}
                    label="Apellido Paterno"
                    placeholder="Apellido Paterno"
                    />
                <Field
                    className={classes.textField}
                    parse={toUpper}
                    name="apellidoMaterno"
                    component={renderField}
                    label="Apellido Materno"
                    placeholder="Apellido Materno"
                    />
                <Field
                    name="codigoRelacion"
                    component={renderSelectField}
                    label="Relación Persona" 
                    className={classes.formControl}                        
                    >
                    { 
                        catalogoRelaciones ? catalogoRelaciones.map(relacion => <MenuItem key={relacion.codigoRelacion} value={relacion.codigoRelacion}>{relacion.descripcion}</MenuItem>): null
                    }
                </Field>
                <Field 
                    name="sexo" 
                    component={renderRadioGroup} 
                    label={'Genero'}
                    marginLeft='18px'
                    row
                    >
                    <FormControlLabel value="M" control={<Radio />} label="Masculino" />
                    <FormControlLabel value="F" control={<Radio />} label="Femenino" />
                </Field>
            </Paper>
        )
    }
}

const FormConQuienVive = reduxForm({ 
    form: 'DatosConQuienVive', 
    validate,
    destroyOnUnmount: false 
})(ConQuienViveComponent);

export default withStyles(STYLES)(setPropsAsInitial(FormConQuienVive));