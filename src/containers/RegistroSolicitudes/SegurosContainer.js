import React, { Component } from 'react';
import Seguros from 'components/RegistroSolicitudes/Seguros';
import DialogNotificationModal from 'App/_commons/components/DialogNotificationModal';
import { getCreditData } from 'redux/selectors/RegistroSolicitudes/datosCredito';
import { getSessionRegistro } from 'redux/selectors/Session/session';
import { consultaPrimaSeguros, calculaMontoPago, obtenerTipoAnalisis, calculaMontoPagoSinSeguro } from 'redux/actions/RegistroSolicitudes/obtenerSeguros';
import { GENERIC_DIALOG_CONTENT } from 'constants/RegistroSolicitud/registroSolicitud';
import { setDatosCredito } from 'redux/actions/RegistroSolicitudes/modificarDatosIntegrantes'
import { autofill, reset } from 'redux-form';
import { connect } from 'react-redux';

class SegurosContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            incluyeSeguro: '',
            checkedDesempleo: null,
            checkedGastosFunerarios: null,
            seguroVida: [],
            seguroGastosFunerarios: [],
            seguroDesempleo: [],
            seguros: 0,
            montoTotalSeguros: '',
            montoTotalCredito: '',
            openDialog: {},
            contenidoDialogo: GENERIC_DIALOG_CONTENT
        }
    }

    componentWillUnmount() {
        this.props.saveDatos({ ...this.state, ...this.props })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.datosCredito.tipoAnalisis) {
            if (nextProps.datosCredito.tipoAnalisis.clave === 'ERROR') {
                this.openDialog({
                    ...this.state.contenidoDialogo,
                    iconColor: 'text',
                    content: 'Tipo Análisis',
                    subcontent: 'No se pudo obtener el tipo analisis de la solicitud',
                    flag: false,
                })
            } else {
                this.closeDialog();
            }
        }
        // this.setState({ ...this.props })
        if (nextProps.datosCredito.seguros) {
            if (nextProps.datosCredito.seguros.length < 1 && !nextProps.datosCredito.objMontoPagoSinSeguro && this.state.categoriaSeleccionada === 'NOMN') {
                console.log("this.props.datosCredito.datosSolicitud", this.props.datosCredito.datosSolicitud)
                if (Object.keys(this.props.datosCredito.datosSolicitud).length > 0) {
                    this.calculaMontoPagoSinSeguro();
                }
            }
        }
        if (nextProps.datosCredito.objMontoPagoSinSeguro !== this.props.datosCredito.objMontoPagoSinSeguro) {
            if (nextProps.datosCredito.objMontoPagoSinSeguro.clave === 'ERROR') {
                this.openDialog({
                    ...this.state.contenidoDialogo,
                    iconColor: 'text',
                    content: 'Tipo Análisis',
                    subcontent: 'No se pudo calcular el monto Pago para la solicitud',
                    flag: false,
                })
                this.props.disabledContinuar();
            }
        }
    }


    componentDidUpdate(prevProps, prevState) {
        const { seguros, seguroVida, seguroDesempleo, seguroGastosFunerarios, checkedGastosFunerarios, checkedDesempleo } = this.state;
        const { valoresSession } = this.props.sessionRegistro;
        const { datosSolicitud } = this.props.datosCredito;
        if (prevProps.datosCredito.datosSolicitud !== datosSolicitud) {
            if (!this.props.datosCredito.seguros && Object.keys(datosSolicitud).length > 0) {
                const request = {
                    "empresa": valoresSession.empresa,
                    "segmento": datosSolicitud.segmento,
                    "tipoProducto": datosSolicitud.tipoProducto,
                    "codigoProducto": datosSolicitud.codigoProducto,
                    "categoria": datosSolicitud.categoria,
                    "frecuencia": datosSolicitud.frecuencia,
                    "plazo": datosSolicitud.plazo,
                    "oficina": valoresSession.oficina

                }
                const segurosRequest = JSON.stringify(request);
                console.log("Request consultaSeguros", JSON.stringify(segurosRequest));
                this.openDialog({
                    ...this.state.contenidoDialogo,
                    isLoadingDialog: true

                })
                this.props.consultaPrimaSeguros(segurosRequest, () => { }).then(response => {
                    console.log("WS seguros", response)
                })
            }
        }
        if (prevProps.datosCredito.seguros !== this.props.datosCredito.seguros) {
            if (this.props.datosCredito.seguros) {
                if (this.props.datosCredito.seguros.length > 0) {
                    this.closeDialog();
                    this.validateProductos();
                }
            }
        }
        //calcula el montoTotal del crédito con seguros
        if (prevProps.datosCredito.tipoAnalisis !== this.props.datosCredito.tipoAnalisis && this.state.incluyeSeguro === 'S') {
            console.log("this.props.datosCredito.tipoAnalisis.resultadoAnalisis.codigo", this.props.datosCredito.tipoAnalisis.resultadoAnalisis.codigo)
            if (this.props.datosCredito.tipoAnalisis.resultadoAnalisis.codigo !== '-1') {
                let tipoAnalisis = this.props.datosCredito.tipoAnalisis;
                let aux = 0;
                if (seguros > aux) {
                    tipoAnalisis.montoSolicitado = parseInt(tipoAnalisis.montoSolicitado, 10) + (parseInt(seguroVida.montoPagoAnual, 10) * seguros)
                    aux = seguros;
                    if (checkedDesempleo && checkedGastosFunerarios) {
                        tipoAnalisis.montoSolicitado = parseInt(tipoAnalisis.montoSolicitado, 10) + parseInt(seguroDesempleo.montoPagoAnual, 10) + parseInt(seguroGastosFunerarios.montoPagoAnual, 10)
                        aux = seguros;
                    } else if (checkedDesempleo && !checkedGastosFunerarios) {
                        tipoAnalisis.montoSolicitado = parseInt(tipoAnalisis.montoSolicitado, 10) + parseInt(seguroDesempleo.montoPagoAnual, 10)
                        aux = seguros;
                    } else if (!checkedDesempleo && checkedGastosFunerarios) {
                        tipoAnalisis.montoSolicitado = parseInt(tipoAnalisis.montoSolicitado, 10) + parseInt(seguroGastosFunerarios.montoPagoAnual, 10)
                        aux = seguros;
                    }
                }

                this.props.setDatosCredito({
                    ...datosSolicitud,
                    montoPago: this.props.datosCredito.objMontoPago.montoPago,
                    montoSeguro: this.state.montoTotalSeguros,
                    montoOtorgado: tipoAnalisis.montoSolicitado,
                    tipoDisposicion: !datosSolicitud.tipoDisposicion && this.props.datosCredito.objMontoPagoSinSeguro.tipoDisposicion,
                    seguroVida: seguros >= 1 ? seguroVida : null,
                    seguroDesempleo: checkedDesempleo && seguroDesempleo,
                    seguroGastosFunerarios: checkedGastosFunerarios && seguroGastosFunerarios
                })
            }
            // calcula el montoTotal del crédito sin seguros
        } if (prevProps.datosCredito.tipoAnalisis !== this.props.datosCredito.tipoAnalisis && this.state.incluyeSeguro === 'N') {
            console.log("this.props.datosCredito.tipoAnalisis.resultadoAnalisis.codigo", this.props.datosCredito.tipoAnalisis.resultadoAnalisis.codigo)
            if (this.props.datosCredito.tipoAnalisis.resultadoAnalisis.codigo !== '-1') {
                this.props.setDatosCredito({
                    ...datosSolicitud,
                    montoOtorgado: this.props.datosCredito.objMontoPagoSinSeguro.efectivoSolicitado,
                    montoPago: this.props.datosCredito.objMontoPagoSinSeguro.montoPago,
                    tipoDisposicion: !datosSolicitud.tipoDisposicion && this.props.datosCredito.objMontoPagoSinSeguro.tipoDisposicion
                })
            }
        }
    }

    openDialog = (mensaje) => {
        this.setState({ openDialog: mensaje })
    }

    closeDialog = () => {
        this.setState({ openDialog: { ...this.state.contenidoDialogo, opened: false } })
    }


    handleChangeGastosFunerarios = (event, checked) => {
        const { seguros, checkedDesempleo } = this.state;
        const { handleCloseNotification } = this.props;
        if (checked) {
            this.setState({ checkedGastosFunerarios: true });
            this.validateSeguros(seguros, handleCloseNotification, true, checkedDesempleo);
        } else {
            this.setState({ checkedGastosFunerarios: false });
            this.validateSeguros(seguros, handleCloseNotification, false, checkedDesempleo);
        }
    };

    handleChangeDesempleo = (event, checked) => {
        const { seguros, checkedGastosFunerarios } = this.state;
        const { handleCloseNotification } = this.props;
        if (checked) {
            this.setState({ checkedDesempleo: true });
            this.validateSeguros(seguros, handleCloseNotification, checkedGastosFunerarios, true);
        } else {
            this.setState({ checkedDesempleo: false });
            this.validateSeguros(seguros, handleCloseNotification, checkedGastosFunerarios, false);
        }

    };

    addSeguro = fields => () => {
        const { seguroVida, seguros } = this.state;
        const { handleCloseNotification } = this.props;
        if (seguros < 1) {
            fields.push(seguroVida);
            let count = seguros + 1;
            this.setState({ seguros: seguros + 1 })
            this.validateSeguros(count, handleCloseNotification);
        } else {
            console.log("Solo se permite un seguro")
        }

    }

    deleteSeguro = (fields, index) => () => {
        const { seguros } = this.state;
        fields.remove(index);
        this.setState({ seguros: seguros - 1 })
        this.calculaMontoPagoSinSeguro();
    }

    handleChange = (values) => {
        this.setState({ incluyeSeguro: values[0] });
        if (values[0] === 'N') {
            this.calculaMontoPagoSinSeguro();
            this.props.reset('Seguros');
            this.setState({ seguros: 0 });
        }
    };

    calculaMontoPagoSinSeguro = () => {
        const { valoresSession } = this.props.sessionRegistro;
        const { datosSolicitud, contratoAnt, productosWS } = this.props.datosCredito;
        console.log("contratoAnt", contratoAnt)
        const persona = {
            "idRelacionPersonaVive": "0",
            "nivelCliente": productosWS[0].nivelCliente,
            "grupoRenovacion": productosWS[0].grupoRenovacion
        }
        let calculaMontoReq = {
            "solicitud": datosSolicitud.solicitud,
            "oficina": { "oficina": valoresSession.oficina, "iva": valoresSession.ivaSucursal, "esFrontera": valoresSession.frontera },
            "segmento": datosSolicitud.segmento,
            "categoria": datosSolicitud.categoria,
            "codigoProducto": datosSolicitud.codigoProducto,
            "tipoProducto": datosSolicitud.tipoProducto,
            "frecuenciaPago": datosSolicitud.frecuencia,
            "montoSolicitado": parseInt(datosSolicitud.montoSolicitado, 10),
            "efectivoSolicitado": parseInt(datosSolicitud.montoSolicitado, 10),
            "efectivoOtorgado": parseInt(datosSolicitud.montoSolicitado, 10),
            "montoOtorgado": parseInt(datosSolicitud.montoSolicitado, 10),
            "comisionApertura": 0,
            "ivaComisionApertura": 0,
            "plazo": datosSolicitud.plazo,
            "tasa": datosSolicitud.tasa,
            "tipoCredito": this.props.tipoCredito,
            "integrantes": [{ "persona": { ...persona }, "montoSeguro": 0 }],
            "nivelClienteAnalisis": productosWS[0].nivelCliente,
            "grupoRenovacionAnalisis": productosWS[0].grupoRenovacion,
            "claveCorresponsal": datosSolicitud.corresponsal
        }
        const request = JSON.stringify(calculaMontoReq)
        this.openDialog({
            ...this.state.contenidoDialogo,
            isLoadingDialog: true
        })
        this.props.calculaMontoPagoSinSeguro(request, () => { }).then(response => {
            console.log("respuesta del servicio (calculaMontoPagoSinSeguro)", response)
            this.obtenenTipoAnalisis(response.payload);
            return response;
        });

    }


    validateSeguros = (count, checkedGastosFunerarios, checkedDesempleo) => {
        const { valoresSession } = this.props.sessionRegistro;
        const { datosSolicitud, productosWS } = this.props.datosCredito;
        const { seguroVida, seguroDesempleo, seguroGastosFunerarios, montoPago } = this.state;
        let montoTotalSeguros = 0;
        if (count > 0 && !montoPago) {
            montoTotalSeguros = seguroVida.montoPagoAnual * count;
        } else if (count > 0 && (montoPago > 0 && (checkedDesempleo && !checkedGastosFunerarios))) {
            montoTotalSeguros = 0;
            montoTotalSeguros = parseInt(seguroVida.montoPagoAnual * count, 10) + parseInt(seguroDesempleo.montoPagoAnual, 10);
        } else if (count > 0 && (montoPago > 0 && (checkedGastosFunerarios && !checkedDesempleo))) {
            montoTotalSeguros = 0;
            montoTotalSeguros = parseInt(seguroVida.montoPagoAnual * count, 10) + parseInt(seguroGastosFunerarios.montoPagoAnual, 10);
        } else if (count > 0 && (montoPago > 0 && (checkedGastosFunerarios && checkedDesempleo))) {
            montoTotalSeguros = 0;
            montoTotalSeguros = parseInt(seguroVida.montoPagoAnual * count, 10) + parseInt(seguroGastosFunerarios.montoPagoAnual, 10) + parseInt(seguroDesempleo.montoPagoAnual, 10);
        }
        this.setState({ montoTotalSeguros: montoTotalSeguros })
        let calculaMontoReq = {
            "solicitud": datosSolicitud.solicitud,
            "oficina": { "oficina": valoresSession.oficina, "iva": valoresSession.ivaSucursal, "esFrontera": valoresSession.frontera },
            "segmento": datosSolicitud.segmento,
            "categoria": datosSolicitud.categoria,
            "codigoProducto": datosSolicitud.codigoProducto,
            "tipoProducto": datosSolicitud.tipoProducto,
            "frecuenciaPago": datosSolicitud.frecuencia,
            "montoSolicitado": datosSolicitud.montoSolicitado,
            "efectivoSolicitado": datosSolicitud.montoSolicitado,
            "efectivoOtorgado": datosSolicitud.montoSolicitado,
            "montoOtorgado": datosSolicitud.montoSolicitado,
            "comisionApertura": 0,
            "ivaComisionApertura": 0,
            "plazo": datosSolicitud.plazo,
            "tasa": datosSolicitud.tasa,
            "tipoCredito": this.props.tipoCredito,
            "integrantes": [{ "persona": { "idRelacionPersonaVive": "0", "nivelCliente": 1, "grupoRenovacion": -1 }, "montoSeguro": montoTotalSeguros.toString() }],
            "nivelClienteAnalisis": productosWS[0].nivelCliente,
            "grupoRenovacionAnalisis": productosWS[0].grupoRenovacion,
            "claveCorresponsal": datosSolicitud.corresponsal
        }
        const request = JSON.stringify(calculaMontoReq)
        console.log("request (calculaMontoPago)", request)
        this.openDialog({
            ...this.state.contenidoDialogo,
            isLoadingDialog: true
        })
        this.props.calculaMontoPago(request, () => { }).then(response => {
            console.log("respuesta del servicio (calculaMontoPago)", response.payload.montoPago)
            this.setState({ montoPago: response.payload.montoPago })
            this.calculaMontoPagoSinSeguro();
            return response;
        });
    }

    obtenenTipoAnalisis = (montoPagoObj) => {
        const { valoresSession } = this.props.sessionRegistro;
        const { datosSolicitud, contratoAnt } = this.props.datosCredito;
        const respuesta = this.validateContratoAnt(contratoAnt);
        console.log("despues de (validateContratoAnt)", respuesta.persona)
        console.log("despues de (validateContratoAnt)", respuesta.contrato)
        console.log("tipoCredito que se manda para obtenerTipoAnalisis", this.props.tipoCredito)
        const request = {
            "oficina": { "esCondicionada": valoresSession.esCondicionada, "esCritica": valoresSession.esCritica, "oficina": valoresSession.oficina },
            "segmento": datosSolicitud.segmento,
            "tipoProducto": datosSolicitud.tipoProducto,
            "categoria": datosSolicitud.categoria,
            "plazo": datosSolicitud.plazo,
            "tipoCredito": this.props.tipoCredito,
            "integrantes": [{ "persona": { ...respuesta.persona } }],
            "contratoAnterior": { ...respuesta.contrato },
            "efectivoSolicitado": datosSolicitud.montoSolicitado,
            "montoSolicitado": datosSolicitud.montoSolicitado,
            "montoPago": montoPagoObj.montoPago,
            "toleranciaCredito": contratoAnt.toleranciaCredito ? contratoAnt.toleranciaCredito : 0,
            "codigoProducto": datosSolicitud.codigoProducto
        }
        const requestJson = JSON.stringify(request)
        console.log("Request tipo Analisis", requestJson)
        this.props.obtenerTipoAnalisis(requestJson, () => { }).then(response => {
            console.log("respuesta del servicio (obtenerTipoAnalisis)", response);
            this.validateTipoAnalisisResponse(response.payload);
            return response;
        });
    }


    //valida la respuesta del servicio de tipoAnalisis
    validateTipoAnalisisResponse = (tipoAnalisis) => {
        console.log("validando response del tipoAnalisis")
        if (tipoAnalisis.clave !== 'ERROR') {
            if (tipoAnalisis.resultadoAnalisis.codigo === '-1') {
                console.log("Salio mal tipo analisis")
                this.props.disabledContinuar();
                this.openDialog({
                    ...this.state.contenidoDialogo,
                    iconColor: 'text',
                    content: 'Tipo Análisis',
                    subcontent: this.props.datosCredito.tipoAnalisis.resultadoAnalisis.comentario,
                    flag: false,
                })
                //this.props.setDatosCredito({})
            }
        }
    }

    //valida los datos del contratoAnterior
    validateContratoAnt = (contratoAnt) => {
        const { contratoAnterior, integrantes } = contratoAnt;
        const { comboProductoItems, productoSeleccionado } = this.props;
        const productoAt = comboProductoItems.find(prod => prod.producto === productoSeleccionado);
        let persona = {};
        let contrato = {};
        if (contratoAnterior.contrato !== '000000000000') {
            const { anticipada } = productoAt;
            console.log("cuenta con contrato anterior", contratoAnt.contrato)
            contrato = { ...contratoAnterior, renovacionAnticipada: anticipada === 'S' ? 1 : 0 };
            persona = integrantes[0].persona
            return { contrato, persona };

        } else {
            const { anticipada } = productoAt;
            console.log("no cuenta con contrato anterior")
            persona = { ...integrantes[0].persona, persona: undefined }
            contrato = {
                "contrato": contratoAnterior.contrato,
                "consecutivo": contratoAnterior.consecutivo,
                "capitalInsoluto": contratoAnterior.capitalInsoluto,
                "ciclo": contratoAnterior.ciclo,
                "grupoRenovacion": contratoAnterior.grupoRenovacion,
                "nivelCliente": contratoAnterior.nivelCliente,
                "grupoCliente": contratoAnterior.grupoCliente,
                "renovacionAnticipada": anticipada === 'S' ? 1 : 0,

            }
            return { contrato, persona };
        }
    }

    //llena los arreglos con los seguros que regresa el servicio 
    validateProductos = () => {
        const { seguros } = this.props.datosCredito;
        for (var i = 0; i < seguros.length; i++) {
            if (seguros[i].codigoProductoSeguro === 'SEGVID') {
                this.setState({ seguroVida: seguros[i] })
            }
            if (seguros[i].codigoProductoSeguro === 'SEGDES' || seguros[i].codigoProductoSeguro === 'SEGINV') {
                this.setState({ seguroDesempleo: seguros[i] })
            }
            if (seguros[i].codigoProductoSeguro === 'SEGFUN') {
                this.setState({ seguroGastosFunerarios: seguros[i] })
            }
        }
    }

    render() {
        return (
            <div>
                <Seguros
                    deleteSeguro={this.deleteSeguro}
                    addSeguro={this.addSeguro}
                    handleChangeDesempleo={this.handleChangeDesempleo}
                    handleChangeGastosFunerarios={this.handleChangeGastosFunerarios}
                    handleChange={this.handleChange}
                    {...this.state}
                />

                <DialogNotificationModal
                    {...this.state.openDialog}
                    handleClose={this.closeDialog}
                    handleOnClose={this.getFormatosSolicitudDrools}>
                </DialogNotificationModal>

            </div>
        );
    }
}
const mapStateToProps = state => ({
    datosCredito: getCreditData(state),
    sessionRegistro: getSessionRegistro(state)
});

const mapDispatchToProps = ({
    calculaMontoPago,
    obtenerTipoAnalisis,
    autofill,
    reset,
    setDatosCredito,
    calculaMontoPagoSinSeguro,
    consultaPrimaSeguros
})
export default connect(mapStateToProps, mapDispatchToProps)(SegurosContainer);
