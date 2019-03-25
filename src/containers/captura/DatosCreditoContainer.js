import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getIntegrantes, getXmlInterfaces } from '../../redux/selectors/captura/xmlInterfaces';
import { getIformularios } from '../../redux/selectors/captura/iformularios';
import { getSolicitud, 
    getDescripcionCatalogos, 
    getCatalogoproductos, 
    getCatalogoFrecuencias, 
    getProductos } from '../../redux/selectors/captura/datosCaptura';
import { getCatalogosCaptura, getListaCatalogos } from '../../redux/selectors/captura/catalogos';
import DatosCreditoComponent from '../../components/captura/DatosCreditoComponent';
import { change } from 'redux-form';

/* const esRangoPlazos = (productos, codigoProducto) => {
    const productosFiltrado = productos.filter(prod => prod.producto === codigoProducto);
    return productosFiltrado.length === 1 && productos[0].plazoMin !== productos[0].plazoMax;
} */

class DatosCreditoContainer extends Component {

    state = {
        esRangoPlazo: true,
        catalogoPlazos: [],
        disabledFrecuencia: true,
        tasa: this.props.solicitud.tasa,
    }

    componentDidMount(){
        const { productos, solicitud } = this.props;
        const productosFiltrado = productos.filter(prod => prod.producto === solicitud.codigoProducto);
        const esRangoPlazo = productosFiltrado.length === 1 && productosFiltrado[0].plazoMin !== productosFiltrado[0].plazoMax;
        let plazoMin;
        let plazoMax;
        let montoMin;
        let montoMax;
        if (esRangoPlazo) {
            plazoMin = productosFiltrado[0].plazoMin;
            plazoMax = productosFiltrado[0].plazoMax;
            montoMin = productosFiltrado[0].montoMin;
            montoMax = productosFiltrado[0].montoMax;
        }
        const catalogoPlazos = productosFiltrado.map(prod => {return { codigo:prod.plazoMin, descripcion: prod.plazoMin}}); 
        this.setState( {
            esRangoPlazo: esRangoPlazo, 
            plazoMin: plazoMin,
            plazoMax: plazoMax,
            catalogoPlazos: catalogoPlazos,
            catalogoFrecuencias:this.props.catalogoFrecuencias,
            tasa: productosFiltrado.tasa,
            montoMin,
            montoMax,
        });
    }

    static propTypes = {
        pantalla: PropTypes.bool,
        catalogoRelaciones: PropTypes.array,
        catalogoEstados: PropTypes.array,
        catalogoPaises: PropTypes.array,
    }

    cleanFrecuencia = () => {
        this.props.change('DatosCredito', 'frecuenciaPago', '');
        this.cleanPlazo();
    }

    cleanPlazo = () => {
        this.props.change('DatosCredito', 'plazo', '');
        this.cleanTasa();
    }

    cleanTasa = () => {
        this.props.change('DatosCredito', 'tasa', '');
        this.cleanMonto();
    }

    cleanMonto = () => {
        this.props.change('DatosCredito', 'efectivoOtorgado', '');
    }
    
    handleSelectProducto = event => {
        const productos = this.props.productos.filter(prod => prod.producto === event.target.value);
        let disabledFrecuencia = true;
        const { catalogoFrecuencias } = this.props;
        let catalogoFrecuenciasAux = [];
        if ( productos ) {
            catalogoFrecuencias.length > 1 ?
                productos.forEach(
                    producto => {
                        if (!catalogoFrecuenciasAux.find(
                            item => item.codigo === producto.frecuencia 
                        ))
                        catalogoFrecuenciasAux.push(catalogoFrecuencias.find(
                            item => item.codigo === producto.frecuencia 
                        ));
                    }
                ) :
                catalogoFrecuenciasAux = catalogoFrecuencias;
            if (catalogoFrecuenciasAux.length > 1) {
                disabledFrecuencia = false;
                this.cleanFrecuencia();
                this.setState( {
                    disabledFrecuencia: disabledFrecuencia,
                    catalogoFrecuencias: catalogoFrecuenciasAux,
                    productos: productos,
                });
            } else {
                this.props.change('DatosCredito', 'frecuenciaPago', catalogoFrecuenciasAux[0].codigo);
                this.loadFrecuencia(catalogoFrecuenciasAux[0].codigo, productos);
            }
        } else {
            //mensaje de error
        }
    }

