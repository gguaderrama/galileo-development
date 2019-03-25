import React, { Component } from 'react';
import TablaIntegrantes from '../../components/RegistroSolicitudes/TablaIntegrantes'
import BusquedaIntegrante from '../../components/RegistroSolicitudes/BusquedaIntegrante';
import ResultadoIntegrante from '../../components/RegistroSolicitudes/ResultadoIntegrante';
import DialogNotificationModal from 'App/_commons/components/DialogNotificationModal';
import { consultarPersonas, setClienteSelected, setClientes } from './../../redux/actions/RegistroSolicitudes/obtenerPersonas';
import { eliminarIntegrante, updateCliente, setDatosCredito } from '../../redux/actions/RegistroSolicitudes/modificarDatosIntegrantes';
import { validaXMLPrescore } from './../../redux/actions/RegistroSolicitudes/obtenerFormatos';
import { validaPoliticasRegistro, getModeloBPM, validarZonaAutorizada, setDatosPrescore } from './../../redux/actions/RegistroSolicitudes/registroSolicitud';
import { setActiveStep, setStepDisabled, setStepVisible } from './../../redux/actions/RegistroSolicitudes/controlNavegacion'
import { validatios } from '../../components/RegistroSolicitudes/validations'
import { GENERIC_DIALOG_CONTENT } from '../../constants/RegistroSolicitud/registroSolicitud';
import { getClientes } from './../../redux/selectors/RegistroSolicitudes/busquedaCliente';
import { getCreditData } from './../../redux/selectors/RegistroSolicitudes/datosCredito';
import { getSessionRegistro } from '../../redux/selectors/Session/session';
import { reset, change } from 'redux-form';
import { connect } from 'react-redux';
import moment from 'moment';

class IntegrantesContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            enabledRegistro: false,
            selected: [],
            selectedbusqueda: [],
            clientes: [],
            clienteSelected: [],
            open: false,
            openSnackBar: false,
            openDialog: {},
            snackbarNotificacion: {},
            errorNombre: false,
            errorPaterno: false,
            errorRFC: false,
            required: true,
            selectedDate: null,
            condicionesProducto: {},
            solicitudObject: {},
            registro: false,
            contenidoDialogo: GENERIC_DIALOG_CONTENT
        }
    }

    componentWillUnmount() {
        if (!this.state.registro) {
            this.props.setDatosPrescore({ ...this.state.solicitudObject });
        }
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.datosCredito.respuestaRegistro) {
            if (nextProps.datosCredito.respuestaRegistro.respuesta === 'V' && this.props.busquedaPersona.clienteSeleccionado.length > 0) {
                console.log("Solicitud Registrada")
                this.closeDialog();
                this.openDialog({
                    ...this.state.contenidoDialogo,
                    iconColor: 'text',
                    title: 'Registro Solicitud',
                    subcontent: 'Solicitud registrada correctamente',
                    flag: false,
                })
                this.setState({ registro: true })
            }
        }
        if (nextProps.datosCredito.modeloBPM) {
            if (this.props.enableContinuar && !nextProps.datosCredito.modeloBPM.calulaPrescore) {
                this.props.disabledContinuar();
                this.setState({ enabledRegistro: true })
            } if (this.props.enableContinuar && nextProps.datosCredito.modeloBPM.calulaPrescore) {
                this.setState({ enabledRegistro: false })

            }
        }


    }

    componentDidUpdate(prevProps, prevState) {
        const { solicitudObject } = this.state;
        if (prevProps.datosCredito.politicasRegistro !== this.props.datosCredito.politicasRegistro) {
            console.log("this.props.datosCredito.politicasRegistro", this.props.datosCredito.politicasRegistro.clave)
            if (this.props.datosCredito.politicasRegistro.clave !== 'ERROR') {
                const request = { solicitudObject: solicitudObject }
                const requestJSON = JSON.stringify(request);
                this.props.getModeloBPM(requestJSON, () => { }).then(response => {
                    console.log("respuesta (getModeloBPM)", response)
                    return response;
                })
            } else if (this.props.datosCredito.politicasRegistro.clave === 'ERROR') {
                this.props.disabledContinuar();
                this.openDialog({
                    ...this.state.contenidoDialogo,
                    title: 'Validaciones',
                    subcontent: this.props.datosCredito.politicasRegistro.value,
                    flag: false,
                })
            }
        }

        /*    if (prevState.registro !== this.state.registro) {
               this.closeDialog(true);
           }
    */
        if (prevProps.datosCredito.modeloBPM !== this.props.datosCredito.modeloBPM) {
            this.closeDialog();
        }
        if (prevProps.datosCredito.validacionZonaAutorizada !== this.props.datosCredito.validacionZonaAutorizada) {
            if (this.props.datosCredito.validacionZonaAutorizada.clave === 'OK') {
                if (!this.state.enabledRegistro && this.props.datosCredito.validacionZonaAutorizada.value === '') {
                    this.validaPoliticasRegistro();
                } if (this.props.datosCredito.validacionZonaAutorizada.value !== '' && this.props.enableContinuar) {
                    this.props.disabledContinuar();
                    this.openDialog({
                        ...this.state.contenidoDialogo,
                        iconColor: 'text',
                        content: 'Zona Autorizada',
                        subcontent: this.props.datosCredito.validacionZonaAutorizada.value,
                        flag: false,
                        isLoadingDialog: false
                    })

                }

            }

        }

        if (prevProps.busquedaPersona.clienteSeleccionado !== this.props.busquedaPersona.clienteSeleccionado) {
            if (this.state.open) {
                this.setState({ selected: this.props.busquedaPersona.clienteSeleccionado })
            }
        }

    }

    async componentDidMount() {
        const { clienteSeleccionado } = this.props.busquedaPersona;
        const { datosSolicitud, prescoreXmlCondicion } = this.props.datosCredito;
        if (!prescoreXmlCondicion) {
            this.validaXMLPrescore();
        }
        if (datosSolicitud) {
            this.props.updateCliente({
                ...clienteSeleccionado[0],
                efectivoSolicitado: datosSolicitud.montoOtorgado,
                montoPago: datosSolicitud.montoPago,
                montoSeguro: datosSolicitud.montoSeguro
            })
        }

          if (this.props.datosCredito.asentamientoEmpleo !== undefined) {
            this.validarZonaAutorizada();
        } else { 
            this.validaPoliticasRegistro();
        }
    }

    registroSolicitud = () => {
        const { solicitudObject } = this.state;
        const requestJSON = JSON.stringify({ ...solicitudObject });
        this.openDialog({
            ...this.state.contenidoDialogo,
            title: '',
            content: 'Cargando ...',
            subcontent: '',
            isLoadingDialog: true,
            opened: true,
        })
        this.props.registrarSolicitud(requestJSON);
    }

    validaXMLPrescore = () => {
        const { productos, datosSolicitud } = this.props.datosCredito;
        const { valoresSession } = this.props.sessionRegistro;
        console.log("entro a validaXMLPrescore")
        const productoS = productos.find(producto => producto.segmento === datosSolicitud.segmento && producto.categoria === datosSolicitud.categoria)
        this.setState({ condicionesProducto: productoS })
        const request = {
            "solicitud": datosSolicitud.solicitud,
            "integrantes": [{ "numeroIntegrante": productoS.maxIntegrantes }],
            "claveEmpresa": valoresSession.empresa
        }
        const requestJSON = JSON.stringify(request);
        this.openDialog({
            ...this.state.contenidoDialogo,
            isLoadingDialog: true

        })
        this.props.validaXMLPrescore(requestJSON, () => { }).then(response => {
            console.log("respuesta (validaXMLPrescore)", response)
            return response;
        })
    }


    validaPoliticasRegistro = () => {
        const { datosSolicitud, productosWS, tipoAnalisis, vendedores, contratoAnt } = this.props.datosCredito;
        const { valoresSession, sessionParams } = this.props.sessionRegistro;
        const { clienteSeleccionado } = this.props.busquedaPersona;

        const respuesta = this.validateContratoAnt(contratoAnt);

        console.log("objetos para mandar a validar politicas", respuesta)
        console.log("datos Solicitud", datosSolicitud)
        let usuario = `000${sessionParams.gsCveUsuario}`;
        let origen = 'REGISTRO';
        let datosVendedor = vendedores.find(vendedor => vendedor.persona === datosSolicitud.vendedor);
        const request = {
            solicitud: datosSolicitud.solicitud,
            claveEmpresa: valoresSession.empresa,
            creditoGrupal: 'N',
            numeroIntegrantes: clienteSeleccionado.length,
            oficina: {
                oficina: valoresSession.oficina,
                claveEmpresa: valoresSession.empresa
            },
            segmento: datosSolicitud.segmento,
            categoria: datosSolicitud.categoria,
            codigoProducto: datosSolicitud.codigoProducto,
            tipoProducto: datosSolicitud.tipoProducto,
            cliente: clienteSeleccionado[0].persona,
            efectivoSolicitado: parseInt(datosSolicitud.montoOtorgado, 10),
            montoSolicitado: parseInt(datosSolicitud.montoOtorgado, 10),
            frecuenciaPago: datosSolicitud.frecuencia,
            plazo: datosSolicitud.plazo,
            diaPago: null,
            tasa: datosSolicitud.tasa,
            comisionApertura: null,
            cat: null,
            oficinaDisposicion: null,
            horaReunion: null,
            diaReunion: null,
            numeroFamiliaresGrupo: null,
            montoPago: datosSolicitud.montoPago,
            montoFinanciadoContratoAnterior: parseInt(contratoAnt.contratoAnterior.capitalInsoluto, 10),
            contratoAnterior: {
                ...respuesta.contrato
            },
            fechaResolucion: null,
            horaResolucion: null,
            efectivoOtorgado: parseInt(datosSolicitud.montoOtorgado, 10),
            montoOtorgado: parseInt(datosSolicitud.montoOtorgado, 10),
            contrato: null,
            vendedor: datosSolicitud.vendedor,
            vendedorOrigen: null,
            gteVentas: datosVendedor.gteVentas ? datosVendedor.gteVentas : null,
            gteSucursal: datosVendedor.gteSucursal,
            grupoVentas: datosVendedor.equipo,
            contratoRecomienda: null,
            claveCorresponsal: datosSolicitud.corresponsal,
            status: contratoAnt.contratoAnterior.contrato !== '000000000000' ? contratoAnt.contratoAnterior.status : 'P',
            ciclo: contratoAnt.contratoAnterior.ciclo + 1,
            origenVenta: datosVendedor.tipoEquipo,
            etapa: "REGISTRO",
            tipoAnalisis: tipoAnalisis.tipoAnalisis,
            fechaSolicitud: null,
            horaSolicitud: null,
            etapaAnterior: null,
            motivoStatus: null,
            fechaUltimaModificacion: null,
            horaUltimaModificacion: null,
            usuarioRegistraSolicitud: usuario,
            integrantes: [
                {
                    seguros: datosSolicitud.seguroVida ? [{
                        cliente: clienteSeleccionado[0].persona,
                        solicitud: datosSolicitud.solicitud,
                        montoSeguro: datosSolicitud.seguroVida.montoPagoAnual,
                        sumaAsegurada: datosSolicitud.seguroVida.sumaAsegurada,
                        usuarioUltimaModificacion: usuario,
                        codigoProductoSeguro: datosSolicitud.seguroVida.codigoProductoSeguro,
                        codigoSeguro: datosSolicitud.seguroVida.claveSeguroFindep,
                        proveedor: datosSolicitud.seguroVida.proveedor,
                        minBeneficiarios: datosSolicitud.seguroVida.minimoBeneficiarios,
                        maxBeneficiarios: datosSolicitud.seguroVida.maximoBeneficiarios,
                        tipoSeguro: datosSolicitud.seguroVida.tipoSeguro,
                        numeroIntegrante: clienteSeleccionado[0].id
                    }, datosSolicitud.seguroDesempleo && {
                        cliente: clienteSeleccionado[0].persona,
                        solicitud: datosSolicitud.solicitud,
                        montoSeguro: datosSolicitud.seguroDesempleo.montoPagoAnual,
                        sumaAsegurada: datosSolicitud.seguroDesempleo.sumaAsegurada,
                        usuarioUltimaModificacion: usuario,
                        codigoProductoSeguro: datosSolicitud.seguroDesempleo.codigoProductoSeguro,
                        codigoSeguro: datosSolicitud.seguroDesempleo.claveSeguroFindep,
                        proveedor: datosSolicitud.seguroDesempleo.proveedor,
                        minBeneficiarios: datosSolicitud.seguroDesempleo.minimoBeneficiarios,
                        maxBeneficiarios: datosSolicitud.seguroDesempleo.maximoBeneficiarios,
                        tipoSeguro: datosSolicitud.seguroDesempleo.tipoSeguro,
                        numeroIntegrante: clienteSeleccionado[0].id
                    }, datosSolicitud.seguroGastosFunerarios && {
                        cliente: clienteSeleccionado[0].persona,
                        solicitud: datosSolicitud.solicitud,
                        montoSeguro: datosSolicitud.seguroGastosFunerarios.montoPagoAnual,
                        sumaAsegurada: datosSolicitud.seguroGastosFunerarios.sumaAsegurada,
                        usuarioUltimaModificacion: usuario,
                        codigoProductoSeguro: datosSolicitud.seguroGastosFunerarios.codigoProductoSeguro,
                        codigoSeguro: datosSolicitud.seguroGastosFunerarios.claveSeguroFindep,
                        proveedor: datosSolicitud.seguroGastosFunerarios.proveedor,
                        minBeneficiarios: datosSolicitud.seguroGastosFunerarios.minimoBeneficiarios,
                        maxBeneficiarios: datosSolicitud.seguroGastosFunerarios.maximoBeneficiarios,
                        tipoSeguro: datosSolicitud.seguroGastosFunerarios.tipoSeguro,
                        numeroIntegrante: clienteSeleccionado[0].id

                    }] : undefined,
                    persona: datosSolicitud.codigoProducto === 'ATCP' ? null : { ...respuesta.persona },
                    numeroIntegrante: clienteSeleccionado[0].id
                }
            ],
            grupoRenovacionAnalisis: productosWS[0].grupoRenovacion,
            nivelClienteAnalisis: productosWS[0].nivelCliente,
            tipoCredito: this.props.tipoCredito,
            tipoDisposicion: datosSolicitud.tipoDisposicion,
            origen: origen

        }
        this.setState({ solicitudObject: request })
        const requestJSON = JSON.stringify(request);
        this.props.validaPoliticasRegistro(requestJSON, () => { }).then(response => {
            console.log("respuesta (validaPoliticasRegistro)", response)
            return response;
        })

    }


    validateContratoAnt = (contratoAnt) => {
        const { contratoAnterior, integrantes } = contratoAnt;
        const { ProductoItems } = this.props;
        const { datosSolicitud } = this.props.datosCredito;
        const productoAt = ProductoItems.find(prod => prod.producto === datosSolicitud.codigoProducto);
        let persona = {};
        let contrato = {};
        if (contratoAnterior.contrato !== '000000000000') {
            const { anticipada } = productoAt;
            contrato = {
                "contrato": `0000${contratoAnterior.contrato}`,
                "capitalInsoluto": parseInt(contratoAnterior.capitalInsoluto, 10),
                "consecutivo": contratoAnterior.consecutivo,
                "cumplePoliticaPagos": 0,
                "montoPago": contratoAnterior.montoPago,
                "plazo": contratoAnterior.plazo,
                "renovacionAnticipada": anticipada === 'S' ? 1 : 0,
                "segmento": contratoAnterior.segmento,
                "categoria": contratoAnterior.categoria,
                "tipoProducto": contratoAnterior.tipoProducto,
                "codigoProducto": contratoAnterior.codigoProducto,
                "status": contratoAnterior.status,
                "vendedorOrigen": contratoAnterior.vendedorOrigen

            }
            console.log("integrantes[0].persona", integrantes[0].persona)
            persona = { ...integrantes[0].persona }
            return { contrato, persona };

        } else {
            persona = { ...integrantes[0].persona }
            contrato = {
                "contrato": contratoAnterior.contrato,
                "capitalInsoluto": 0,
            }
            return { contrato, persona };
        }
    }


    handleSubmit = values => {
        let fecha = null;
        const { selectedDate } = this.state;
        let obj = validatios(values)
        if (selectedDate) {
            fecha = this.props.change('BusquedaIntegrante', 'fechaNacimiento', moment(selectedDate).format('YYYY/MM/DD HH:mm:ss')).payload;
        }
        if (obj.isValid) {
            let request = {
                nombre: values.nombre,
                apellidoPaterno: values.apellidoPaterno,
                apellidoMaterno: values.apellidoMaterno ? values.apellidoMaterno : null,
                rfcCapturado: values.rfc ? values.rfc : null,
                fechaNacimiento: selectedDate ? fecha : null,
            }
            let personaBusqueda = JSON.stringify(request);
            console.log("request consultaPersona", personaBusqueda)
            this.openDialog({
                ...this.state.contenidoDialogo, title: '',
                isLoadingDialog: true
            });
            this.props.consultarPersonas(personaBusqueda, this.closeDialog, this.openDialog).then(r => {
                if (r.payload.length === 0) {
                    this.setState({ clienteSelected: request })
                    this.openDialog({
                        ...this.state.contenidoDialogo,
                        iconColor: 'text',
                        content: 'No se encontró información referente al cliente.',
                        subcontent: '¿Deseas continuar con el proceso?',
                        flag: true,
                    });
                } else if (r.payload.length > 0) {
                    this.setState({ clientes: r.payload })
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

    handleClean = () => {
        this.props.reset('BusquedaIntegrante');
        this.setState({ clientes: [] })
        this.props.setClientes([])
        this.setState({ selectedDate: null });
    }

    handleSelectedAddPerson = () => {
        const { selectedbusqueda } = this.state;
        this.props.setClienteSelected(selectedbusqueda[0]);
        this.setState({ selectedbusqueda: [] })
        this.handleClean();
    }

    openDialog = (mensaje) => {
        this.setState({ openDialog: mensaje })
    }

    addPerson = () => {
        const { clienteSelected } = this.state;
        this.props.setClienteSelected(clienteSelected);
        this.closeDialog();
        this.handleClean();
    }

    closeDialog = () => {
        this.setState({ openDialog: { ...this.state.contenidoDialogo, opened: false } })
        if (this.state.registro) {
            this.props.cleanState();
        }
    }

    handleCloseSnack = () => {
        this.setState({ openSnackBar: false, errorPaterno: false, errorNombre: false, errorRFC: false })
    }
    handleSelectAllClick = event => {
        const { clienteSeleccionado } = this.props.busquedaPersona;
        if (event.target.checked) {
            this.setState(state => ({ selected: clienteSeleccionado.map(n => n) }));
            return;
        }
        //this.setState({ selected: [] });
    };
    handleSelectAllClickClientes = event => {
        const { clientes } = this.state;
        if (event.target.checked) {
            this.setState(state => ({ selectedbusqueda: clientes.map(n => n) }));
            return;
        }
        this.setState({ selected: [] });
    };

    handleClick = (event, integrante) => {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(integrante);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat([], integrante);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        this.setState({ selected: newSelected });
    };
    handleClickPerson = (event, cliente) => {
        const { selectedbusqueda } = this.state;
        const selectedIndex = selectedbusqueda.indexOf(cliente);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat([], cliente);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selectedbusqueda.slice(1));
        } else if (selectedIndex === selectedbusqueda.length - 1) {
            newSelected = newSelected.concat(selectedbusqueda.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selectedbusqueda.slice(0, selectedIndex),
                selectedbusqueda.slice(selectedIndex + 1),
            );
        }
        this.setState({ selectedbusqueda: newSelected });
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    isSelectedPerson = id => this.state.selectedbusqueda.indexOf(id) !== -1;

    handleOpenDialog = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleDeleteIntegrante = () => {
        const { selected } = this.state;
        this.props.eliminarIntegrante(selected);
        this.setState({ selected: [] });
    }
    handleDateChange = date => {
        this.setState({ selectedDate: date });
    };

    validarZonaAutorizada = () => {
        const { asentamientoDomicilio, asentamientoEmpleo, datosSolicitud } = this.props.datosCredito;
        const { valoresSession } = this.props.sessionRegistro;
        const request = {
            tipoProducto: datosSolicitud.tipoProducto,
            categoria: datosSolicitud.categoria,
            tipoCredito: "N",
            oficina: {
                oficina: valoresSession.oficina
            },
            integrantes: [
                {
                    persona: {
                        domiciliosEmpleo: [asentamientoEmpleo],
                        domiciliosParticulares: [asentamientoDomicilio],
                        domiciliosObras: [{ cp: "", colonia: null }]
                    }
                }
            ]
        }

        const requestJSON = JSON.stringify(request);
        console.log(" requestJSON validarZona", requestJSON)
        this.openDialog({
            ...this.state.contenidoDialogo,
            isLoadingDialog: true

        })
        this.props.validarZonaAutorizada(requestJSON, () => { }).then(response => {
            console.log("respuesta (validarZonaAutorizada)", response)
            return response;
        })

    }


    render() {
        return (
            <div >
                {this.state.condicionesProducto.maxIntegrantes > 1 &&
                    <div>

                        <div>
                            <BusquedaIntegrante
                                {...this.state}
                                handleDateChange={this.handleDateChange}
                                handleOnCloseDialg={this.addPerson}
                                handleCloseDialog={this.closeDialog}
                                handleClean={this.handleClean}
                                handleCloseSnack={this.handleCloseSnack}

                                onSubmit={this.handleSubmit} />
                        </div>

                        <div style={{
                            width: '1400px',
                            marginLeft: '141px',

                        }}>
                            <ResultadoIntegrante
                                {...this.state}

                                handleSelectAllClickClientes={this.handleSelectAllClickClientes}
                                handleSelectedAddPerson={this.handleSelectedAddPerson}
                                handleClickPerson={this.handleClickPerson}
                                isSelectedPerson={this.isSelectedPerson}
                            />
                        </div>

                    </div>}
                <br></br>
                <div>

                    <TablaIntegrantes
                        {...this.state}
                        {...this.props.datosCredito}
                        registroSolicitud={this.registroSolicitud}
                        handleSelectAllClick={this.handleSelectAllClick}
                        handleClose={this.handleClose}
                        handleClick={this.handleClick}
                        handleOpenDialog={this.handleOpenDialog}
                        isSelected={this.isSelected}
                        handleDeleteIntegrante={this.handleDeleteIntegrante}
                        integrantes={this.props.busquedaPersona.clienteSeleccionado} />

                    <DialogNotificationModal
                        {...this.state.openDialog}
                        handleClose={this.closeDialog}
                        handleOnClose={() => { }}>
                    </DialogNotificationModal>

                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    datosCredito: getCreditData(state),
    busquedaPersona: getClientes(state),
    sessionRegistro: getSessionRegistro(state)
});

const mapDispatchToProps = ({
    consultarPersonas,
    reset,
    change,
    setClienteSelected,
    eliminarIntegrante,
    setClientes,
    updateCliente,
    validaXMLPrescore,
    validaPoliticasRegistro,
    getModeloBPM,
    validarZonaAutorizada,
    setActiveStep,
    setStepDisabled,
    setStepVisible,
    setDatosCredito,
    setDatosPrescore
});

export default connect(mapStateToProps, mapDispatchToProps)(IntegrantesContainer);
