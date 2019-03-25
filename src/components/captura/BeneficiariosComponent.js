import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';  
import { Button, Icon, MenuItem,  } from '@material-ui/core';
import { Field } from 'redux-form';
import { STYLES } from '../../constants/styles';
import { renderField, renderSelectField } from './../../utilities/index';

class BeneficiariosComponent extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    }
    
    render() {
        const { classes, 
            fields, 
            meta: { touched, error, submitFailed }, 
            relacionesBeneficiarios, 
            handleObtenerRelaciones,
            maximoBeneficiarios } = this.props;
        return (            
            <div>
                <div>
                    { fields.length < maximoBeneficiarios &&
                        <Button aria-label="Agregar beneficiario" 
                        onClick={
                            () => {
                                fields.push();
                                relacionesBeneficiarios && handleObtenerRelaciones();
                            }
                        }>
                            <Icon color="primary">add</Icon>
                            Beneficiario
                        </Button>
                    }
                {(touched || submitFailed) && error && <span>{error}</span>}
                {fields.map((beneficiario, index, fields ) => (
                <div key={index}>
                    <Field
                        name={`${beneficiario}.nombre`}
                        type="text"
                        component={renderField}
                        label="Nombre"
                        className={classes.textField}
                    />
                    <Field
                        name={`${beneficiario}.apellidoPaterno`}
                        type="text"
                        component={renderField}
                        label="Apellido Paterno"
                        className={classes.textField}
                    />
                    <Field
                        name={`${beneficiario}.apellidoMaterno`}
                        component={renderField}
                        className={classes.textField}
                        label="Apellido Materno" >
                    </Field>
                    <Field
                        name={`${beneficiario}.codigoRelacion`}
                        component={renderSelectField}
                        className={classes.formControl}
                        label="Relación" >
                        { 
                            relacionesBeneficiarios ? relacionesBeneficiarios.map(relacion => <MenuItem key={relacion.codigo} value={relacion.codigo}>{relacion.descripcion}</MenuItem>): null
                        }
                    </Field>
                    <Field
                        name={`${beneficiario}.pctSumaAsegurada`}
                        type="text"
                        component={renderField}
                        label="Porcentaje Suma Asegurada"
                        className={classes.textField}
                    />
                    <Button aria-label="Quitar beneficiario" onClick={() => fields.remove(index)}>
                        <Icon color="primary">delete</Icon>
                    </Button>                    
                </div>
                ))}
                </div>
            </div>
        )
    }
}

export default withStyles(STYLES)(BeneficiariosComponent);