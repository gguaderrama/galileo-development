import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { formValueSelector } from 'redux-form';
import CircularProgress from '@material-ui/core/CircularProgress';
import TablaVisorExpedientes from '../../components/Generic/TablaVisorExpedientes';
import FormVisorExpedientes from '../../components/Generic/FormVisorExpedientes';
import { consultaImagenesVisor, obtenerRutaCoa } from '../../redux/actions/Generic/visorExpedientes';
import { getVisorExpedientes } from '../../redux/selectors/Generic/visorExpedientes';
import SnackbarNotificacion from '../../components/Generic/SnackbarNotificacion';
import { SIN_EXPEDIENTES } from '../../constants/captura';

class VisorExpedientesContainer extends Component {

    static propTypes = {
        expedientes: PropTypes.array,
        solicitud: PropTypes.string,
        empresa: PropTypes.string.isRequired,
        oficina: PropTypes.number.isRequired,
    }

    state = {
        openSnackBar: true,
    }

    handleCloseSnack = () => {
        this.setState({ openSnackBar: false });
    }

    componentDidMount = () => {
        const { solicitud, consultaImagenesVisor, obtenerRutaCoa } = this.props;
        if (solicitud) {
            const jsonSolicitud = {
                "oficina":0,
                "solicitud":solicitud,
                "contrato":null,
                "cliente":null,
            };
            consultaImagenesVisor(jsonSolicitud);
            obtenerRutaCoa();
        }
    };

    handleConsultar = () => {
        const { valuesFormVisorExpedientes, consultaImagenesVisor } = this.props;
        if (valuesFormVisorExpedientes.solicitud) {
            const jsonSolicitud = {
                "oficina":0,
                "solicitud":valuesFormVisorExpedientes.solicitud,
                "contrato":valuesFormVisorExpedientes.contrato,
                "cliente":valuesFormVisorExpedientes.cliente,
            };
            consultaImagenesVisor(jsonSolicitud);
        }
    }

    handleClickExpediente = nombreArchivo => {
        const { solicitud, empresa, oficina, visorExpedientes } = this.props;
        const rutaArchivo = `${visorExpedientes.rutaCoa}${empresa}/${oficina}/${solicitud}/${nombreArchivo}`;
        console.log(rutaArchivo);
        window.open(rutaArchivo, "", "width=800,height=600");

    };
    
    render() {
        const { 
            visorExpedientes,
            solicitud
             } = this.props;
        
        return (            
            <div>                    
            { visorExpedientes && visorExpedientes.expedientes ?
                <div>
                    <FormVisorExpedientes 
                        solicitud={solicitud}
                        handleConsultar={this.handleConsultar}
                        />
                    {visorExpedientes.expedientes && 
                        <div>
                            <TablaVisorExpedientes 
                                expedientes={visorExpedientes.expedientes} 
                                handleClickExpediente={this.handleClickExpediente}
                                />
                            { visorExpedientes.expedientes.length === 0 &&
                                <SnackbarNotificacion
                                    {...SIN_EXPEDIENTES}
                                    opened={this.state.openSnackBar}
                                    onClose={this.handleCloseSnack}>
                                </SnackbarNotificacion>
                            }
                        </div>
                    }
                </div> :
                <CircularProgress size={50} />
            }
            </div> 
            
        )
    }
}

const selector = formValueSelector('VisorExpedientes');

const mapStateToProps = state => {
    const valuesFormVisorExpedientes = selector(state, 
        'solicitud', 
        'contrato', 
        'cliente', 
    );
    return {
        valuesFormVisorExpedientes,
        visorExpedientes: getVisorExpedientes(state),
    }
};

export default connect(mapStateToProps, { consultaImagenesVisor, obtenerRutaCoa })(VisorExpedientesContainer);