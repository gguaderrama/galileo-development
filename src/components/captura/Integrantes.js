import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Field, reduxForm } from 'redux-form';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';


const renderRadioGropu = ({
    input,
    rest,
    name,
    label

}) => (
        <FormControl >
            <RadioGroup style={{
                padding: "45px",
                height: "15px",

            }}   {...input}>
                <FormControlLabel value="female" control={<Radio color="primary" />} label="Masculino" />
                <FormControlLabel value="male" control={<Radio color="primary" />} label="Femenino" />
            </RadioGroup>
        </FormControl>
    );

const renderField = ({
    input,
    label,
    type,
    meta: { touched, error },
    ...custom
}) => (
        <TextField

            style={{ float: "left" }}
            type={type}
            label={label}
            margin="normal"
            {...input}
            {...custom}

        />
    )

const Integrantes = props => {
    return (
        <div style={{
            padding: 15,
            display: "flex",
            minHeight: "5vh",
            width: "calc(80% - 30px)"

        }}  >
            <form >
                <Field
                    name="persona"
                    component={renderField}
                    label="Persona" />
                <Field
                    name="nombre"
                    component={renderField}
                    label="Nombre" />
                <Field
                    name="contratoAnterior"
                    component={renderField}
                    label="Contrato Anterior" />
                <Field
                    name="saldoContratoAnterior"
                    component={renderField}
                    type="text"
                    label="Saldo Contrato Anterior" />
                <div style={{
                    display: "flex",
                    minHeight: "5vh",
                    width: "calc(95% - 10px)",


                }} >
                    <Field
                        name="nombre"
                        component={renderField}
                        label="Nombre" />
                    <Field
                        name="primerApellido"
                        component={renderField}
                        label="Primer Apellido" />
                    <Field
                        name="segundoApellido"
                        component={renderField}
                        label="Segundo Apellido" />
                    <Field
                        name="rfc"
                        component={renderField}
                        type="text"
                        label="RFC" />
                    <Field
                        name="curp"
                        component={renderField}
                        type="text"
                        label="CURP" />
                    <Field
                        name="email"
                        component={renderField}
                        type="text"
                        label="Correo Electrónico" />
                    <Field name="sexo" component={renderRadioGropu} label="Hombre" />


                </div>



            </form>
        </div >
    );
};

Integrantes.propTypes = {

};

const IntegrantesForm = reduxForm({ form: 'Integrantes' ,destroyOnUnmount: false})(Integrantes);

export default IntegrantesForm;