import React, { Component } from 'react';
import TablaScore from './../../components/RegistroSolicitudes/TablaScore'
import { GENERIC_DIALOG_CONTENT, GENERIC_SNACK_CONTENT } from '../../constants/RegistroSolicitud/registroSolicitud';
import { validarPrescore, rechazarSolicitud } from './../../redux/actions/RegistroSolicitudes/registroSolicitud';
import { getClientes } from './../../redux/selectors/RegistroSolicitudes/busquedaCliente';
import { getCreditData } from './../../redux/selectors/RegistroSolicitudes/datosCredito';
import { connect } from 'react-redux';

class PreScoreContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            openSnackBar: false,
            openDialog: {},
            contenidoDialogo: GENERIC_DIALOG_CONTENT,
            buttonRegistro: false,
            snackbarNotificacion: GENERIC_SNACK_CONTENT,
            reintosPrescore: 0,
            registro: false
        }
    }

    componentDidMount() {
        this.props.disabledContinuar();
    }

    componentWillReceiveProps(nextProps) {
        //validacion de la respuesta de prescore
        if (nextProps.datosCredito.respuestaScore) {
            this.closeDialog();
            if (nextProps.datosCredito.respuestaScore !== this.props.datosCredito.respuestaScore && nextProps.datosCredito.respuestaScore.motivoResultadoPreaprobacion === 'APRUEBA') {
                console.log("aprobado.....")
                this.setState({
                    openSnackBar: true,
                    snackbarNotificacion: {
                        ...this.state.snackbarNotificacion,
                        verticalPosition: 'top',
                        horizontalPosition: 'right',
                        duration: 2000,
                        message: `Evaluación Correcta`,
                        type: 'success'
                    },
                    buttonRegistro: true
                })
            } else if (nextProps.datosCredito.respuestaScore !== this.props.datosCredito.respuestaScore && nextProps.datosCredito.respuestaScore.motivoResultadoPreaprobacion === 'RECHAZA') {
                console.log("solicitud rechazada")
                const { jsonPrescore } = this.props.datosCredito;
                this.openDialog({
                    ...this.state.contenidoDialogo,
                    iconColor: 'text',
                    content: 'PRESCORE',
                    subcontent: 'La solicitud ha sido Rechazada al evaluar el Prescore.',
                    bandera: false,
                    isLoadingDialog: false
                })
                this.props.rechazarSolicitud(JSON.stringify({ ...jsonPrescore, etapa: 'RECHAZO', etapaAnterior: 'REGISTRO', status: 'R', motivoStatus: 'RCPS' }), () => { })
                    .then(response => {
                        console.log("RECHAZO SOLICITUD RESPONSE", response)
                        return response;
                    });
            } else if (nextProps.datosCredito.respuestaScore !== this.props.datosCredito.respuestaScore && nextProps.datosCredito.respuestaScore === 'ERROR') {
                this.openDialog({
                    ...this.state.contenidoDialogo,
                    iconColor: 'text',
                    content: 'PRESCORE',
                    subcontent: nextProps.datosCredito.respuestaScore.motivoResultadoPreaprobacion,
                    bandera: false,
                    isLoadingDialog: false
                })
            }
            if (Object.keys(nextProps.datosCredito.respuestaScore).length < 1 && this.state.reintosPrescore < 1) {
                this.setState({ reintosPrescore: this.state.reintosPrescore + 1 })
                this.openDialog({
                    ...this.state.contenidoDialogo,
                    iconColor: 'text',
                    content: 'PRESCORE',
                    subcontent: 'Ocurrio un error validando el prescore, favor de contactar al área de operaciones',
                    bandera: false,
                    isLoadingDialog: false
                })

            }
        }
        if (nextProps.datosCredito.respuestaRegistro) {
            if (nextProps.datosCredito.respuestaRegistro.respuesta === 'V' && this.props.busquedaPersona.clienteSeleccionado.length > 0) {
                console.log("Solicitud Registrada")
                this.closeDialog();
                this.openDialog({
                    ...this.state.contenidoDialogo,
                    iconColor: 'text',
                    content: 'Registro Solicitud',
                    subcontent: 'Solicitud registrada correctamente',
                    bandera: false,
                    isLoadingDialog: false
                })
                this.setState({ registro: true })
            }
        }
    }

    handleClick = () => {
        const { jsonPrescore } = this.props.datosCredito;
        const request = JSON.stringify(jsonPrescore)
        console.log("jsonPrescore", request)
        console.log("reintosPrescore", this.state.reintosPrescore)
        this.openDialog({
            ...this.state.contenidoDialogo,
            title: 'Información',
            icon: 'info',
            iconColor: 'primary',
            content: 'Cargando...',
            subcontent: '',
            isLoadingDialog: true

        })
        if (this.state.reintosPrescore > 0) {

            const { clienteSeleccionado } = this.props.busquedaPersona;
            let cliente = this.props.fetchPersona(clienteSeleccionado[0].rfcCapturado);
            console.log("Reintento #", this.state.reintosPrescore)
            console.log("cliente", cliente.length > 0)
            if (cliente.length === 0) {
                console.log("no se regstro, segunda vez")
                this.props.validarPrescore(request, () => { });

            } else {
                console.log("se registro")
                this.openDialog({
                    ...this.state.contenidoDialogo,
                    iconColor: 'text',
                    content: 'PRESCORE',
                    subcontent: 'Ocurrio un error la persona que se intenta validar ya ha sido registrada, favor de contactar al área de operaciones',
                    bandera: false,
                    isLoadingDialog: false
                })

            }
        } else {
            console.log("primera vez")
            this.props.validarPrescore(request, () => { });
        }
    }

    handleOnClick = () => {
        const { jsonPrescore } = this.props.datosCredito;
        const requestJSON = JSON.stringify(jsonPrescore)
        this.openDialog({
            ...this.state.contenidoDialogo,
            title: 'Información',
            icon: 'info',
            iconColor: 'primary',
            content: 'Cargando...',
            subcontent: '',
            isLoadingDialog: true

        })
        this.props.registrarSolicitud(requestJSON);
    }

    openDialog = (mensaje) => {
        this.setState({ openDialog: mensaje })
    }

    handleCloseSnack = () => {
        this.setState({ openSnackBar: false })
    }

    closeDialog = () => {
        this.setState({ openDialog: { ...this.state.contenidoDialogo, opened: false } })
        if (this.state.registro) {
            this.props.cleanState()
        }
    }
    render() {
        const { clienteSeleccionado } = this.props.busquedaPersona;
        return (
            <div>
                <TablaScore
                    {...this.state}
                    {...this.props.datosCredito}
                    handleOnClick={this.handleOnClick}
                    handleCloseSnack={this.handleCloseSnack}
                    closeDialog={this.closeDialog}
                    integrantes={clienteSeleccionado}
                    handleClick={this.handleClick} />
            </div>

        );
    }
}
const mapStateToProps = state => ({
    busquedaPersona: getClientes(state),
    datosCredito: getCreditData(state),
});

const mapDispatchToProps = ({
    validarPrescore,
    rechazarSolicitud
});

export default connect(mapStateToProps, mapDispatchToProps)(PreScoreContainer);
