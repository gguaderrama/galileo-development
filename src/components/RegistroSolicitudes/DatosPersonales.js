import React, { Fragment } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';
import { Field, reduxForm } from 'redux-form';
import { textValidation } from '../../constants/Generic';
import { renderField, renderRadioGroup, toUpper, renderSelectField } from './../../utilities/index';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import { registroStyle } from './styles/styles';
import { setPropsAsInitial } from './../../utilities/setPropsAsInitials';
import moment from 'moment';

const valiateText = value => !textValidation(value) ? 'Solo letras' : undefined
const validateCURP = curp => curp && !/^[a-zA-Z]{4}\d{6}[a-zA-Z]{6}[a-zA-Z0-9]{1}\d{1}$/.test(curp) ? 'Formato Incorrecto' : undefined ? 'Formato Incorrecto' : undefined

const DatosPersonales = props => {
    const { classes, relaciones } = props;
    const { handleDateChange, handleSubmit, onBlurFecha, onChangeMaterno } = props;
    const { id, persona, apellidoPaterno, apellidoMaterno, nombre, selected, rfcCapturado } = props;
    moment.locale('ES');
    return (
        <Paper style={{ marginTop: '10px' }}>
            <div style={{ paddingTop: '10px', marginTop: '10px' }}>
                <Typography
                    style={{
                        marginBottom: '24px',
                        marginLeft: '13px',
                        color: 'rgba(0, 0, 0, 1)',
                        fontSize: '15px'
                    }}
                    align="left">
                    Datos Personales</Typography>
            </div>
            <div style={{ marginTop: '15px' }}>
                <form onSubmit={handleSubmit}>
                    <Field
                        InputProps={{ readOnly: nombre !== null ? true : false }}
                        InputLabelProps={{ required: true }}
                        className={classes.textFieldsDatosPersonales}
                        parse={toUpper}
                        name="nombre"
                        component={renderField}
                        label="Nombre"
                        placeholder="Nombre"
                        validate={valiateText}
                    />
                    <Field
                        InputProps={{ readOnly: apellidoPaterno !== null ? true : false }}
                        InputLabelProps={{ required: true }}
                        className={classes.textFieldsDatosPersonales}
                        parse={toUpper}
                        name="apellidoPaterno"
                        component={renderField}
                        label="Apellido Paterno"
                        placeholder="Apellido Paterno"
                        validate={valiateText}
                    />
                    <Field
                        onBlur={onChangeMaterno}
                        InputLabelProps={{ required: true }}
                        InputProps={{ readOnly: apellidoMaterno !== null ? true : false }}
                        className={classes.textFieldsDatosPersonales}
                        parse={toUpper}
                        name="apellidoMaterno"
                        component={renderField}
                        label="Apellido Materno"
                        placeholder="Apellido Materno"
                        validate={valiateText}
                    />
                    <MuiPickersUtilsProvider
                        utils={MomentUtils}>
                        <Fragment>
                            <DatePicker
                                onBlur={onBlurFecha}
                                disabled={persona !== '000000000000' ? true : false}
                                className={classes.textFieldsDatosPersonales}
                                keyboard={true} disableFuture={true}
                                name="fechaNacimiento" label='Fecha Nacimiento'
                                value={selected} onChange={handleDateChange}
                                format='MM/DD/YYYY'
                                animateYearScrolling={false}
                                mask={value =>
                                    value ? [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/] : []
                                }
                                disableOpenOnEnter
                                invalidDateMessage='Formato de fecha incorrecto'
                                maxDateMessage='Fecha de Nacimiento incorrecta'>
                            </DatePicker>

                        </Fragment>
                    </MuiPickersUtilsProvider>

                    <Field
                        InputProps={{ inputProps: { maxLength: 13 }, readOnly: rfcCapturado !== null ? true : false }}
                        InputLabelProps={{ required: true }}
                        className={classes.textFieldsDatosPersonales}
                        parse={toUpper}
                        name="rfcCapturado"
                        component={renderField}
                        label="RFC"
                        placeholder="RFC"
                    />
                    <Field
                        InputProps={{ inputProps: { maxLength: 18 }, readOnly: persona !== '000000000000' ? true : false }}
                        InputLabelProps={{ required: true }}
                        className={classes.textFieldsDatosPersonales}
                        parse={toUpper}
                        name="curp"
                        component={renderField}
                        label="CURP"
                        placeholder="CURP"
                        validate={validateCURP}
                    />
                    <Field
                        className={classes.radioSexo}
                        name="sexo"
                        marginLeft='30px'
                        component={renderRadioGroup}
                        label={'Genero'}
                        row>
                        <FormControlLabel value="M" control={<Radio disabled={persona !== '000000000000' ? true : false} color="primary" />} label="Masculino" />
                        <FormControlLabel value="F" control={<Radio disabled={persona !== '000000000000' ? true : false} color="primary" />} label="Femenino" />
                    </Field>
                    <Field
                        padding='15px'
                        disabled={id !== 1 ? false : true}
                        name="relacionConPersona" component={renderSelectField}
                        label="Rol" className={classes.textFieldsDatosPersonales}>
                        {
                            relaciones ? relaciones.map(item =>
                                <MenuItem key={item.codigoRelacion} value={item.descripcion}>
                                    {item.descripcion}
                                </MenuItem>) : null
                        }
                    </Field>
                    <div>
                        <Button className={classes.btnUpdate} variant="contained" color="primary"
                            type="submit" >
                            Actualizar
                    </Button>
                    </div>
                </form>
            </div>
        </Paper>

    )
}

DatosPersonales.propTypes = {
    handleDateChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    onBlurFecha: PropTypes.func.isRequired,
    onChangeMaterno: PropTypes.func.isRequired,
    persona: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
    relaciones: PropTypes.array,
    id: PropTypes.number

};

const DatosPersonalesForm = reduxForm({ form: 'DatosPersonales', destroyOnUnmount: false })(DatosPersonales);
export default withStyles(registroStyle)(setPropsAsInitial(DatosPersonalesForm));