    loadFrecuencia = (value, productos) => {
        let catalogoPlazos = productos.map(prod => {return { codigo:prod.plazoMin, descripcion: prod.plazoMin}});
        let esRangoPlazo;
        let plazoMin;
        let plazoMax;
        if (productos.length === 1) {
            plazoMin = productos[0].plazoMin;
            plazoMax = productos[0].plazoMax;
            esRangoPlazo = (plazoMin !== plazoMax);
            if (!esRangoPlazo) {
                this.props.change('DatosCredito', 'plazo', productos[0].plazoMin); 
                this.loadPlazo(productos[0].plazoMin, productos);
            } else {
                this.cleanPlazo();
            }
        } else {
            this.cleanPlazo();
        }
        this.setState( {
            esRangoPlazo: esRangoPlazo, 
            plazoMin: plazoMin,
            plazoMax: plazoMax,
            catalogoPlazos: catalogoPlazos,
            productos: productos,
            montoMin: '',
            montoMax: '',
        });
    }

    loadPlazo = (value, productos) => {
        let tasa;
        let esRangoMonto;
        let montoMin;
        let montoMax;
        console.log(productos);
        if (productos.length === 1){
            tasa = productos[0].tasaMax;
            montoMin = productos[0].montoMin;
            montoMax = productos[0].montoMax;
            esRangoMonto = montoMin !== montoMax;
        } else {
            //Error
        }
        this.props.change('DatosCredito', 'tasa', tasa);
        esRangoMonto ? 
            this.cleanMonto() :
            this.props.change('DatosCredito', 'efectivoOtorgado', montoMin);
        this.setState( {
            tasa,
            esRangoMonto,
            montoMin: montoMin,
            montoMax: montoMax,
        });
    }

    handleSelectFrecuencia = event => {
        const productos = this.props.productos.filter(prod => prod.frecuencia === event.target.value);
        this.loadFrecuencia(event.target.value, productos);
    }

    handleSelectPlazo = event => {
        const productos = this.state.productos.filter(prod => prod.plazoMin === event.target.value);
        this.loadPlazo(event.target.value, productos);
    }

    handleOnBlurPlazo = event => {        
        const productos = this.state.productos.filter(prod => prod.plazoMin <= event.target.value && prod.plazoMax >= event.target.value );
        this.loadPlazo(event.target.value, productos);
    }
    
    render() {
        const { solicitud, 
            listaCatalogos, 
            catalogoOficinas, 
            integrantes, 
            catalogoProductos, 
            descripcionCatalogos, 
            iformularios, 
            xmlInterfaces } = this.props;
        const { catalogoPlazos, 
            disabledFrecuencia, 
            esRangoPlazo,
            plazoMin,
            plazoMax,
            esRangoMonto, 
            catalogoFrecuencias,
            montoMin, 
            montoMax, 
            tasa } = this.state;
        return (
            <DatosCreditoComponent 
                {...solicitud} 
                listaCatalogos={listaCatalogos}
                catalogoOficinas={catalogoOficinas} 
                descripcionCatalogos={descripcionCatalogos} 
                funcionarioPublico={integrantes && integrantes[0].persona.funcionarioPublico}
                parienteFuncionarioPublico={integrantes[0] && integrantes[0].persona.parienteFuncionarioPublico} 
                diaPago={xmlInterfaces.diaPago}
                oficinaDisposicion={xmlInterfaces.oficinaDisposicion}
                codigoDestinoCredito={xmlInterfaces.codigoDestinoCredito}
                handleSubmitDatosCredito={this.handleSubmitDatosCredito} 
                catalogoProductos={catalogoProductos}
                catalogoFrecuencias={catalogoFrecuencias}
                catalogoPlazos={catalogoPlazos}
                handleSelectProducto={this.handleSelectProducto}
                handleSelectPlazo={this.handleSelectPlazo}
                handleSelectFrecuencia={this.handleSelectFrecuencia}
                handleOnBlurPlazo={this.handleOnBlurPlazo}
                iformularios={iformularios}
                disabledFrecuencia={disabledFrecuencia}
                esRangoPlazo={esRangoPlazo}                
                plazoMin={plazoMin}
                plazoMax={plazoMax}
                esRangoMonto={esRangoMonto}
                montoMin={montoMin}
                montoMax={montoMax}
                tasa={tasa}
            />
        )
    }
}

const mapStateToProps = state => ({
    integrantes: getIntegrantes(state),
    iformularios: getIformularios(state),
    catalogosCaptura: getCatalogosCaptura(state),
    catalogoFrecuencias: getCatalogoFrecuencias(state),
    catalogoProductos: getCatalogoproductos(state),
    productos: getProductos(state),
    solicitud: getSolicitud(state),
    descripcionCatalogos: getDescripcionCatalogos(state),
    listaCatalogos:getListaCatalogos(state),
    xmlInterfaces:getXmlInterfaces(state),
});

export default connect(mapStateToProps, { change })(DatosCreditoContainer)