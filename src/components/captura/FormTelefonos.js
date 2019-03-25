import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Button, DialogActions } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { STYLES } from '../../constants/styles';
import { Field, reduxForm } from 'redux-form';
import { renderField, renderSelectField, toUpper } from './../../utilities/index';

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

class FormTelefonos extends Component {
    static propTypes = {
        telefono: PropTypes.object,
        handleAddTelefono: PropTypes.func.isRequired,
    }

    render() {
        const { classes, 
            handleAddTelefono, 
            pristine, 
            listaCatalogos, 
            handleSaveTelefono, 
            edicion } = this.props;
        return (
            <Paper>
                <Typography>
                    Teléfonos
                </Typography>
                <form> 
                    <Field
                        name="tipoTelefono"
                        component={renderSelectField}
                        label="Tipo teléfono" 
                        className={classes.formControlCredito}
                        padding='18px'
                        >
                        { 
                            listaCatalogos ? listaCatalogos.filter(item => item.tipoCodigo === 'TELE').map(item => <MenuItem key={item.codigo} value={item.codigo}>{item.descripcion}</MenuItem>): null
                        }
                    </Field>
                    <Field
                        className={classes.textField}
                        parse={toUpper}
                        name="telefono"
                        component={renderField}
                        label="Teléfono"
                        placeholder="Teléfono"
                        inputProps={{
                            maxLength: 10,
                        }}
                         />
                    <Field
                        name="tipoPlan"
                        component={renderSelectField}
                        label="Plan" 
                        className={classes.formControlCredito}
                        padding='18px'
                        >
                        { 
                            listaCatalogos ? listaCatalogos.filter(item => item.tipoCodigo === 'PLAN').map(item => <MenuItem key={item.codigo} value={item.codigo}>{item.descripcion}</MenuItem>): null
                        }
                    </Field>
                    <Field
                        name="claveProveedorServicios"
                        component={renderSelectField}
                        label="Proveedor" 
                        className={classes.formControlCredito}
                        padding='18px'
                        >
                        { 
                            listaCatalogos ? listaCatalogos.filter(item => item.tipoCodigo === 'PROVDR').map(item => <MenuItem key={item.codigo} value={item.codigo}>{item.descripcion}</MenuItem>): null
                        }
                    </Field>
                <DialogActions>
                    { !edicion ?
                    <Button variant="contained" color="primary" type="button" disabled={pristine} onClick={handleAddTelefono}>
                        Agregar
                    </Button> :
                    <Button variant="contained" color="primary" type="button" disabled={pristine} onClick={handleSaveTelefono}>
                        Guardar
                    </Button> 
                    }
                </DialogActions>
                </form>                
            </Paper>
        )
    }
}

const TelefonosForm = reduxForm({ 
    form: 'Telefonos', 
    validate,
    destroyOnUnmount: false 
})(FormTelefonos);

export default withStyles(STYLES)(TelefonosForm);