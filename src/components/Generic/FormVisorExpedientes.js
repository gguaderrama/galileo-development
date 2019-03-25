import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Button, DialogActions } from '@material-ui/core';
import { STYLES } from '../../constants/styles';
import { Field, reduxForm } from 'redux-form';
import { renderField } from './../../utilities/index';
import { setPropsAsInitial } from './../../utilities/setPropsAsInitials';

const validate = values => {
    const errors = {}
    const requiredFields = [
      'montosolicitud',
    ]
    requiredFields.forEach(field => {
      if (!values[field]) {
        errors[field] = 'Requerido'
      }
    })
    return errors;
}

class FormVisorExpedientes extends Component {
    static propTypes = {
        solicitud: PropTypes.string,
        contrato: PropTypes.string,
        cliente: PropTypes.string,
        handleConsultar: PropTypes.func.isRequired,
    }

    render() {
        const { classes, 
            handleConsultar, 
            pristine, 
            solicitud } = this.props;
        return (
            <Paper>
                <form> 
                    <Field
                        className={classes.textField}
                        name="solicitud"
                        component={renderField}
                        label="Solicitud"
                        placeholder="Solicitud"
                        inputProps={{
                            maxLength: 12,
                        }}
                        disabled={!!solicitud}
                    />
                    <Field
                        className={classes.textField}
                        name="contrato"
                        component={renderField}
                        label="Contrato"
                        placeholder="Contrato"
                        inputProps={{
                            maxLength: 12,
                        }}
                        disabled={!!solicitud}
                    />
                    <Field
                        className={classes.textField}
                        name="cliente"
                        component={renderField}
                        label="Cliente"
                        placeholder="Cliente"
                        inputProps={{
                            maxLength: 12,
                        }}
                        disabled={!!solicitud}
                    />
                <DialogActions>
                    <Button variant="contained" color="primary" type="button" disabled={pristine} onClick={handleConsultar}>
                        Consultar
                    </Button>
                </DialogActions>
                </form>                
            </Paper>
        )
    }
}

const VisorExpedientesForm = reduxForm({ 
    form: 'VisorExpedientes', 
    validate,
})(FormVisorExpedientes);

export default withStyles(STYLES)(setPropsAsInitial(VisorExpedientesForm));