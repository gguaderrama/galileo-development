import React, { Component } from 'react';
import Steper from 'components/Generic/Steper';
import DatosCreditoContainer from 'containers/RegistroSolicitudes/DatosCreditoContainer';
import PreScoreContainer from 'containers/RegistroSolicitudes/PreScoreContainer';
import IntegrantesContainer from 'containers/RegistroSolicitudes/IntegrantesContainer';
import DigitalizacionComponent from 'components/captura/DigitalizacionComponent';
import BusquedaPersonaContainer from 'containers/RegistroSolicitudes/BusquedaPersonaContainer';
import DigitalizaContainer from 'containers/RegistroSolicitudes/DigitalizaContainer';
import { GENERIC_DIALOG_CONTENT, GENERIC_SNACK_CONTENT, CATALOGOS_INICIO, PARAMETROS_REGISTRO, PRESCORE_STEP_STATE, DIGITALIZA_STEP_STATE } from 'constants/RegistroSolicitud/registroSolicitud';
import { getUrlParams, paramsHasProperties } from 'utilities/session';
import { registraSolicitud } from 'redux/actions/RegistroSolicitudes/registroSolicitud';
import { fetchCatalogoEstados, fetchListaCatalogos, fetchCatalogoPaises } from 'redux/actions/captura/catalogos';
import { setSession, consultaValoresSession } from 'redux/actions/Session/session'
import { guardaXLMPrescore, obtenerIP } from 'redux/actions/RegistroSolicitudes/registroSolicitud';
import { consultarPersonas, setClienteSelected } from 'redux/actions/RegistroSolicitudes/obtenerPersonas';
import { setActiveStep, setStepDisabled, setNextStep, setStepVisible, limpiarBusquedaPersona } from 'redux/actions/RegistroSolicitudes/controlNavegacion'
import { getCatalogosCaptura } from 'redux/selectors/captura/catalogos';
import { limpiarDatosCredito } from 'redux/actions/RegistroSolicitudes/obtenerProductos';
import { getSessionRegistro } from 'redux/selectors/Session/session';
import { getClientes } from 'redux/selectors/RegistroSolicitudes/busquedaCliente';
import { getCreditData } from 'redux/selectors/RegistroSolicitudes/datosCredito';
import { obtenerControlesNavegacion } from 'redux/selectors/RegistroSolicitudes/navegacionCtrl';
import { reset } from 'redux-form';
import { connect } from 'react-redux';
import DialogNotificationModal from 'App/_commons/components/DialogNotificationModal';
import moment from 'moment';

class StepperContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openDialog: {},
            datosCreditoSave: {},
            mostrarContenido: true,
            openSnackBar: false,
            snackbarNotificacion: GENERIC_SNACK_CONTENT,
            contenidoDialogo: GENERIC_DIALOG_CONTENT,
            enableContinuar: false,
            muestraZona: null,
            ProductoItems: [],
            tipoCredito: ''
        }
    }

    componentDidMount() {
        const params = getUrlParams(true);
        if (paramsHasProperties(params, PARAMETROS_REGISTRO)) {
            this.props.setSession(params)
        }
    }

    async componentDidUpdate(prevProps, prevState) {
        const { sessionParams } = this.props.sessionRegistro;
        const { fetchListaCatalogos, fetchCatalogoEstados, fetchCatalogoPaises } = this.props;
        if (prevProps.sessionRegistro.sessionParams !== this.props.sessionRegistro.sessionParams) {
            let usuario = `000${sessionParams.gsCveUsuario}`;
            let request = {
                "cveSucursal": sessionParams.gsCveSucursal,
                "cveCentroCostos": sessionParams.gsCveCentroCosto,
                "cveEmpresa": sessionParams.gsCveEmpresa,
                "cveUsuario": usuario,
                "cvePerfil": sessionParams.gsCvePerfil,
                "usuario": sessionParams.usuario,
                "departamento": sessionParams.departamento,
                "nombre": sessionParams.nombre,
                "oficinas": null
            }
            const requestSession = JSON.stringify(request);
            let listaCatalogos = { "listaCatalogos": CATALOGOS_INICIO }
            this.openDialog({
                ...this.state.contenidoDialogo,
                title: '',
                content: 'Buscando Persona ...',
                subcontent: '',
                isLoadingDialog: true,
                opened: true,
            })
            fetchListaCatalogos(listaCatalogos);
            fetchCatalogoEstados();
            fetchCatalogoPaises();
            this.props.consultaValoresSession(requestSession, () => { });

        }

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.sessionRegistro.valoresSession !== this.props.sessionRegistro.valoresSession) {
            this.closeDialog()
            if (Object.keys(nextProps.sessionRegistro.valoresSession).length < 1) {
                this.setState({ mostrarContenido: false })
                this.openDialog({
                    ...this.state.contenidoDialogo,
                    title: 'Información',
                    iconColor: 'primary',
                    content: 'No se pudieron obtener los datos de la sesión',
                    subcontent: '',
                })
            }
        }
        if (nextProps.datosCredito.rutaArchivo) {
            if (Object.keys(nextProps.datosCredito.rutaArchivo).length > 0 &&
                nextProps.datosCredito.rutaArchivo !== this.props.datosCredito.rutaArchivo) {
                this.props.setNextStep()
            }
        }
    }
    guardaProductos = (value) => {
        this.setState({ ProductoItems: value })
    }


    //metodo generico para registrar solicitud
    registrarSolicitud = (jsonSolicitud) => {
        console.log("JSON solicitud", jsonSolicitud);
        this.props.registraSolicitud(jsonSolicitud, () => { }).then(response => {
            console.log("respuesta (registrarSolicitud)", response)
            return response;
        })
    }

    //metodo que guarda la información del crédito cuando se sale del step
    saveDatos = (data) => {
        console.log("datos que se van a guardar en el estado del steper", data)
        this.setState({ datosCreditoSave: data })
    }

    //limpia la aplicación y la deja en su estado incial 
    cleanState = () => {
        this.setState({ datosCreditoSave: {} })
        this.props.limpiarBusquedaPersona();
        this.props.setClienteSelected({})
        this.props.limpiarDatosCredito();
        this.props.reset('BusquedaCliente');
        this.props.reset('ZonaAutorizada');
        this.props.reset('DatosSolicitud');
    }

    handleCloseSnack = () => {
        this.setState({ openSnackBar: false })
    }


    // metodo del control de la pantalla desde el stper
    cambiarPantalla = (index) => {
        if (index === 2) {
            if (Object.keys(this.props.datosCredito.datosSolicitud).length > 0) {
                if (this.props.datosCredito.datosSolicitud.categoria !== 'NOMN') {
                    if (this.props.datosCredito.objMontoPagoSinSeguro !== undefined &&
                        (this.props.datosCredito.tipoAnalisis !== undefined && this.props.datosCredito.tipoAnalisis.resultadoAnalisis.codigo !== '-1')) {
                        if (!this.state.muestraZona) {
                            this.props.setActiveStep(index)
                        } else if (this.state.muestraZona) {
                            if (this.props.datosCredito.asentamientoEmpleo !== undefined) {
                                this.props.setActiveStep(index)
                            } else {
                                this.setState({
                                    openSnackBar: true,
                                    snackbarNotificacion: {
                                        ...this.state.snackbarNotificacion,
                                        verticalPosition: 'top',
                                        horizontalPosition: 'right',
                                        duration: 2000,
                                        message: 'Favor de ingresar la zona autorizada',
                                        type: 'error'
                                    }
                                })
                            }
                        }
                    } else {
                        this.setState({
                            openSnackBar: true,
                            snackbarNotificacion: {
                                ...this.state.snackbarNotificacion,
                                verticalPosition: 'top',
                                horizontalPosition: 'right',
                                duration: 2000,
                                message: 'Favor de seleccionar un seguro',
                                type: 'error'
                            }
                        })
                    }
                } else {
                    this.props.setActiveStep(index)
                }
            } else {
                this.setState({
                    openSnackBar: true, snackbarNotificacion: {
                        ...this.state.snackbarNotificacion,
                        verticalPosition: 'top',
                        horizontalPosition: 'right',
                        duration: 2000,
                        message: 'Favor de completar los datos para poder avanzar',
                        type: 'error'
                    }
                })
            }
        } else {
            this.props.setActiveStep(index)
        }
    }

    consultarPersona = (rfcCapturado) => {
        let cliente = [];
        console.log("rfcCapturado", rfcCapturado)
        const personaBusqueda = JSON.stringify({ rfcCapturado: rfcCapturado })
        this.openDialog({
            ...this.state.contenidoDialogo,
            isLoadingDialog: true
        })
        this.props.consultarPersonas(personaBusqueda, this.closeDialog, () => { }).then(response => {
            console.log("response", response)
            cliente = response.payload;
            return response;
        });
        return cliente;
    }


    //control del boton continuar para cambiar de step
    handleNext = () => {
        const { opcionActiva } = this.props.navegacion;
        const { clienteSeleccionado } = this.props.busquedaPersona;
        if (opcionActiva === 1) {
            if (Object.keys(this.props.datosCredito.datosSolicitud).length > 0) {
                if (this.props.datosCredito.datosSolicitud.categoria !== 'NOMN') {
                    if (this.props.datosCredito.objMontoPagoSinSeguro !== undefined && this.props.datosCredito.tipoAnalisis !== undefined) {
                        if (!this.state.muestraZona) {
                            this.props.setNextStep()
                        } else if (this.state.muestraZona) {
                            if (this.props.datosCredito.asentamientoEmpleo !== undefined) {
                                this.props.setNextStep()
                            } else {
                                this.setState({
                                    openSnackBar: true, snackbarNotificacion:
                                    {
                                        ...this.state.snackbarNotificacion,
                                        verticalPosition: 'top',
                                        horizontalPosition: 'right',
                                        duration: 2000,
                                        message: 'Favor de ingresar la zona autorizada',
                                        type: 'error'
                                    }
                                })
                            }
                        }
                    } else {

                        this.setState({
                            openSnackBar: true, snackbarNotificacion:
                            {
                                ...this.state.snackbarNotificacion,
                                verticalPosition: 'top',
                                horizontalPosition: 'right',
                                duration: 2000,
                                message: 'Favor de seleccionar un seguro',
                                type: 'error'
                            }
                        })
                    }
                } else {
                    this.props.setNextStep()
                }

            } else {
                this.setState({
                    openSnackBar: true, snackbarNotificacion: {
                        ...this.state.snackbarNotificacion,
                        verticalPosition: 'top',
                        horizontalPosition: 'right',
                        duration: 2000,
                        message: 'Favor de completar los datos para poder avanzar',
                        type: 'error'
                    }
                })
            }
        } if (opcionActiva === 2) {
            clienteSeleccionado.forEach(cliente => {
                const { apellidoMaterno, apellidoPaterno, fechaNacimiento, nombre, rfcCapturado, domiciliosParticulares } = cliente;
                if (apellidoMaterno !== null && fechaNacimiento !== null && rfcCapturado !== null && apellidoPaterno !== null && nombre !== null) {
                    if (domiciliosParticulares !== undefined) {
                        //consultar persona si existe mandar mensaje de error liena 11022 solicitudController
                        const persona = this.consultarPersona(rfcCapturado);
                        if (persona.length === 0) {
                            console.log("guardando informacion")
                            this.guardaInformacionPrescore(cliente, domiciliosParticulares)

                        } else {
                            console.log("la persona existe")
                        }

                    } else {
                        this.setState({
                            openSnackBar: true, snackbarNotificacion: {
                                ...this.state.snackbarNotificacion,
                                verticalPosition: 'top',
                                horizontalPosition: 'right',
                                duration: 2000,

                                message: 'Favor de ingresar un domicilio',
                                type: 'error'
                            }
                        })

                    }
                } else {
                    this.setState({
                        openSnackBar: true, snackbarNotificacion: {
                            ...this.state.snackbarNotificacion,
                            verticalPosition: 'top',
                            horizontalPosition: 'right',
                            duration: 2000,
                            message: 'Favor de completar los datos básicos del integrante',
                            type: 'error'
                        }
                    })
                }

            });
        }
    }
    guardaInformacionPrescore = (cliente, domiciliosParticulares) => {
        const { sessionParams } = this.props.sessionRegistro;
        const { datosSolicitud } = this.props.datosCredito;
        const usuario = `000${sessionParams.gsCveUsuario}`;
        moment.locale('ES');
        console.log("fecha NAC que se guarda", moment(cliente.fechaNacimiento).format('MM/DD/YYYY'))
        let persona = {
            nombre: cliente.nombre,
            apellidoPaterno: cliente.apellidoPaterno,
            apellidoMaterno: cliente.apellidoMaterno,
            fechaNacimiento: moment(cliente.fechaNacimiento).format('MM/DD/YYYY'),
            rfcCapturado: cliente.rfcCapturado,
            sexo: cliente.sexo,
            curp: cliente.curp,
            persona: cliente.persona,
            calificacion: 0,
            domiciliosParticulares: [
                {
                    tipoDomicilio: domiciliosParticulares[0].tipoDomicilio,
                    persona: cliente.persona,
                    calle: domiciliosParticulares[0].calle,
                    noExterior: domiciliosParticulares[0].noExterior,
                    noInterior: "",
                    codigoEstado: domiciliosParticulares[0].codigoEstado,
                    municipioDelegacion: domiciliosParticulares[0].municipioDelegacion,
                    colonia: domiciliosParticulares[0].colonia,
                    cp: domiciliosParticulares[0].cp,
                    ciudad: domiciliosParticulares[0].ciudad,
                    usuarioAlta: usuario,
                    usuarioUltimaModificacion: usuario,
                    anioAntiguedad: "",
                    mesAntiguedad: ""
                }
            ]
        }

        let solicitud = {
            solicitud: datosSolicitud.solicitud,
            cliente: cliente.persona,
            segmento: datosSolicitud.segmento,
            categoria: datosSolicitud.categoria,
            tipoProducto: datosSolicitud.tipoProducto,
            codigoProducto: datosSolicitud.codigoProducto,
            frecuenciaPago: datosSolicitud.frecuencia,
            plazo: datosSolicitud.plazo,
            tasa: datosSolicitud.tasa,
            montoSolicitado: datosSolicitud.montoSolicitado,
            numeroIntegrantes: "1",
            usuarioRegistraSolicitud: usuario
        };

        const jsonPersona = JSON.stringify(persona);
        const jsonSolicitud = JSON.stringify(solicitud);
        console.log("jsonPersona que se guarda en solicitud_xml_interfaces ", jsonPersona)
        console.log("jsonSolicitud que se guarda en solicitud_xml_interfaces", jsonSolicitud)
        this.props.guardaXLMPrescore(jsonSolicitud, jsonPersona).then(response => {
            let oficina = sessionParams.gsCveSucursal;
            this.props.obtenerIP(oficina, () => { });

        })
        this.props.setStepDisabled(PRESCORE_STEP_STATE);
        this.props.setStepVisible(PRESCORE_STEP_STATE);
        this.props.setStepDisabled(DIGITALIZA_STEP_STATE);
        this.props.setStepVisible(DIGITALIZA_STEP_STATE);

    }

    openDialog = (mensaje) => {
        this.setState({ openDialog: mensaje })
    }

    closeDialog = () => {
        this.setState({ openDialog: { ...this.state.contenidoDialogo, opened: false } })
    }


    //Setear el valor para ver si se muestra la zona autorizada
    setMuestraZona = (value) => {
        console.log("cambiando el valor de la zona autorizada")
        this.setState({ muestraZona: value })
    }

    //deshabilita el boton de continuar
    disabledContinuar = () => {
        console.log("deshabilitando boton")
        this.setState({ enableContinuar: false })
    }
    //habilita el boton de continuar
    enabledContinuar = () => {
        console.log("habilitando boton")
        this.setState({ enableContinuar: true })
    }


    //setea el valor del tipo de credito
    setTipoCredito = (value) => {
        this.setState({ tipoCredito: value })
    }

    //metodo que renderiza el contenido del stepper
    mostrarContenido() {
        const { opcionActiva } = this.props.navegacion;
        switch (opcionActiva) {
            case 0:
                return <BusquedaPersonaContainer cleanState={this.cleanState}
                    {...this.props.catalogosCaptura} />
            case 1:
                return <DatosCreditoContainer {...this.state}
                    guardaProductos={this.guardaProductos}
                    setTipoCredito={this.setTipoCredito}
                    setMuestraZona={this.setMuestraZona}
                    enabledContinuar={this.enabledContinuar}
                    disabledContinuar={this.disabledContinuar}
                    {...this.state.datosCreditoSave}
                    saveDatos={this.saveDatos} />
            case 2:
                return <IntegrantesContainer {...this.state}

                    enabledContinuar={this.enabledContinuar}
                    disabledContinuar={this.disabledContinuar}
                    registrarSolicitud={this.registrarSolicitud}
                    cleanState={this.cleanState} />;
            case 3:
                return <DigitalizaContainer disabledContinuar={this.disabledContinuar}
                    {...this.props.datosCredito}
                    enabledContinuar={this.enabledContinuar} />;
            case 4:
                return <PreScoreContainer disabledContinuar={this.disabledContinuar}
                    cleanState={this.cleanState}
                    registrarSolicitud={this.registrarSolicitud}
                    fetchPersona={this.consultarPersona} />;
            case 5:
                return <DigitalizacionComponent {...this.props.datosCredito} />
            default:
                return 'Unknown step';
        }
    }

    render() {
        return (
            <div>
                <Steper
                    {...this.props.datosCredito}
                    {...this.props.navegacion}
                    {...this.state}
                    closeDialog={this.closeDialog}
                    handleNext={this.handleNext}
                    handleOnChange={this.cambiarPantalla}
                    titulo={'Registro solicitud'}
                    nonLinear={false}
                    handleCloseSnack={this.handleCloseSnack} />
                < div >{
                    this.state.mostrarContenido &&
                    this.mostrarContenido()
                }
                </div>
                <DialogNotificationModal
                    {...this.state.openDialog}
                    handleClose={this.closeDialog}
                    handleOnClose={() => { }} />

            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    navegacion: obtenerControlesNavegacion(state),
    catalogosCaptura: getCatalogosCaptura(state),
    sessionRegistro: getSessionRegistro(state),
    datosCredito: getCreditData(state),
    busquedaPersona: getClientes(state),
});

const mapDispatchToProps = ({
    setActiveStep,
    setStepDisabled,
    fetchCatalogoEstados,
    fetchListaCatalogos,
    fetchCatalogoPaises,
    setSession,
    consultaValoresSession,
    setNextStep,
    setStepVisible,
    consultarPersonas,
    guardaXLMPrescore,
    obtenerIP,
    limpiarDatosCredito,
    limpiarBusquedaPersona,
    setClienteSelected,
    registraSolicitud,
    reset
})
export default connect(mapStateToProps, mapDispatchToProps)(StepperContainer);
