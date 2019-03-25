import React, { Component } from 'react';
import {Paper, Button, DialogActions } from '@material-ui/core';
import { Field, reduxForm } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import { STYLES } from '../../constants/styles';
import { renderField, renderSelectField } from './../../utilities/index';

const validate = values => {
    const errors = {}
    const requiredFields = [
        'nombre',
        'apellidoPaterno',
        'pctSumaAsegurada',
    ]
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required'
        }
    })
    return errors
}

class FormBeneficiario extends Component {
    render() {
        const { classes, 
            catalogoRelaciones, 
            handleAddBeneficiario, 
            pristine } = this.props;
        return (
            <Paper>
                <form>
                <Field
                    name="nombre"
                    type="text"
                    component={renderField}
                    label="Nombre"
                    className={classes.textField}
                />
                <Field
                    name="apellidoPaterno"
                    type="text"
                    component={renderField}
                    label="Apellido Paterno"
                    className={classes.textField}
                />
                <Field
                    name="apellidoMaterno"
                    type="text"
                    component={renderField}
                    label="Apellido Materno"
                    className={classes.textField}
                />
                <Field
                    name="codigoRelacion"
                    component={renderSelectField}
                    className={classes.formControl}
                    label="Relación" >
                    { 
                        catalogoRelaciones ? catalogoRelaciones.map(relacion => <MenuItem key={relacion.codigoRelacion} value={relacion.codigoRelacion}>{relacion.descripcion}</MenuItem>): null
                    }
                </Field>
                <Field
                    name="pctSumaAsegurada"
                    type="text"
                    component={renderField}
                    label="Porcentaje Suma Asegurada"
                    className={classes.textField}
                />
                <DialogActions>
                    <Button variant="contained" color="primary" type="button" disabled={pristine} onClick={handleAddBeneficiario}>
                        Agregar
                    </Button>
                </DialogActions>
                </form>
            </Paper>
        )
    }
}

const BeneficiariosForm = reduxForm({
    form: 'Beneficiarios',
    validate
})(FormBeneficiario);

export default withStyles(STYLES)(BeneficiariosForm);