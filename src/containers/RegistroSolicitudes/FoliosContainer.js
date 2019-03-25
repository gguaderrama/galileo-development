import React, { Component } from 'react';
import DialogoFolios from 'components/RegistroSolicitudes/DialogoFolios';
import { GENERIC_DIALOG_CONTENT, GENERIC_SNACK_CONTENT } from 'constants/RegistroSolicitud/registroSolicitud';
import { foliosValidations } from 'components/RegistroSolicitudes/validations'
import { getCreditData } from 'redux/selectors/RegistroSolicitudes/datosCredito';
import { getClientes } from 'redux/selectors/RegistroSolicitudes/busquedaCliente';
import { getSessionRegistro } from 'redux/selectors/Session/session';
import { generaFolio, consultaCorresponsales, consultaTipoDisposicion } from 'redux/actions/RegistroSolicitudes/obtenerFormatos';
import { consultaContratoAnterior, consultaPoliticaRenovacionCliente } from 'redux/actions/RegistroSolicitudes/obtnerInformacionContrato';
import { autofill, reset } from 'redux-form';
import { connect } from 'react-redux';

class FoliosContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            formatoSeleccionado: null,
            openSnackBar: false,
            openDialog: {},
            snackbarNotificacion: GENERIC_SNACK_CONTENT,
            errorCodigo: false,
            errorVersion: false,
            required: true,
            contenidoDialogo: GENERIC_DIALOG_CONTENT
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.datosCredito.contratoAnt !== this.props.datosCredito.contratoAnt) {
            console.log("nextProps.datosCredito.contratoAnt", nextProps.datosCredito.contratoAnt)
            const { contratoAnterior } = nextProps.datosCredito.contratoAnt;
            if (contratoAnterior.consecutivo > 0) {
                this.props.setTipoCredito('R')
            } else {
                this.props.setTipoCredito('N')
            }
            this.closeDialog();
        }
        if (nextProps.datosCredito.esValido !== this.props.datosCredito.esValido) {
            if (Object.keys(nextProps.datosCredito.esValido).length > 0) {
                this.consultaVendores();
                this.consultaContratoAnterior();
            }
        }

    }

    componentDidUpdate(prevProps, prevState) {
        const { catalogoFormatoDrools } = this.props.datosCredito;
        if (prevState.formatoSeleccionado !== this.state.formatoSeleccionado) {
            let versiones = catalogoFormatoDrools.filter(formato => formato.codigoFormato === this.state.formatoSeleccionado)
            if (versiones.length === 1) {
                this.props.autofill('Folios', 'version', versiones[0].version);
            } else {
                this.props.autofill('Folios', 'version', '');
            }
        }
        if (prevProps.datosCredito.esValido !== this.props.datosCredito.esValido) {
            console.log("codigo formato despues de validar", this.props.datosCredito.esValido.codigoFormato)
            if (this.props.datosCredito.esValido.codigoFormato === 'FNOM') {
                console.log("consultando corresponsales")
                this.consultaCorresponsales();
            }
        }

        if (prevProps.datosCredito.corresponsales !== this.props.datosCredito.corresponsales) {
            const req = { tipoCodigo: "TPDISP" }
            const jsonRequest = JSON.stringify(req);
            this.props.consultaTipoDisposicion(jsonRequest, () => { }).then(response => {
                console.log("response tipoDisposicion", response)
                if (response.payload.length > 0) {
                    this.props.saveTipoDisposicion(response.payload)
                }
                return response;
            });
        }
    }

    handleSubmit = async (values) => {
        const { codigoFormato, version } = values;
        const { valoresSession, sessionParams } = this.props.sessionRegistro;
        let usuario = `000${sessionParams.gsCveUsuario}`;
        let respuestaValidacion = foliosValidations(values);
        if (respuestaValidacion.isValid) {
            let request = {
                "empresa": valoresSession.empresa,
                "oficina": valoresSession.oficina,
                "tipoFormato": "I",
                "usuarioAlta": usuario,
                "rangoFolios": 1,
                "codigoFormato": codigoFormato,
                "version": version
            }
            const jsonRequest = JSON.stringify(request);
            console.log("Json a enviar al método ---->(getFolioSolicitud)", jsonRequest);
            this.openDialog({
                ...this.state.contenidoDialogo,
                title: 'Información',
                icon: 'info',
                iconColor: 'primary',
                content: 'Cargando...',
                subcontent: '',
                isLoadingDialog: true

            })
            this.props.generaFolio(jsonRequest, () => { }).then(response => {
                console.log("Folios response", response.payload);
                return response;
            });
            this.handleCloseDialogFolios();
        } else if (respuestaValidacion.campo === 'SIN DATOS') {
            this.setState({ openSnackBar: true, snackbarNotificacion: respuestaValidacion.tipoMensaje, errorCodigo: true, errorVersion: true })
        } else if (respuestaValidacion.campo === 'SIN CODIGO') {
            this.setState({ openSnackBar: true, snackbarNotificacion: respuestaValidacion.tipoMensaje, errorCodigo: true })
        } else if (respuestaValidacion.campo === 'SIN VERSION') {
            this.setState({ openSnackBar: true, snackbarNotificacion: respuestaValidacion.tipoMensaje, errorVersion: true })

        }
    }

    consultaCorresponsales = () => {
        const { valoresSession } = this.props.sessionRegistro;
        const req = {
            "sucursal": valoresSession.oficina
        }
        const jsonRequest = JSON.stringify(req);
        this.props.consultaCorresponsales(jsonRequest, () => { }).then(response => {
            console.log("response corresponsales", response)
            if (response.payload.length > 0) {
                this.props.saveCorresponsales(response.payload)
            }
            return response;
        });
    }

    consultaContratoAnterior = () => {
        const { clienteSeleccionado } = this.props.busquedaPersona;
        if (clienteSeleccionado[0].persona) {
            console.log("Entra a consultar el contrato anterior de la persona", clienteSeleccionado.persona)
            let request = {
                "cliente": clienteSeleccionado[0].persona,
                "creditoGrupal": "N",
                "solicitud": this.props.solicitud,
                "origen": null
            }
            const jsonRequest = JSON.stringify(request);
            this.props.consultaContratoAnterior(jsonRequest, () => { }).then(response => {
                console.log("consultaContratoAnterior response", response);
                if (clienteSeleccionado[0].persona !== '000000000000') {
                    console.log("consultado politicas de renvación x cliente de : ", clienteSeleccionado[0].persona)
                    this.consultaPoliticaRenovacionCliente()
                }
                return response;
            });
        }
    }

    consultaPoliticaRenovacionCliente = () => {
        const { clienteSeleccionado } = this.props.busquedaPersona;
        let request = {
            "cliente": clienteSeleccionado[0].persona,
            "creditoGrupal": "N"
        }
        const jsonRequest = JSON.stringify(request);
        this.props.consultaPoliticaRenovacionCliente(jsonRequest, () => { }).then(response => {
            console.log("consultaPoliticaRenovacionCliente response", response);
            return response;
        });

    }

    openDialog = (mensaje) => {
        this.setState({ openDialog: mensaje })
    }
    handleCloseSnack = () => {
        this.setState({ openSnackBar: false, errorCodigo: false, errorVersion: false })
    }

    closeDialog = () => {
        this.setState({ openDialog: { ...this.state.contenidoDialogo, opened: false } })
    }

    consultaVendores = () => {
        this.props.consultaVendores();
    }

    handleCloseDialogFolios = () => {
        this.props.reset('Folios');
        this.props.closeFolios();
    }
    handleCleanDialogFolios = () => {
        this.props.reset('Folios');
        this.setState({ formatoSeleccionado: null });

    }

    selectVersion = event => {
        this.setState({ formatoSeleccionado: event.target.value })
    }

    render() {
        return (
            <div>
                <DialogoFolios
                    {...this.props.datosCredito}
                    {...this.state}
                    open={this.props.dialogoFolios}
                    handleClose={this.closeDialog}
                    formatosUnicos={this.props.formatosUnicos}
                    handleChangeFormato={this.selectVersion}
                    handleCleanDialogFolios={this.handleCleanDialogFolios}
                    handleSnackBarNotificacionClose={this.handleCloseSnack}
                    handleCloseDialogFolios={this.handleCloseDialogFolios}
                    onSubmit={this.handleSubmit} />
            </div>
        );
    }

}

const mapStateToProps = (state) => ({
    datosCredito: getCreditData(state),
    busquedaPersona: getClientes(state),
    sessionRegistro: getSessionRegistro(state)

});
const mapDispatchToProps = ({
    generaFolio,
    consultaContratoAnterior,
    consultaPoliticaRenovacionCliente,
    autofill,
    reset,
    consultaCorresponsales,
    consultaTipoDisposicion
})

export default connect(mapStateToProps, mapDispatchToProps)(FoliosContainer);