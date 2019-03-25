import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Paper } from '@material-ui/core';
import { Button, DialogActions } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Field, reduxForm } from 'redux-form';
import MenuItem from '@material-ui/core/MenuItem';
import { STYLES } from '../../constants/styles';
import { renderField, renderSelectField, toUpper } from './../../utilities/index';
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

class FormReferencia extends Component {
    static propTypes = {
        classes: PropTypes.object,
        handleAddReferencia: PropTypes.func.isRequired,
        handleClose: PropTypes.func.isRequired,
        listaCatalogos: PropTypes.array.isRequired,
        catalogoRelaciones: PropTypes.array.isRequired,
        handleSaveReferencia: PropTypes.func.isRequired,
        edicion: PropTypes.bool.isRequired,
    }

    render() {
        const { classes, 
            handleAddReferencia, 
            handleClose, 
            handleSaveReferencia,
            pristine, 
            catalogoRelaciones,
            listaCatalogos,
            edicion } = this.props;
        return (
            <div>
                <form>
                    <Paper>
                        <div>
                            <Typography>Referencia</Typography>
                        </div>
                        <Field
                            className={classes.textField}
                            parse={toUpper}
                            name="tipoReferencia"
                            component={renderField}
                            label="Tipo Referencia"
                            placeholder="Tipo Referencia"
                            />
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
                            name="codigoRelacion"
                            component={renderSelectField}
                            label="Parentesco" 
                            className={classes.formControl}                        
                            >
                            { 
                                catalogoRelaciones ? catalogoRelaciones.map(relacion => <MenuItem key={relacion.codigoRelacion} value={relacion.codigoRelacion}>{relacion.descripcion}</MenuItem>): null
                            }
                        </Field>
                    </Paper>
                    <Paper>
                        <div>
                            <Typography>Teléfono</Typography>
                        </div>
                        <Field
                            className={classes.textField}
                            name="telefono"
                            component={renderField}
                            label="Teléfono"
                            placeholder="Teléfono"
                            inputProps={{
                                maxLength: 10,
                            }}
                            />
                        <Field
                            className={classes.textField}
                            name="extension"
                            component={renderField}
                            label="Extensión"
                            placeholder="Extensión"
                            inputProps={{
                                maxLength: 10,
                            }}
                            />
                        <Field
                            name="tipoPlan"
                            component={renderSelectField}
                            label="Plan" 
                            className={classes.formControl}
                            >
                            { 
                                listaCatalogos ? listaCatalogos.filter(item => item.tipoCodigo === 'PLAN').map(item => <MenuItem key={item.codigo} value={item.codigo}>{item.descripcion}</MenuItem>): null
                            }
                        </Field>
                        <Field
                            name="claveProveedorServicios"
                            component={renderSelectField}
                            label="Proveedor" 
                            className={classes.formControl}
                            >
                            { 
                                listaCatalogos ? listaCatalogos.filter(item => item.tipoCodigo === 'PROVDR').map(item => <MenuItem key={item.codigo} value={item.codigo}>{item.descripcion}</MenuItem>): null
                            }
                        </Field>
                    </Paper>
                    <DialogActions>
                        <Button variant="contained" onClick={handleClose}>
                            Cancelar
                        </Button>
                        { !edicion ?
                        <Button variant="contained" color="primary" disabled={pristine} onClick={handleAddReferencia}>
                            Aceptar
                        </Button> :
                        <Button variant="contained" color="primary" type="button" disabled={pristine} onClick={handleSaveReferencia}>
                            Guardar
                        </Button> 
                        }
                    </DialogActions>
                </form>
            </div>
        )
    }
}

const ReferenciasForm = reduxForm({ 
    form: 'Referencias', 
    validate,
    destroyOnUnmount: true
})(FormReferencia);

export default withStyles(STYLES)(setPropsAsInitial(ReferenciasForm));