import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import BeneficiariosForm from './FormBeneficiario';
import { addBeneficiario } from '../../redux/actions/captura/fetchSolicitud';
import { getCatalogosCaptura } from '../../redux/selectors/captura/catalogos';

class DialogoBeneficiarios extends Component {
    static propTypes = {
        onClose: PropTypes.func,
        handleClickAgregarBeneficiario: PropTypes.func.isRequired,
    }

    handleAddBeneficiario = () => {
        const { valuesBeneficiarioForm, handleClickAgregarBeneficiario} = this.props;
        handleClickAgregarBeneficiario(valuesBeneficiarioForm);        
    };

    handleClose = () => {
        this.props.onClose();
      };

    render() {
        const { onClose, beneficiarios, catalogosCaptura, apellidoPaterno,
            apellidoMaterno,
            codigoRelacion,
            pctSumaAsegurada,
            nombre, addBeneficiario, ...other } = this.props;
        return (
            <Dialog maxWidth="md" onClose={this.handleClose} {...other}>
                <DialogTitle>Beneficiarios</DialogTitle>
                <DialogContent>
                    <BeneficiariosForm {...catalogosCaptura} handleClose={this.handleClose} handleAddBeneficiario={this.handleAddBeneficiario}/>
                </DialogContent>
            </Dialog>
        )
    }
}

const selector = formValueSelector('Beneficiarios');

const mapStateToProps = state => {
    const valuesBeneficiarioForm = selector(state, 'apellidoPaterno',
            'apellidoMaterno',
            'codigoRelacion',
            'pctSumaAsegurada',
            'nombre')
    return {
        valuesBeneficiarioForm,
        catalogosCaptura: getCatalogosCaptura(state),
    }
};

export default connect(mapStateToProps, { addBeneficiario })(DialogoBeneficiarios);