import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { formValueSelector } from 'redux-form';
import TablaTelefonos from '../../components/captura/TablaTelefonos';
import FormTelefonos from '../../components/captura/FormTelefonos';
import { addTelefono, delTelefono, loadTelefono, guardaTelefono } from '../../redux/actions/captura/xmlInterfaces';
import { getListaCatalogos } from '../../redux/selectors/captura/catalogos';
import { getIformularios } from '../../redux/selectors/captura/iformularios';
import { getTelefonos } from '../../redux/selectors/captura/xmlInterfaces';

class TelefonosContainer extends Component {

    state = {
        selected: [],
    };

    static propTypes = {
        telefonos: PropTypes.array,
    }

    handleAddTelefono = () => {
        const telefono = {
            asociadoUltSolicitud: "S",
            bloqueado: "N",
            fechaUltimaModificacion: "",
            horaUltimaModificacion: "",
            origen: "POC",
            persona: "",
            status: "N",
            tipoTelefono: this.props.tipoTelefono, 
            telefono: this.props.telefono,
            tipoPlan: this.props.tipoPlan,
            claveProveedorServicios: this.props.claveProveedorServicios,
            usuarioAlta: "",
            usuarioUltimaModificacion: "",
        }
        this.props.addTelefono(telefono);
        this.props.loadTelefono({tipoTelefono:'',telefono:'',tipoPlan:'',claveProveedorServicios:''});
    };

    handleSaveTelefono = () => {
        const telefono = {
            tipoTelefono: this.props.tipoTelefono, 
            telefono: this.props.telefono,
            tipoPlan: this.props.tipoPlan,
            claveProveedorServicios: this.props.claveProveedorServicios,
        }
        const payload = {telefono, telefonoAnterior: this.state.telefonoAEditar}
        this.props.guardaTelefono(payload);
        this.setState({ edicion: false, telefonoAEditar: null });
    };

    handleClick = (event, telefono) => {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(telefono);
        let newSelected = [];
        
        if (selectedIndex === -1) {
          newSelected = newSelected.concat([], telefono);          
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
    };

    handleClickDelete = () => {
        this.props.delTelefono(this.state.selected);
        this.setState({ selected: [] });
    }

    handleClickEdit = telefonoSelected => {
        this.props.loadTelefono(telefonoSelected);
        this.setState({ selected: [], edicion: true, telefonoAEditar: telefonoSelected });
    }

    render() {
        const { listaCatalogos,
            telefonos } = this.props;
        const { selected, edicion } = this.state;
        return (
            <div>
                <FormTelefonos 
                    listaCatalogos={listaCatalogos} 
                    handleAddTelefono={this.handleAddTelefono} 
                    handleSaveTelefono={this.handleSaveTelefono}
                    edicion={edicion}></FormTelefonos>
                <TablaTelefonos 
                    telefonos={telefonos} 
                    handleClickDelete={this.handleClickDelete} 
                    handleClickEdit={this.handleClickEdit}
                    handleClick={this.handleClick}
                    selected={selected} ></TablaTelefonos>
            </div>
        )
    }
}

const selector = formValueSelector('Telefonos');

const mapStateToProps = state => {
    // or together as a group
    const listaCatalogos = getListaCatalogos(state);
    const { tipoTelefono, 
        telefono, 
        tipoPlan, 
        fechaVerificacionTelefono, 
        claveProveedorServicios } = selector(state, 
            'tipoTelefono', 
            'telefono', 
            'tipoPlan', 
            'fechaVerificacionTelefono', 
            'claveProveedorServicios');
    return {
      tipoTelefono, 
      telefono,
      tipoPlan,
      fechaVerificacionTelefono,
      listaCatalogos,
      claveProveedorServicios,
      iformularios: getIformularios(state),
      telefonos: getTelefonos(state),
    }
};

export default connect(mapStateToProps, { addTelefono, delTelefono, loadTelefono, guardaTelefono })(TelefonosContainer);