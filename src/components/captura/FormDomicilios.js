import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Paper, Button, DialogActions, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
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

class FormDomicilios extends Component {
    static propTypes = {
        domicilio: PropTypes.object,
        handleAddDomicilio: PropTypes.func.isRequired,
        handleOnChangeEstado: PropTypes.func.isRequired,
        handleOnChangeCP: PropTypes.func.isRequired,
        handleOnChangeColonia: PropTypes.func.isRequired,
        catalogoEstados: PropTypes.array,
        catalogoColonias: PropTypes.array,
        listaCatalogos: PropTypes.array,
        handleSaveDomicilio: PropTypes.func.isRequired,
        edicion: PropTypes.bool,
    }

    render() {
        const { classes,
            pantalla,
            handleAddDomicilio,
            pristine,
            listaCatalogos,
            catalogoEstados,
            handleOnChangeEstado,
            handleOnChangeCP,
            handleOnChangeColonia,
            handleSaveDomicilio,
            catalogoColonias,
            edicion } = this.props;
        console.log("HI", catalogoColonias)

        return (
            <Paper >
                <Typography style={{paddingTop: '25px', paddingLeft: '18px'}}>Domicilios</Typography>
                <form>
                    <Field
                        name="tipoDomicilio"
                        component={renderSelectField}
                        label="Tipo Domicilio"
                        className={classes.formControlCredito}
                        padding='18px'
                        disabled={edicion}                        
                    >
                        {
                            listaCatalogos ? listaCatalogos.filter(item => item.tipoCodigo === 'TDOMI').map(item => <MenuItem key={item.codigo} value={item.codigo}>{item.descripcion}</MenuItem>) : null
                        }
                    </Field>
                    <Field
                        className={classes.textField}
                        parse={toUpper}
                        name="calle"
                        component={renderField}
                        label="Calle"
                        placeholder="Calle"
                        inputProps={{
                            maxLength: 60,
                        }}
                    />
                    <Field
                        className={!pantalla ?
                            classes.textField :
                            classes.textFieldDisabled}
                        parse={toUpper}
                        name="entreCalles"
                        component={renderField}
                        label="Entre Calles"
                        placeholder="Entre Calles"
                        inputProps={{
                            maxLength: 100,
                        }}
                    />
                    <Field
                        className={classes.textField}
                        parse={toUpper}
                        name="noExterior"
                        component={renderField}
                        label="Número Exterior"
                        placeholder="Número Exterior"
                        inputProps={{
                            maxLength: 15,
                        }}
                    />
                    <Field
                        className={classes.textField}
                        parse={toUpper}
                        name="noInterior"
                        component={renderField}
                        label="Número Interior"
                        placeholder="Número Interior"
                        inputProps={{
                            maxLength: 10,
                        }}
                    />
                    <Field
                        name="codigoEstado"
                        component={renderSelectField}
                        label="Estado"
                        className={classes.formControlCredito}
                        onChange={handleOnChangeEstado}
                        padding='18px'
                    >
                        {
                            catalogoEstados ? catalogoEstados.map(item => <MenuItem key={item.codigoEstado} value={item.codigoEstado}>{item.descripcion}</MenuItem>) : null
                        }
                    </Field>
                    <Field
                        className={classes.textField}
                        parse={toUpper}
                        name="cp"
                        component={renderField}
                        label="Código Postal"
                        placeholder="Código Postal"
                        onBlur={handleOnChangeCP}
                        inputProps={{
                            maxLength: 5,
                        }}
                    />
                    <Field
                        name="colonia"
                        component={renderSelectField}
                        label="Colonia"
                        className={classes.formControlCredito}
                        onChange={handleOnChangeColonia}
                        padding='18px'
                    >
                        {
                            catalogoColonias && catalogoColonias.constructor === Array  ? catalogoColonias.map(item => <MenuItem key={item.asentamiento} value={item.asentamiento}>{item.asentamiento}</MenuItem>) : null
                        }
                    </Field>
                    <Field
                        className={classes.textField}
                        parse={toUpper}
                        name="ciudad"
                        component={renderField}
                        label="Ciudad"
                        placeholder="Ciudad"
                        inputProps={{
                            maxLength: 40,
                        }}
                    />
                    <Field
                        name="tipoVivienda"
                        component={renderSelectField}
                        label="Tipo Vivienda"
                        className={classes.formControlCredito}
                        padding='18px'
                    >
                        {
                            listaCatalogos && listaCatalogos.constructor === Array ? listaCatalogos.filter(item => item.tipoCodigo === 'VIVI').map(item => <MenuItem key={item.codigo} value={item.codigo}>{item.descripcion}</MenuItem>) : null
                        }
                    </Field>
                    <div>
                        <div>
                            <Typography style={{paddingTop: '18px', paddingLeft: '18px'}}>Antiguedad en Domicilio</Typography>
                        </div>
                        <Field
                            className={classes.textField}
                            parse={toUpper}
                            name="anioAntiguedad"
                            component={renderField}
                            label="Años"
                            placeholder="Años"
                        />
                        <Field
                            className={classes.textField}
                            parse={toUpper}
                            name="mesAntiguedad"
                            component={renderField}
                            label="Meses"
                            placeholder="Meses"
                        />
                    </div>
                    <Field
                        className={classes.textFieldDisabled}
                        parse={toUpper}
                        name="municipioDelegacion"
                        component={renderField}
                        label="Municipio"
                        placeholder="Municipio"
                    />
                    <Field
                        className={classes.textFieldDisabled}
                        parse={toUpper}
                        name="pais"
                        component={renderField}
                        label="País"
                        placeholder="País"
                    />                    
                    {/* <Field
                        className={!pantalla ?
                            classes.textField :
                            classes.textFieldDisabled}
                        parse={toUpper}
                        name="fechaVerificacionDomicilio"
                        component={renderField}
                        label="Fecha Verificación"
                        placeholder="Fecha Verificación"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    /> */}
                    <DialogActions>
                        {!edicion ?
                            <Button variant="contained" color="primary" type="button" disabled={pristine} onClick={handleAddDomicilio}>
                                Agregar
                        </Button> :
                            <Button variant="contained" color="primary" type="button" disabled={pristine} onClick={handleSaveDomicilio}>
                                Guardar
                        </Button>
                        }
                    </DialogActions>
                </form>
            </Paper>
        )
    }
}

const DomiciliosForm = reduxForm({
    form: 'Domicilios',
    validate
})(FormDomicilios);

export default withStyles(STYLES)(DomiciliosForm);