import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';  
import { Button, 
    Icon, 
    MenuItem, 
    FormControlLabel, 
    Radio, 
    Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Field } from 'redux-form';
import { STYLES } from '../../constants/styles';
import { NumberFormatCustom } from '../../utilities/format';
import { renderField, renderSelectField, renderRadioGroup } from './../../utilities/index';
import TablaBeneficiarios from './TablaBeneficiarios';
import DialogoBeneficiarios from './DialogoBeneficiarios';
import SnackbarNotificacion from '../../components/Generic/SnackbarNotificacion';
import { ERROR_PORCENTAJE_SUMA_ASEGURADA } from '../../constants/captura';

class FieldArraySeguros extends Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
        primaSegurosVida: PropTypes.array.isRequired,
        listaCatalogos: PropTypes.array.isRequired,
    }

    state = {
      open: false,
      clienteOtro: [],
      openSnackBar: false,
    }

    handleCloseSnack = () => {
        this.setState({ openSnackBar: false });
    }

    handleOpenSnack = () => {
        this.setState({ openSnackBar: true });
    }

    handleClickOpen = index => {
        this.setState({
            open: true,
            index,
        });
    };

    handleClose = () => {
        this.setState({ 
            open: false, 
        });
    };    

    handleClickDeleteBeneficiario = index => {
        this.props.fields.get(this.state.index).beneficiarios.splice(index,1);
    }

    handleChangeSelectCliente = index => event => {
        const { clienteOtro } = this.state;
        let copiaClienteOtro = clienteOtro.slice();
        copiaClienteOtro[index] = event.target.value === '00000000';
        this.setState({
            clienteOtro: copiaClienteOtro, 
        })        
    };

    handleChangeSelectSumaAsegurada = index => event => {
        const { primaSegurosVida, fields } = this.props;
        const primaSeguro = primaSegurosVida.find(primaSeguro => primaSeguro.sumaAsegurada === event.target.value);
        const primaSeguroNuevo = {
            codigoProductoSeguro: primaSeguro.codigoProductoSeguro,
            descripcionProductoSeguro:primaSeguro.descripcionProductoSeguro,
            codigoSeguro: primaSeguro.claveSeguroFindep,
            maxBeneficiarios: primaSeguro.maximoBeneficiarios,
            minBeneficiarios: primaSeguro.minimoBeneficiarios,
            proveedor: primaSeguro.proveedor,
            tipoSeguro: primaSeguro.tipoSeguro,
            sumaAsegurada: primaSeguro.sumaAsegurada,
            montoSeguro: primaSeguro.montoPagoAnual,
        };
        const seguroNuevo = {...fields.get(index), ...primaSeguroNuevo};
        fields.splice(index,1,seguroNuevo);
    };

    handleDelete = index => {
        const { fields } = this.props;
        fields.remove(index);

        const { clienteOtro } = this.state;
        let copiaClienteOtro = clienteOtro.slice();
        copiaClienteOtro.splice(index,1);        
        this.setState({
            clienteOtro: copiaClienteOtro, 
        });

    };

    handleClickAdd = fields => {
        const { primaSegurosVida } = this.props;
        const primaSeguro = primaSegurosVida[0];
        const seguroNuevo = {
            codigoProductoSeguro: primaSeguro.codigoProductoSeguro,
            descripcionProductoSeguro:primaSeguro.descripcionProductoSeguro,
            codigoSeguro: primaSeguro.claveSeguroFindep,
            maxBeneficiarios: primaSeguro.maximoBeneficiarios,
            minBeneficiarios: primaSeguro.minimoBeneficiarios,
            proveedor: primaSeguro.proveedor,
            tipoSeguro: primaSeguro.tipoSeguro,
            sumaAsegurada: primaSeguro.sumaAsegurada,
            montoSeguro: primaSeguro.montoPagoAnual,
            beneficiarios: []
        };
        fields.push(seguroNuevo);
    }

    handleClickAgregarBeneficiario = fieldsBeneficiario => {
        const valid = this.esPorcentajeValido(fieldsBeneficiario.pctSumaAsegurada,this.props.fields.get(this.state.index).beneficiarios, this.props.fields.get(this.state.index).maxBeneficiarios);
        if (valid) {
            this.props.fields.get(this.state.index).beneficiarios.push(fieldsBeneficiario);
            this.handleClose();
        } else {
            this.handleOpenSnack();
        }
    }

    esPorcentajeValido = (porcentajeSumaAsegurada, beneficiarios, maxBeneficiarios) => {
        let porcentajeAcumulado = 0;
        beneficiarios.forEach(beneficiario => porcentajeAcumulado += parseInt(beneficiario.pctSumaAsegurada));
        console.log(maxBeneficiarios);
        if (maxBeneficiarios === beneficiarios.length +1){
            return ((porcentajeAcumulado + parseInt(porcentajeSumaAsegurada)) === 100);
        }
        return ((porcentajeAcumulado + parseInt(porcentajeSumaAsegurada)) <= 100);
    }

    render() {
        const { classes, 
            listaClientes,
            listaCatalogos,
            primaSegurosVida,
            fields } = this.props;
        const { clienteOtro } = this.state;
        return (            
            <div className={classes.rootSeguro}>
                <AppBar position="static" color="default">
                    <Toolbar>
                    <Typography color="inherit" className={classes.grow}>
                        Seguro de vida
                    </Typography>
                    <Button aria-label="Agregar seguro" onClick={() => this.handleClickAdd(fields)} >
                        <Icon color="primary">add</Icon>
                    </Button>
                    </Toolbar>
                </AppBar>
                {fields.map((seguro, index) => ( 
                    <Paper className={index % 2 ? classes.segurovidanon : classes.segurovidapar}
                        key={index}>
                        <Typography color="inherit" className={classes.grow}>
                            Seguro de vida {index + 1}
                        </Typography>
                        <Field
                            name={`${seguro}.cliente`}
                            component={renderSelectField}
                            className={classes.formControlSeguros}
                            padding='18px'
                            onChange={(event) => this.handleChangeSelectCliente(index)(event)}
                            label="Nombre del asegurado" >
                            { 
                                listaClientes ? listaClientes.map(cliente => <MenuItem key={cliente.cliente} value={cliente.cliente}>{cliente.nombre}</MenuItem>): null
                            }
                            <MenuItem key="00000000" value="00000000">Otro</MenuItem>                        
                        </Field>
                        <Field
                            name={`${seguro}.descripcionProductoSeguro`}
                            type="text"
                            component={renderField}
                            label="Producto"
                            className={classes.textFieldSeguros}
                            disabled
                        />
                        <Field
                            name={`${seguro}.tipoSeguro`}
                            type="text"
                            component={renderField}
                            label="Tipo Seguro"
                            className={classes.textFieldSeguros}
                            disabled
                        />
                        {/* <Field
                            name={`${seguro}.sumaAsegurada`}
                            type="text"
                            component={renderField}
                            label="Suma Asegurada"
                            className={classes.textFieldSeguros}
                            InputProps={{
                                inputComponent: NumberFormatCustom,
                                readOnly: true,
                            }}
                            disabled
                        /> */}
                        <Field
                            name={`${seguro}.sumaAsegurada`}
                            component={renderSelectField}
                            className={classes.formControlSeguros}
                            padding='18px'
                            onChange={(event) => this.handleChangeSelectSumaAsegurada(index)(event)}
                            label="Suma Asegurada" >
                            { 
                                primaSegurosVida ? primaSegurosVida.map(primaSeguro => <MenuItem key={primaSeguro.sumaAsegurada} value={primaSeguro.sumaAsegurada} >{primaSeguro.sumaAsegurada}</MenuItem>): null
                            }
                        </Field>
                        <Field
                            name={`${seguro}.montoSeguro`}
                            type="text"
                            component={renderField}
                            label="Monto"
                            className={classes.textFieldSeguros}
                            InputProps={{
                                inputComponent: NumberFormatCustom,
                                readOnly: true,
                            }}
                            disabled
                        />
                        { clienteOtro[index] && 
                            <div>
                                <Field
                                    name={`${seguro}.nombreOtro`}
                                    type="text"
                                    component={renderField}
                                    label="Nombre"
                                    className={classes.textFieldSeguros}
                                />
                                <Field
                                    name={`${seguro}.segundoNombreOtro`}
                                    type="text"
                                    component={renderField}
                                    label="Segundo Nombre"
                                    className={classes.textFieldSeguros}
                                />
                                <Field
                                    name={`${seguro}.apellidoPaternoOtro`}
                                    type="text"
                                    component={renderField}
                                    label="Apellido Paterno"
                                    className={classes.textFieldSeguros}
                                />
                                <Field
                                    name={`${seguro}.apellidoMaternoOtro`}
                                    type="text"
                                    component={renderField}
                                    label="Apellido Materno"
                                    className={classes.textFieldSeguros}
                                />
                                <Field
                                    name={`${seguro}.fechaNacimientoOtro`}
                                    type="date"
                                    component={renderField}
                                    label="Fecha de Nacimiento"
                                    className={classes.textFieldSeguros}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <Field
                                    name={`${seguro}.estadoCivilOtro`}
                                    component={renderSelectField}
                                    label={"Estado Civil"}
                                    className={classes.formControlSeguros}
                                    padding='18px'
                                >
                                    {
                                        listaCatalogos ? listaCatalogos.filter(item => item.tipoCodigo === 'ECIV').map(item => <MenuItem key={item.codigo} value={item.codigo}>{item.descripcion}</MenuItem>) : null
                                    }
                                </Field>
                                <Field
                                    name={`${seguro}.sexoOtro`}
                                    component={renderRadioGroup}
                                    marginLeft='18px'
                                    label={'Genero'}
                                    className={classes.formControlCredito}
                                    row
                                >
                                    <FormControlLabel value="M" control={<Radio color="primary" />} label="Masculino" />
                                    <FormControlLabel value="F" control={<Radio color="primary" />} label="Femenino" />
                                </Field>
                            </div>  
                        }
                        <Button aria-label="Quitar seguro" onClick={() => this.handleDelete(index)}>
                            <Icon color="primary">delete</Icon>
                        </Button>
                        <TablaBeneficiarios
                            beneficiarios={fields.get(index).beneficiarios} 
                            handleClickOpen={() => this.handleClickOpen(index)}
                            handleClickDeleteBeneficiario={this.handleClickDeleteBeneficiario}
                            maxBeneficiarios={fields.get(index).maxBeneficiarios}
                            index={index} >
                        </TablaBeneficiarios>
                    </Paper>
                ))}
                <DialogoBeneficiarios 
                    open={this.state.open} 
                    onClose={this.handleClose} 
                    handleClickAgregarBeneficiario={this.handleClickAgregarBeneficiario}
                />
                <SnackbarNotificacion
                    {...ERROR_PORCENTAJE_SUMA_ASEGURADA}
                    opened={this.state.openSnackBar}
                    onClose={this.handleCloseSnack}>
                </SnackbarNotificacion>
            </div>
        )
    }
}

export default withStyles(STYLES)(FieldArraySeguros);