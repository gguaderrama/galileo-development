import React, { Component } from 'react';
import BusquedaCliente from 'components/RegistroSolicitudes/BusquedaCliente';
import ResultadoBusqueda from 'components/RegistroSolicitudes/ResultadoBusqueda';
import { validatios } from 'components/RegistroSolicitudes/validations'
import { getClientes } from 'redux/selectors/RegistroSolicitudes/busquedaCliente';
import { getSessionRegistro } from 'redux/selectors/Session/session';
import { consultarPersonas, setClienteSelected, setClientes } from 'redux/actions/RegistroSolicitudes/obtenerPersonas';
import { updateCliente } from 'redux/actions/RegistroSolicitudes/modificarDatosIntegrantes';
import { setActiveStep, setStepDisabled, setStepVisible } from 'redux/actions/RegistroSolicitudes/controlNavegacion';
import { GENERIC_DIALOG_CONTENT, DATOS_CREDITO_STEP_STATE, INTEGRANTES_STEP_STATE } from 'constants/RegistroSolicitud/registroSolicitud';
import moment from 'moment';
import { connect } from 'react-redux';
import { change } from 'redux-form';

class BusquedaClienteContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            clienteSelected: [],
            openSnackBar: false,
            openDialog: {},
            snackbarNotificacion: {},
            errorNombre: false,
            errorPaterno: false,
            errorRFC: false,
            required: true,
            selectedDate: null,
            clientes: [],
            contenidoDialogo: GENERIC_DIALOG_CONTENT
        }
    }

    handleSubmit = values => {
        let fecha = null;
        const { selectedDate } = this.state;
        const { valoresSession } = this.props.sessionRegistro;
        let obj = validatios(values)
        if (selectedDate) {
            fecha = this.props.change('BusquedaCliente', 'fechaNacimiento', moment(selectedDate).format('DD/MM/YYYY')).payload;
        }
        if (obj.isValid) {
            let request = {
                nombre: values.nombre,
                apellidoPaterno: values.apellidoPaterno,
                apellidoMaterno: values.apellidoMaterno ? values.apellidoMaterno : null,
                rfcCapturado: values.rfcCapturado ? values.rfcCapturado : null,
                fechaNacimiento: selectedDate ? fecha : null,
                oficina: valoresSession.oficina
            }
            let personaBusqueda = JSON.stringify(request);
            console.log("request consultaPersona", personaBusqueda)
            this.openDialog({
                ...this.state.contenidoDialogo,
                title: '',
                content: 'Buscando Persona ...',
                subcontent: '',
                opened: true,
                isLoadingDialog: true
            });
            this.props.consultarPersonas(personaBusqueda, this.closeDialog, this.openDialog).then(r => {
                this.setState({ clienteSelected: request })
                if (r.payload.length === 0) {
                    this.openDialog({

                        ...this.state.contenidoDialogo,
                        content: 'No se encontró información referente al cliente.',
                        subcontent: '¿Deseas continuar con el proceso?',
                        flag: true,
                        opened: true,
                        isLoadingDialog: false

                    });
                } else if (r.payload.length > 0) {
                    this.props.setClientes(r.payload)
                }
                return r;
            });
        } else if (!obj.isValid) {
            if (obj.campo === "SIN DATOS") {
                this.setState({ openSnackBar: true, snackbarNotificacion: obj.tipoMensaje, errorPaterno: true, errorNombre: true, errorRFC: true })
            } if (obj.campo === "SIN NOMBRE") {
                this.setState({ openSnackBar: true, snackbarNotificacion: obj.tipoMensaje, errorNombre: true })
            } if (obj.campo === "SIN PATERNO") {
                this.setState({ openSnackBar: true, snackbarNotificacion: obj.tipoMensaje, errorPaterno: true })
            }
        }
    }

    openDialog = (mensaje) => {
        this.setState({ openDialog: mensaje })
    }
    closeDialog = () => {
        this.setState({ openDialog: { ...this.state.contenidoDialogo, opened: false } })
    }

    handleReset = () => {
        this.props.cleanState();
        this.setState({ selectedDate: null })
    }

    handleCloseSnack = () => {
        this.setState({ openSnackBar: false, errorPaterno: false, errorNombre: false, errorRFC: false })
    }

    handleSelectedPersonChange = cliente => {
        const { setClienteSelected, setStepDisabled, setStepVisible, setActiveStep } = this.props;
        setStepDisabled(DATOS_CREDITO_STEP_STATE);
        setStepVisible(DATOS_CREDITO_STEP_STATE);
        setStepDisabled(INTEGRANTES_STEP_STATE);
        setStepVisible(INTEGRANTES_STEP_STATE);
        setClienteSelected(cliente);
        setActiveStep(1);
    }

    handleOnClose = () => {
        const { clienteSelected } = this.state;
        const { setClienteSelected, setStepDisabled, setStepVisible, setActiveStep } = this.props;
        setClienteSelected(clienteSelected)
        setStepDisabled(INTEGRANTES_STEP_STATE);
        setStepVisible(INTEGRANTES_STEP_STATE);
        setStepDisabled(DATOS_CREDITO_STEP_STATE);
        setStepVisible(DATOS_CREDITO_STEP_STATE);
        setActiveStep(1);
        this.closeDialog();

    }

    handleDateChange = date => {
        this.setState({ selectedDate: date });
    };

    render() {
        const { clientes } = this.props.busquedaPersona;
        return (
            <div>
                <BusquedaCliente
                    {...this.props.busquedaPersona}
                    {...this.state}
                    handleValidate={this.handleValidate}
                    handleDateChange={this.handleDateChange}
                    onSubmit={this.handleSubmit}
                    handleOnClick={this.handleReset}
                    handleCloseSnack={this.handleCloseSnack}
                    handleClose={this.closeDialog}
                    handleOnClose={this.handleOnClose}

                />
                <div>
                    <ResultadoBusqueda
                        {...this.props}
                        clientes={clientes}
                        handleSelectedPersonChange={this.handleSelectedPersonChange} />
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    busquedaPersona: getClientes(state),
    sessionRegistro: getSessionRegistro(state)
});
const mapDispatchToProps = ({
    consultarPersonas,
    setClientes,
    setStepDisabled,
    setClienteSelected,
    setActiveStep,
    setStepVisible,
    change,
    updateCliente
})

export default connect(mapStateToProps, mapDispatchToProps)(BusquedaClienteContainer);