import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { formValueSelector } from 'redux-form';
import isEmpty from 'lodash.isempty';
import TablaReferencias from '../../components/captura/TablaReferenciasComponent';
import DialogoReferenciaComponent from '../../components/captura/DialogoReferenciaComponent';
import { getReferencias } from '../../redux/selectors/captura/xmlInterfaces';
import { addReferencia, updateReferencia, delReferencia } from '../../redux/actions/captura/xmlInterfaces';
import { getIformularios } from '../../redux/selectors/captura/iformularios';
import { validaForm } from '../../redux/actions/captura/validaForm';
import { validaRequeridos } from '../../utilities/validations';
import { getCatalogosCaptura } from '../../redux/selectors/captura/catalogos';
import { estableceReferenciasSeleccionadas } from '../../redux/actions/captura/referencias';

class ReferenciasContainer extends Component {
    static propTypes = {
        referencias: PropTypes.array,
    }

    state = {
        open: false,
        selected: [],
        edicion: false,
    };

    handleClickOpen = (selectedReferencia) => {
        let edicion = false;
        let referenciaConTelefono = null;
        if(selectedReferencia && selectedReferencia.telefonos){
            edicion = true;
            referenciaConTelefono = {...selectedReferencia, ...selectedReferencia.telefonos[0]}
            // selectedReferencia.telefonos.forEach(telefono => {
            //     if (telefono.tipoPlan === 'FIJO') selectedReferencia['telefonoParticular'] = telefono.telefono;
            //     if (telefono.tipoPlan === 'MOVIL') selectedReferencia['telefonoCelular'] = telefono.telefono;
            // });
        }
        this.setState({
            open: true,
            selected: [],
            selectedReferencia: referenciaConTelefono,
            referenciaAnterior: selectedReferencia,
            edicion
        });
    };

    handleClose = () => {
        this.setState({ open: false, selectedReferencia: null, edicion: false });
    };

    formToReferencia = valuesDatosReferencia => {
        const referencia = {
            nombre: valuesDatosReferencia.nombre,
            apellidoPaterno: valuesDatosReferencia.apellidoPaterno,
            apellidoMaterno: valuesDatosReferencia.apellidoMaterno,
            codigoRelacion: valuesDatosReferencia.codigoRelacion,
            usuarioUltimaModificacion: '000010460662',
            persona: '000770001699',
            domicilios: [],
            telefonos: [
                {
                    claveProveedorServicios: valuesDatosReferencia.claveProveedorServicios,
                    extension: valuesDatosReferencia.extension,
                    origen: 'POC2.0',
                    persona: '000770001699',
                    status: 'N',
                    telefono: valuesDatosReferencia.telefono,
                    tipoPlan: valuesDatosReferencia.tipoPlan,
                    tipoTelefono: 'REFE',
                    usuarioAlta: '000010460662',
                    usuarioUltimaModificacion: '000010460662',
                }
            ]
        };
        return referencia;
    }

    handleAddReferencia = () => {
        const { iformularios, valuesDatosReferencia, validaForm, addReferencia } = this.props;
        valuesDatosReferencia['tipoTelefono'] = 'REFE';
        const errorsReferencia = validaRequeridos(
            iformularios, 
            ['referenciaslist'], 
            valuesDatosReferencia,
            'Referencias',
            validaForm
            );
        if (isEmpty(errorsReferencia)) {
            const referencia = this.formToReferencia(valuesDatosReferencia);
            addReferencia(referencia);
            this.handleClose();
        }
    };

    handleSaveReferencia = () => {
        const { iformularios, valuesDatosReferencia, validaForm, updateReferencia } = this.props;
        const errorsReferencia = validaRequeridos(
            iformularios, 
            ['referenciaslist'], 
            valuesDatosReferencia,
            'Referencias',
            validaForm
            );
        if (isEmpty(errorsReferencia)) {
            const referencia = this.formToReferencia(valuesDatosReferencia);
            const payload = {referencia, referenciaAnterior: this.state.referenciaAnterior}
            updateReferencia(payload);
            this.handleClose();
            this.setState({ selectedReferencia: null, edicion: false });
        }
    };

    handleClick = (event, referencia) => {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(referencia);
        let newSelected = [];
    
        if (selectedIndex === -1) {
          newSelected = newSelected.concat(selected, referencia);
        } else if (selectedIndex === 0) {
          newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
          newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
          newSelected = newSelected.concat(
            selected.slice(0, selectedIndex),
            selected.slice(selectedIndex + 1),
          );
        }
    
        this.setState({ selected: newSelected });
        this.props.estableceReferenciasSeleccionadas(newSelected);
      };

    handleSelectAllClick = event => {
        if (event.target.checked) {
            this.setState(state => ({ selected: this.props.referencias.map(n => n) }));
            this.props.estableceReferenciasSeleccionadas(this.props.referencias.map(n => n));
            return;
        }
        this.setState({ selected: [] });
        this.props.estableceReferenciasSeleccionadas([]);
    };

    handleDeleteClick = () => {
        this.props.delReferencia(this.state.selected);
        this.setState({ selected: [] });
        this.props.estableceReferenciasSeleccionadas([]);
    };

    render() {
        const { referencias, catalogosCaptura } = this.props;
        return (
            <div>
                <TablaReferencias 
                    referencias={referencias} 
                    handleClickOpen={this.handleClickOpen} 
                    handleClick={this.handleClick}
                    selected={this.state.selected}
                    handleDeleteClick={this.handleDeleteClick}
                    handleSelectAllClick={this.handleSelectAllClick} ></TablaReferencias>
                <DialogoReferenciaComponent 
                    open={this.state.open} 
                    onClose={this.handleClose} 
                    referencia={this.state.selectedReferencia || null}
                    handleAddReferencia={this.handleAddReferencia}
                    handleSaveReferencia={this.handleSaveReferencia}
                    catalogoRelaciones={catalogosCaptura.catalogoRelaciones}
                    edicion={this.state.edicion}
                    listaCatalogos={catalogosCaptura.listaCatalogos} />
            </div>
        )
    }
}

const selector = formValueSelector('Referencias');

const mapStateToProps = state => {
    const valuesDatosReferencia = selector(state, 
        'tipoReferencia',
        'nombre',
        'apellidoPaterno',
        'apellidoMaterno',
        'telefono',
        'extension',
        'codigoRelacion',
        'tipoPlan',
        'claveProveedorServicios',
        );
    return {
        referencias: getReferencias(state),
        iformularios: getIformularios(state),
        valuesDatosReferencia,
        catalogosCaptura: getCatalogosCaptura(state),
    }
};

export default connect(mapStateToProps, { delReferencia, addReferencia, updateReferencia, validaForm, estableceReferenciasSeleccionadas })(ReferenciasContainer);