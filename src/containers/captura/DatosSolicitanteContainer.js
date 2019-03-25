import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { List, ListItem, ListItemIcon } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import BusinessIcon from '@material-ui/icons/Business';
import PhoneIcon from '@material-ui/icons/Phone';
import HomeIcon from '@material-ui/icons/Home';
import DatosPersonalesComponent from '../../components/captura/DatosPersonalesComponent';
import DatosEmpleoComponent from '../../components/captura/DatosEmpleoComponent';
import DomiciliosContainer from './DomiciliosContainer';
import { STYLES } from '../../constants/styles';
import { withStyles } from '@material-ui/core/styles';
import { getIntegrantes, getCorreo } from '../../redux/selectors/captura/xmlInterfaces';
import { getIformularios } from '../../redux/selectors/captura/iformularios';
import {
    fetchCatalogoRelaciones,
    fetchCatalogoEstados,
    fetchCatalogoPaises,
    fetchCatalogoGiros,
    fetchPuestos,
} from '../../redux/actions/captura/catalogos';
import { getCatalogosCaptura, getPuestos } from '../../redux/selectors/captura/catalogos';
import { getSegmento } from '../../redux/selectors/captura/datosCaptura';
import TelefonosContainer from './TelefonosContainer';

class DatosSolicitanteContainer extends Component {
    static propTypes = {
        pantalla: PropTypes.bool,
        catalogoRelaciones: PropTypes.array,
        catalogoEstados: PropTypes.array,
        catalogoPaises: PropTypes.array,
        puestos: PropTypes.array,
    }
    state = {
        showComponent: 1,
    };

    renderSwitch(param, pantalla, persona, correo) {
        if (persona) {
            switch (param) {
                case 1:
                    if (pantalla) {
                        return <DatosPersonalesComponent 
                            pantalla={pantalla} 
                            correo={correo}
                            {...this.props.catalogosCaptura} 
                            {...persona} />
                    } if (!pantalla) {
                        return <DatosPersonalesComponent 
                            pantalla={pantalla} 
                            correo={correo}
                            {...this.props.catalogosCaptura}
                            {...persona} />
                    }
                    break;
                case 2:
                    return <DatosEmpleoComponent 
                        puestos={this.props.puestos}
                        {...this.props.catalogosCaptura}
                        {...persona} />
                case 3:
                    return <TelefonosContainer />
                case 4:
                    if (pantalla) {
                        return <DomiciliosContainer pantalla={pantalla} />
                    } if (!pantalla) {
                        return <DomiciliosContainer pantalla={pantalla} />
                    }
                    break;
                default:
                    return <DatosPersonalesComponent {...this.props.catalogosCaptura} />;
            }
        }

    }

    showComponent(param) {
        this.setState({
            showComponent: param,
        });
    }


    componentDidMount() {
        const { segmento, fetchCatalogoEstados, fetchCatalogoPaises, fetchCatalogoGiros, fetchPuestos } = this.props;
        fetchCatalogoEstados();
        fetchCatalogoPaises();
        const catalogoPuestos = {
            "status": "A",
            segmento,
        };
        fetchPuestos(catalogoPuestos);
        let catalogoGiro = {
            "status": "A",
            segmento
        };
        fetchCatalogoGiros(catalogoGiro);        
    }

    render() {
        const { classes, pantalla, integrantes, correo } = this.props;
        //const { clienteSeleccionado } = this.props.busquedaPersona;
        return (
            <div>
                <div style={{display: 'inline-block',
                        width: '65px',
                        verticalAlign: 'top'
                         }}>
                    <List>
                        <ListItem selected={this.state.showComponent === 1} button onClick={() => this.showComponent(1)}>
                            <ListItemIcon ><PersonIcon color="primary"></PersonIcon></ListItemIcon>
                        </ListItem>
                        <ListItem
                            className={!pantalla ?
                                classes.group :
                                classes.textFieldDisabled} button onClick={() => this.showComponent(2)}>
                            <ListItemIcon><BusinessIcon color="primary"></BusinessIcon></ListItemIcon>
                        </ListItem>
                        <ListItem
                            className={!pantalla ?
                                classes.group :
                                classes.textFieldDisabled} button onClick={() => this.showComponent(3)}>
                            <ListItemIcon ><PhoneIcon color="primary"></PhoneIcon></ListItemIcon>
                        </ListItem>
                        <ListItem selected={this.state.showComponent === 4} button onClick={() => this.showComponent(4)}>
                            <ListItemIcon ><HomeIcon color="primary"></HomeIcon></ListItemIcon>
                        </ListItem>
                    </List>
                </div>
                <div style={{display: 'inline-block',
                        width: '1100px',
                        }}>
                    {
                        this.renderSwitch(this.state.showComponent, pantalla, integrantes[0].persona, correo)
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    integrantes: getIntegrantes(state),
    iformularios: getIformularios(state),
    catalogosCaptura: getCatalogosCaptura(state),
    correo: getCorreo(state),
    segmento: getSegmento(state),
    puestos: getPuestos(state),
});

export default withStyles(STYLES)(connect(mapStateToProps, { fetchCatalogoRelaciones, fetchCatalogoEstados, fetchCatalogoPaises, fetchCatalogoGiros, fetchPuestos })(DatosSolicitanteContainer))
