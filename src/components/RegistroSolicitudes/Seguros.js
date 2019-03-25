import React from 'react'
import PropTypes from 'prop-types'
import { FormControlLabel, Radio } from '@material-ui/core';
import { Button, Icon, Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { renderRadioGroup, renderField, renderCheckbox } from 'utilities/index';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { NumberFormatCustom } from 'utilities/format';
import { withStyles } from '@material-ui/core/styles';
import { registroStyle } from './styles/styles';
import { SegurosComponent, SeguroFunerario } from 'components/RegistroSolicitudes/SegurosComponent';

const Seguros = (props) => {
    const { incluyeSeguro, classes, addSeguro, deleteSeguro, seguroVida } = props;
    const { handleChangeGastosFunerarios, handleChangeDesempleo, handleChange } = props;
    const { checkedDesempleo, checkedGastosFunerarios, seguros } = props;
    return (
        <form>
            <div style={{ padding: '20px' }}>
                <Field
                    name="incluyeSeguros"
                    component={renderRadioGroup}
                    label={'Incluye Seguro'}
                    onChange={handleChange}
                    row>
                    <FormControlLabel value="S"
                        control={<Radio disabled={seguroVida.length === 0 && true}
                            color="primary"
                            checked={incluyeSeguro === 'S' && true} />} label="Si" />
                    <FormControlLabel value="N"
                        control={<Radio disabled={seguroVida.length === 0 && true}
                            color="primary"
                            checked={incluyeSeguro === 'N' && true} />} label="No" />
                </Field>
                {incluyeSeguro === "S" ?
                    <div style={{ padding: 10, width: '100%' }}>
                        <Paper elevation={0}>
                            <div style={{ width: '1280px' }} >
                                <FieldArray name={'segurosVida'}
                                    component={renderSeguros}
                                    addSeguro={addSeguro}
                                    deleteSeguro={deleteSeguro}
                                    classes={classes}
                                />
                                <AppBar style={{ marginTop: '20px' }} position="static" color="default">
                                    <Toolbar>
                                        <Field
                                            name="seguroDesempleo"
                                            component={renderCheckbox}
                                            label="Seguro Desempleo/Invalidez"
                                            color="primary"
                                            onChange={handleChangeDesempleo}
                                        />
                                    </Toolbar>
                                </AppBar>
                                {checkedDesempleo &&
                                    <SegurosComponent {...props} />
                                }
                                <AppBar style={{ marginTop: '20px' }} position="static" color="default">
                                    <Toolbar>
                                        <Field
                                            disabled={seguros < 1}
                                            name="seguroGastosFunerarios"
                                            component={renderCheckbox}
                                            label="Seguro Gastos Funerarios"
                                            color="primary"
                                            onChange={handleChangeGastosFunerarios}
                                        />
                                    </Toolbar>
                                </AppBar>
                                {checkedGastosFunerarios &&
                                    <SeguroFunerario  {...props} />
                                }
                            </div>
                        </Paper>
                    </div> : null
                }{
                    seguroVida.length < 1 &&
                    <Typography color="primary"> El producto seleccionado no cuenta con seguros</Typography>

                }

            </div>
        </form>
    )
};

const renderSeguros = (props) => {
    const { classes } = props;
    const { fields, addSeguro, deleteSeguro } = props;
    return (
        <div >
            <div  >
                <AppBar position="static" color="default">
                    <Toolbar>
                        <Typography color="inherit">
                            Seguro de vida
                    </Typography>
                        <Button aria-label="Agregar seguro" onClick={addSeguro(fields)} >
                            <Icon style={{ marginLeft: '1050px' }} color="primary">add</Icon>
                        </Button>
                    </Toolbar>
                </AppBar>
                {fields.map((seguro, index) => (
                    <Paper key={index} style={{ paddingTop: '10px' }} >
                        <Typography style={{ marginLeft: '28px' }} color="inherit">
                            Seguro de vida {index + 1}
                        </Typography>
                        <div >
                            <Field
                                name={`${seguro}.descripcionProductoSeguro`}
                                type="text"
                                component={renderField}
                                label="Producto"
                                className={classes.textFieldsSeguros}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <Field
                                name={`${seguro}.tipoSeguro`}
                                type="text"
                                component={renderField}
                                label="Tipo Seguro"
                                className={classes.textFieldsSeguros}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            {/* {fields.get(index).tipoSeguro === 'VIDA' ?
                        <Field
                            name={`${seguro}.sumaAsegurada`}
                            component={renderSelectField}
                            className={classes.formControl}
                            label="Suma Asegurada" >
                            <MenuItem value={'3000.0000'}>$3,000.00</MenuItem>
                            <MenuItem value={'10000.0000'}>$10,000.00</MenuItem>
                            <MenuItem value={'30000.0000'}>$30,000.00</MenuItem>
                            <MenuItem value={'50000.0000'}>$50,000.00</MenuItem>
                    </Field> :*/
                                <Field
                                    name={`${seguro}.sumaAsegurada`}
                                    type="text"
                                    component={renderField}
                                    label="Suma Asegurada"
                                    className={classes.textFieldsSeguros}
                                    InputProps={{
                                        inputComponent: NumberFormatCustom,
                                        readOnly: true,
                                    }}
                                />
                            }
                            <Field
                                name={`${seguro}.montoPagoAnual`}
                                type="text"
                                component={renderField}
                                label="Monto"
                                className={classes.textFieldsSeguros}
                                InputProps={{
                                    inputComponent: NumberFormatCustom,
                                    readOnly: true,
                                }}
                            />
                            <Button
                                className={classes.deleteSeguros}
                                onClick={deleteSeguro(fields, index)}>
                                <Icon color="primary">delete</Icon>
                            </Button>
                        </div>
                    </Paper>
                ))}
            </div>
        </div>
    );
}

Seguros.propTypes = {
    checkedDesempleo: PropTypes.bool,
    checkedGastosFunerarios: PropTypes.bool,
    handleChangeDesempleo: PropTypes.func.isRequired,
    handleChangeGastosFunerarios: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    addSeguro: PropTypes.func.isRequired,
    incluyeSeguro: PropTypes.string,
    classes: PropTypes.object
};

const SeguroForm = reduxForm({ form: 'Seguros', destroyOnUnmount: false })(Seguros);

export default withStyles(registroStyle)(SeguroForm);

