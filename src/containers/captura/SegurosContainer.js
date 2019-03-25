import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash.isempty';
import SegurosComponent from '../../components/captura/SegurosComponent';
import { getPrimaSeguros, 
     } from '../../redux/selectors/captura/datosCaptura';
import { getListaClientes, getSeguros, } from '../../redux/selectors/captura/xmlInterfaces';
import { getIformularios } from '../../redux/selectors/captura/iformularios';
import { getRelacionesBeneficiarios } from '../../redux/selectors/captura/catalogos';
import { fetchRelacionesBeneficiarios } from '../../redux/actions/captura/catalogos';
import { addSeguro, delSeguro } from '../../redux/actions/captura/xmlInterfaces';
import { getListaCatalogos } from '../../redux/selectors/captura/catalogos';

class SegurosContainer extends Component {

    handleObtenerRelaciones = () =>{
        this.props.fetchRelacionesBeneficiarios();
    };

    componentDidMount() {
        if (!this.props.relacionesBeneficiarios && this.props.seguros && this.props.seguros.find(seg => seg.tipoSeguro === 'VIDA') && this.props.seguros.find(seg => seg.tipoSeguro === 'VIDA').beneficiarios)
            this.handleObtenerRelaciones();
    }

    
    render() {
        const { listaClientes, 
            relacionesBeneficiarios, 
            primaSeguros, 
            seguros, 
            iformularios, 
            listaCatalogos,
            addSeguro,
            delSeguro } = this.props;
        return (
            <SegurosComponent
                listaClientes={listaClientes}
                listaCatalogos={listaCatalogos}
                primaSeguros={primaSeguros}
                relacionesBeneficiarios={relacionesBeneficiarios}
                iformularios={iformularios} 
                segurosVida={seguros && seguros.filter(seguro => seguro.tipoSeguro === 'VIDA')} 
                seguroDesempleo= {seguros && seguros.find(seguro => seguro.tipoSeguro === 'INVALIDEZ')} 
                seguroGastosFunerarios= {seguros && seguros.find(seguro => seguro.tipoSeguro === 'FUNERARIOS')} 
                incluyeSeguro={isEmpty(seguros) ? "N" : "S"} 
                addSeguro={addSeguro}
                delSeguro={delSeguro}
                handleObtenerRelaciones={this.handleObtenerRelaciones}/>
        )
    }
}

const mapStateToProps = state => {
    return ({
        iformularios: getIformularios(state),
        primaSeguros: getPrimaSeguros(state),
        seguros: getSeguros(state),
        listaClientes: getListaClientes(state),
        relacionesBeneficiarios: getRelacionesBeneficiarios(state),
        listaCatalogos: getListaCatalogos(state),
    })
};
  
export default connect(mapStateToProps, { fetchRelacionesBeneficiarios, addSeguro, delSeguro })(SegurosContainer);