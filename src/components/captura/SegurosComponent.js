import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Paper, FormControlLabel, Radio } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Field, reduxForm, FieldArray } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import { renderRadioGroup, renderCheckbox } from './../../utilities/index';
import SeguroComponent from './SeguroComponent';
import FieldArraySeguros from './FieldArraySeguros';
import { STYLES } from '../../constants/styles';
import { setPropsAsInitial } from './../../utilities/setPropsAsInitials';

const validate = values => {
    const errors = {}
    return errors;
}

class SegurosComponent extends Component {
    static propTypes = {
        seguros: PropTypes.array,
        addSeguro: PropTypes.func.isRequired,
        delSeguro: PropTypes.func.isRequired,
        listaClientes: PropTypes.array.isRequired,
        listaCatalogos: PropTypes.array.isRequired,
        primaSeguros: PropTypes.array.isRequired,
        relacionesBeneficiarios: PropTypes.array,
        iformularios: PropTypes.array.isRequired,
        incluyeSeguro: PropTypes.string.isRequired,
        handleObtenerRelaciones: PropTypes.func.isRequired,
        
    }

    state = {
        incluyeSeguro: this.props.incluyeSeguro,
        checkedDesempleo: !!this.props.seguroDesempleo,
        checkedGastosFunerarios: !!this.props.seguroGastosFunerarios,  
    };

    handleChange = values => {
        this.setState({
            incluyeSeguro: values[0],
        });
    };

    handleChangeCheck = tipoSeguro => (event, checked) => {
        const { primaSeguros, addSeguro, delSeguro } = this.props;
        const seguroDesempleo = primaSeguros.find(seguro => seguro.tipoSeguro === tipoSeguro);
        const seguroNuevo = {
            codigoProductoSeguro: seguroDesempleo.codigoProductoSeguro,
            codigoSeguro: seguroDesempleo.claveSeguroFindep,
            maxBeneficiarios: seguroDesempleo.maximoBeneficiarios,
            minBeneficiarios: seguroDesempleo.minimoBeneficiarios,
            proveedor: seguroDesempleo.proveedor,
            tipoSeguro: seguroDesempleo.tipoSeguro,
            sumaAsegurada: seguroDesempleo.sumaAsegurada,
            montoSeguro: seguroDesempleo.montoPagoAnual,
            beneficiarios: []
        };
        if (checked) {
            addSeguro(seguroNuevo);
        } else {
            delSeguro(seguroNuevo);            
        }
        tipoSeguro === 'INVALIDEZ' ? this.setState({ 
            'checkedDesempleo': checked, 
        }) : this.setState({ 
            'checkedGastosFunerarios': checked, 
        });
    };

    render() {
        const { listaClientes,
            listaCatalogos,
            relacionesBeneficiarios, 
            primaSeguros, 
            handleObtenerRelaciones, 
            seguroDesempleo,
            seguroGastosFunerarios,
            classes,
             } = this.props;
        const { incluyeSeguro, checkedDesempleo, checkedGastosFunerarios } = this.state;
        return (
            <div style={{padding: 10, width: '100%'}}>
                <Paper elevation={0}>
                    <form>
                        <Field 
                            name="incluyeSeguro" 
                            component={renderRadioGroup} 
                            label={'Incluye Seguro'}
                            onChange={this.handleChange}
                            marginLeft='18px'
                            row
                            >
                            <FormControlLabel value="S" control={<Radio color="primary" />} label="Si" />
                            <FormControlLabel value="N" control={<Radio color="primary" />} label="No" />
                        </Field>
                        {incluyeSeguro === "S" ?
                        <div className={classes.rootSeguro}>
                            <FieldArray name={'segurosVida'} 
                                component={FieldArraySeguros} 
                                relacionesBeneficiarios={relacionesBeneficiarios}
                                listaClientes={listaClientes}
                                listaCatalogos={listaCatalogos}
                                handleObtenerRelaciones={handleObtenerRelaciones}
                                primaSegurosVida={primaSeguros.filter(ps => ps.tipoSeguro === 'VIDA')}
                            />
                            <AppBar position="static" color="default">
                                <Toolbar>
                                    <Field 
                                        name="seguroDesempleo" 
                                        component={renderCheckbox} 
                                        label="Seguro Desempleo/Invalidez" 
                                        color="primary"
                                        onChange={(event, checked) => this.handleChangeCheck('INVALIDEZ')(event, checked)}
                                    />
                                </Toolbar>
                            </AppBar>
                            { checkedDesempleo && 
                                <Paper>
                                    <SeguroComponent listaClientes={listaClientes} {...seguroDesempleo} />
                                </Paper>
                            }
                            <AppBar position="static" color="default">
                                <Toolbar>
                                    <Field 
                                        name="seguroGastosFunerarios" 
                                        component={renderCheckbox} 
                                        label="Seguro Gastos Funerarios" 
                                        color="primary"
                                        onChange={(event, checked) => this.handleChangeCheck('FUNERARIOS')(event, checked)}
                                    />
                                </Toolbar>
                            </AppBar>
                            { checkedGastosFunerarios && 
                                <Paper>
                                    <SeguroComponent listaClientes={listaClientes} {...seguroGastosFunerarios} />
                                </Paper>
                            }
                        </div> : null
                        }
                    </form>
                </Paper>
            </div>
        )
    }
}

SegurosComponent = reduxForm({ 
    form: 'Seguros', 
    validate,
    destroyOnUnmount: false 
})(SegurosComponent);

export default withStyles(STYLES)(setPropsAsInitial(SegurosComponent));