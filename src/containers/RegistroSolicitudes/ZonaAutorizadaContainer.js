import React, { Component } from 'react';
import ZonaAutorizada from './../../components/RegistroSolicitudes/ZonaAutorizada';
import { GENERIC_DIALOG_CONTENT, GENERIC_SNACK_CONTENT } from '../../constants/RegistroSolicitud/registroSolicitud';
import { actualizarAsentamientoParticular, actualizarAsentamientoEmpleo } from './../../redux/actions/RegistroSolicitudes/registroSolicitud';
import { consultaColonias, consultaColoniasEmpleo } from './../../redux/actions/RegistroSolicitudes/obtenerColonias';
import { getCreditData } from './../../redux/selectors/RegistroSolicitudes/datosCredito';
import { connect } from 'react-redux';

class ZonaAutorizadaContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openDialog: {},
            asentamientoParticular: {},
            asentamientoEmpleo: {},
            contenidoDialogo: GENERIC_DIALOG_CONTENT,
            openSnackBar: false,
            snackbarNotificacion: GENERIC_SNACK_CONTENT,
        }
    }

    componentWillUnmount() {
        this.props.saveDatos({ ...this.props })
    }

    onBlurAutorizadaDomicilio = (event) => {
        const cp = event.target.value;
        if (!isNaN(Number(cp)) && cp.length === 5) {
            const asentamiento = {
                "cp": cp,
                "zaDomicilio": "S",
                "sucursal": null
            }

            this.setState({ asentamientoParticular: { ...this.state.asentamientoParticular, cp: cp } })
            const asentamientoRequest = JSON.stringify(asentamiento)
            this.openDialog({
                ...this.state.contenidoDialogo,
                title: '',
                icon: 'info',
                iconColor: 'primary',
                content: 'Consultando zona autorizada ...',
                subcontent: '',
                isLoadingDialog: true
            })
            this.props.consultaColonias(asentamientoRequest, this.closeDialog).then(response => {
                console.log("WS asentamientos", response)
                if (response.payload.length === 0) {
                    this.setState({
                        openSnackBar: true,
                        snackbarNotificacion: {
                            ...this.state.snackbarNotificacion,
                            verticalPosition: 'top',
                            horizontalPosition: 'right',
                            duration: 2000,
                            icon: 'warning',
                            message: 'No se cuenta con colonias para la zona Autorizada de Domicilios',
                            type: 'warning'
                        }
                    })
                }
                return response;
            })
        }
    }

    onBlurAutorizadaEmpleo = (event) => {
        const cp = event.target.value;
        if (!isNaN(Number(cp)) && cp.length === 5) {
            const asentamiento = {
                "cp": cp,
                "zaEmpleo": "S",
                "sucursal": null
            }
            console.log("this.state.asentamientoEmpleo", this.state.asentamientoEmpleo)
            this.setState({ asentamientoEmpleo: { ...this.state.asentamientoEmpleo, cp: cp } })
            const asentamientoRequest = JSON.stringify(asentamiento)
            this.openDialog({
                ...this.state.contenidoDialogo,
                title: '',
                icon: 'info',
                iconColor: 'primary',
                content: 'Consultando zona autorizada ...',
                subcontent: '',
                isLoadingDialog: true
            })
            this.props.consultaColoniasEmpleo(asentamientoRequest, this.closeDialog).then(response => {
                console.log("WS asentamientos empleo", response)
                if (response.payload.length === 0) {
                    this.setState({
                        openSnackBar: true,
                        snackbarNotificacion: {
                            ...this.state.snackbarNotificacion,
                            verticalPosition: 'top',
                            horizontalPosition: 'right',
                            duration: 2000,
                            icon: 'warning',
                            message: 'No se cuenta con colonias para la zona Autorizada de Empleo',
                            type: 'warning'
                        }
                    })
                }
                return response;
            })
        }
    }

    closeDialog = () => {
        this.setState({ openDialog: { ...this.state.contenidoDialogo, opened: false } })
    }

    openDialog = (mensaje) => {
        this.setState({ openDialog: mensaje })
    }

    handleCloseSnack = () => {
        this.setState({ openSnackBar: false })
    }

    onBlurZona = (event) => {
        this.props.actualizarAsentamientoParticular(this.state.asentamientoParticular)
        this.props.actualizarAsentamientoEmpleo(this.state.asentamientoEmpleo)
    }

    asentamientoEmpleoChange = (event) => {
        this.setState({ asentamientoEmpleo: { ...this.state.asentamientoEmpleo, colonia: event.target.value } })
    }

    asentamientoDomiciliosChange = (event) => {
        this.setState({ asentamientoParticular: { ...this.state.asentamientoParticular, colonia: event.target.value } })
    }

    render() {
        return (
            <div>
                <ZonaAutorizada
                    muestraZona={this.props.muestraZona}
                    {...this.props.datosCredito}
                    {...this.state}
                    handleCloseSnack={this.handleCloseSnack}
                    asentamientoDomiciliosChange={this.asentamientoDomiciliosChange}
                    asentamientoEmpleoChange={this.asentamientoEmpleoChange}
                    onBlurZona={this.onBlurZona}
                    handleOnClose={this.closeDialog}
                    handleClose={this.closeDialog}
                    onBlurAutorizadaDomicilio={this.onBlurAutorizadaDomicilio}
                    onBlurAutorizadaEmpleo={this.onBlurAutorizadaEmpleo} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    datosCredito: getCreditData(state),
});

const mapDispatchToProps = ({
    consultaColonias,
    consultaColoniasEmpleo,
    actualizarAsentamientoParticular,
    actualizarAsentamientoEmpleo
});

export default connect(mapStateToProps, mapDispatchToProps)(ZonaAutorizadaContainer);
