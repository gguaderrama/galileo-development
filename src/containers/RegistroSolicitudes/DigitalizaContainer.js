import React, { Component } from 'react';
import Digitalizacion from '../../components/RegistroSolicitudes/Digitalizacion'
import { getClientes } from './../../redux/selectors/RegistroSolicitudes/busquedaCliente';
import { connect } from 'react-redux';


class DigitalizaContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            openDigitaliza: false
        }
    }


    handleOpenDigitalizaComponent = () => {
        this.setState({ openDigitaliza: true })
    }

    handleCloseDigitalizaComponent = () => {
        this.setState({ openDigitaliza: false })
    }
    render() {
        const { clienteSeleccionado } = this.props.busquedaPersona;
        return (
            <div>
                <Digitalizacion
                    {...this.state}
                    handleOpenDigitalizaComponent={this.handleOpenDigitalizaComponent}
                    handleCloseDigitalizaComponent={this.handleCloseDigitalizaComponent}
                    integrantes={clienteSeleccionado} />

            </div>

        );
    }
}
const mapStateToProps = state => ({
    busquedaPersona: getClientes(state),

});

const mapDispatchToProps = ({

});

export default connect(mapStateToProps, mapDispatchToProps)(DigitalizaContainer);
