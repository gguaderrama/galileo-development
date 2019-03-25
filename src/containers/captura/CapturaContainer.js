import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { CircularProgress, Button, DialogActions } from '@material-ui/core';
import { isValid, isDirty, formValueSelector } from 'redux-form';
import moment from 'moment';
import { getSolicitud,
    getDescripcionCatalogos,
    getPrimaSeguros,
    getDescripcionCodigo,
    getProductos,
    getContratoAnterior,
    getMontoPago } from '../../redux/selectors/captura/datosCaptura';
import { getIformularios } from '../../redux/selectors/captura/iformularios';
import { getReferenciasSeleccionadas } from '../../redux/selectors/captura/referencias';
import { getXmlValidoPdf } from '../../redux/selectors/captura/validarXmlSucursalPdf';
import { getOficina } from '../../redux/selectors/captura/oficina';
import { fetchSolicitudProductos, delIntegrante } from '../../redux/actions/captura/fetchSolicitud';
import { calculaMontoPago } from '../../redux/actions/captura/calculaMontoPago';
import { fetchValidarXmlSucursalPdf } from '../../redux/actions/captura/validarXmlSucursalPdf';
import DatosGeneralesCreditoComponent from '../../components/captura/DatosGeneralesCreditoComponent';
import DatosGeneralesSolicitudComponent from '../../components/captura/DatosGeneralesSolicitudComponent';
import MenuMapaComponent from '../../components/captura/MenuMapaComponent';
import CapturaExpansionComponent from '../../components/captura/CapturaExpansionComponent';
import Steper from '../../components/Generic/Steper';
import { fetchValidarZonaAutorizada } from '../../redux/actions/captura/validaZonaAutorizada';
import { fetchListaCatalogos, fetchCatalogoRelaciones } from '../../redux/actions/captura/catalogos';
import { getEvaluacionReferencias } from '../../redux/actions/captura/getEvaluacionReferencias';
import { consultarRfcCalculado } from '../../redux/actions/captura/consultarRfcCalculado';
import { validaForm } from '../../redux/actions/captura/validaForm';
import { postCapturaParcial } from '../../redux/actions/captura/xmlInterfaces';
import { getCatalogosCaptura } from '../../redux/selectors/captura/catalogos';
import { getIntegrantes, getReferencias, getListaClientes, getSeguros, } from '../../redux/selectors/captura/xmlInterfaces';
import { stepsCaptura, DIALOGO_NOTIFICACION_GUARDANDO, GUARDAR_XML_OK, GUARDAR_XML_ERROR } from '../../constants/captura';
import DialogoVisorExpedientes from '../../components/captura/DialogoVisorExpedientes';
import DialogoImprimirSolicitud from '../../components/captura/DialogoImprimirSolicitud';
import { DIALOGO_NOTIFICACION_INITIAL_STATE, DIALOGO_NOTIFICACION_CARGANDO } from '../../constants/Generic/index';
import DialogNotificationModal from 'App/_commons/components/DialogNotificationModal';
import SnackbarNotificacion from '../../components/Generic/SnackbarNotificacion';
import { urlGeneraCapturaPdf } from '../../api/urls';

class CapturaContainer extends Component {

    state = {
        esRangoPlazo: false,
        catalogoPlazos: [],
        openDialogoVisorExpedientes: false,
        openDialogoImprimirSolicitud: false,
        openDialog: {},
        urlPdfSolicitud: '',
        openSnackBar: false,
        snackbarNotificacion: {},
    }

    closeDialog = () => {
        this.setState({ openDialog: DIALOGO_NOTIFICACION_INITIAL_STATE })
    }

    openDialog = (mensaje) => {
        this.setState({ openDialog: mensaje })
    }

    handleOpenSnack = (snackbarNotificacion) => {
        this.setState({
            openSnackBar: true,
            snackbarNotificacion,
        });
    }

    handleCloseSnack = () => {
        this.setState({ openSnackBar: false });
    }

    handleOpenVisorExpedientes = () => {
        this.setState({
            openDialogoVisorExpedientes: true,
        })
    };

    handleCloseVisorExpedientes = () => {
        this.setState({
            openDialogoVisorExpedientes: false,
        })
    };

    handleOpenImprimirSolicitud = () => {
        const { solicitud } = this.props;
        const urlPdfSolicitud = `${urlGeneraCapturaPdf}?solicitud=${solicitud.solicitud}&cliente=${solicitud.cliente}&prod=${solicitud.codigoProducto}&frec=${solicitud.frecuenciaPago}&plazo=${solicitud.plazo}&monto=${solicitud.montoSolicitado}`;
        this.setState({
            openDialogoImprimirSolicitud: true,
            urlPdfSolicitud,
        })
    };

    handleCloseImprimirSolicitud = () => {
        this.setState({
            openDialogoImprimirSolicitud: false,
        })
    };

    componentDidMount() {
        let solicitud = {
            cliente: this.props.cliente,
            solicitud: this.props.noSolicitud
        }
        this.props.fetchSolicitudProductos(solicitud);
        this.props.fetchCatalogoRelaciones();

        let catalogos = [
            {"tipoCodigo":"NACI"},
            {"tipoCodigo":"VIVI"},
            {"tipoCodigo":"IDEN"},
            {"tipoCodigo":"ECIV"},
            {"tipoCodigo":"ESTU"},
            {"tipoCodigo":"FREC"},
            {"tipoCodigo":"RELEMP"},
            {"tipoCodigo":"TPOEST"},
            {"tipoCodigo":"LCOT"},
            {"tipoCodigo":"PLAN"},
            {"tipoCodigo":"PROVDR"},
            {"tipoCodigo":"TELE"},
            {"tipoCodigo":"TDOMI"},
            {"tipoCodigo":"VIVI"},
            {"tipoCodigo":"DEST"},
            {"tipoCodigo":"DIAPGS"},
            {"tipoCodigo":"TPDISP"},
            {"tipoCodigo":"CONT"}

        ];
        let listaCatalogos = {"listaCatalogos": catalogos}
        this.props.fetchListaCatalogos(listaCatalogos);
    };

    handleClickCapturaParcial = () => {
        const { solicitud,
            integrantes,
            postCapturaParcial,
            valuesDatosCredito,
            valuesDatosPersonales,
            valuesDatosEmpleo,
            catalogosCaptura,
            referenciasSeleccionadas,
            seguros,
             } = this.props;
        const persona = integrantes[0].persona;
        const { catalogoEstados, catalogoPaises } = catalogosCaptura;
        const descEstadoNacimiento = catalogoEstados ? catalogoEstados.find(estado => estado.codigoEstado === valuesDatosPersonales.codigoEstadoNacimiento).descripcion : '';
        const descPaisNacimiento = catalogoEstados ? catalogoPaises.find(pais => pais.codigoPais === valuesDatosPersonales.codigoPaisNacimiento).descripcion: '';
        const usuarioUltimaModificacion = "000010460662";
        const redesSocialesParticulares = [];
        const redSocial = {
            persona: solicitud.cliente,
            tipoRedSocial: "CORREO",
            direccionElectronica: valuesDatosPersonales.correo,
            status: 'N',
            origen: 'POC2.0',
            usuarioAlta: usuarioUltimaModificacion,
            usuarioUltimaModificacion: usuarioUltimaModificacion
        };
        if (valuesDatosPersonales.correo){
            redesSocialesParticulares.push(redSocial);
        }
        const modeloSolicitud = {
            solicitud: solicitud.solicitud,
            numeroIntegrantes: solicitud.numeroIntegrantes,
            cliente: solicitud.cliente,
            frecuenciaPago: solicitud.frecuenciaPago,
            usuarioRegistraSolicitud: usuarioUltimaModificacion,
            integrantes: [{
                "seguros": seguros
            }],
            tipoDisposicion:valuesDatosCredito.tipoDisposicion,
            oficinaDisposicion: valuesDatosCredito.oficinaDisposicion,
            diaPago: valuesDatosCredito.diaPago,
            oficina: {
                "oficina":solicitud.oficina.oficina,
            },
            medioContacto: valuesDatosCredito.medioContacto,
            submedioContacto: valuesDatosCredito.submedioContacto,
            banco: valuesDatosCredito.banco,
            numeroCuenta: valuesDatosCredito.numeroCuenta,
            clabe: valuesDatosCredito.clabe,
            codigoSectorCorresponsal: null,
            //capturaParcial: true,
            //datosCompletos: "N",
            codigoDestinoCredito:valuesDatosCredito.codigoDestinoCredito,
        };
        const modeloPersona = {
            ...valuesDatosPersonales,
            ...valuesDatosEmpleo,
            fechaNacimiento: moment(persona.fechaNacimiento, 'YYYY-MM-DD').format('DD/MM/YYYY'),
            persona: persona.persona,
            usuarioUltimaModificacion:usuarioUltimaModificacion,
            calificacion: persona.calificacion,
            redesSocialesParticulares:redesSocialesParticulares,
            descEstadoNacimiento:descEstadoNacimiento,
            clienteFinanciera:null,
            descPaisNacimiento:descPaisNacimiento,
            ciclo:0,
            referencias:referenciasSeleccionadas,
            domiciliosParticulares: persona.domiciliosParticulares,
            telefonosParticulares: persona.telefonosParticulares,
            dondeCotiza:valuesDatosEmpleo.tipoCotizacion,
            puestoJefe:valuesDatosEmpleo.areaPuestoJefe,
            pensionado:"N",
            aniosAntiguedadTrabajo:"0",
            mesesAntiguedadTrabajo:"10",
            codigoActividadEmpresa:"",
            negocioPropio:null,
            plazo:valuesDatosCredito.plazo,
            monto:valuesDatosCredito.efectivoOtorgado,
            frecuenciaPago:valuesDatosCredito.frecuenciaPago,
            funcionarioPublico:valuesDatosCredito.funcionarioPublico,
            parienteFuncionarioPublico:valuesDatosCredito.parienteFuncionarioPublico,
        };
        modeloPersona.correo && delete modeloPersona.correo;
        console.log('modeloPersona', modeloPersona);

        const params = `persona=${encodeURIComponent(JSON.stringify(modeloPersona))}&solicitud=${encodeURIComponent(JSON.stringify(modeloSolicitud))}`
        console.log('params', params);
        this.openDialog(DIALOGO_NOTIFICACION_GUARDANDO);
        postCapturaParcial(params, this.closeDialog).then(result => {
            if (result.payload.statusText === 'OK')
                this.handleOpenSnack(GUARDAR_XML_OK);
            else
                this.handleOpenSnack(GUARDAR_XML_ERROR);
        });
    }

    calculaMontoPago = () => {
        const { solicitud, contratoAnterior, productos, oficina } = this.props;
        const tipoCredito = contratoAnterior.contratoAnterior.consecutivo === 0 ? 'N' : 'R';
        const producto = productos.find(producto => producto.producto === solicitud.codigoProducto);
        const solicitudMontoPago = {
            "solicitud":solicitud.solicitud,
            "oficina":{
               "oficina":oficina.sucursal,
               "iva":oficina.iva,
               "esFrontera":oficina.esFrontera,
            },
            "segmento":solicitud.segmento,
            "categoria":solicitud.categoria,
            "codigoProducto":solicitud.codigoProducto,
            "tipoProducto":solicitud.tipoProducto,
            "frecuenciaPago":solicitud.frecuenciaPago,
            "montoSolicitado":solicitud.montoSolicitado,
            "efectivoSolicitado":solicitud.efectivoSolicitado,
            "efectivoOtorgado":solicitud.efectivoOtorgado,
            "montoOtorgado":solicitud.montoOtorgado,
            "plazo":solicitud.plazo,
            "tasa":solicitud.tasa,
            "tipoCredito":tipoCredito,
            "integrantes":[
               {
                  "persona":{
                     "idRelacionPersonaVive":"0",
                     "nivelCliente":producto.nivelCliente,
                     "grupoRenovacion":producto.grupoRenovacion
                  },
                  "montoSeguro":0,
                  "efectivoOtorgado":solicitud.integrantes[0].efectivoOtorgado,
                  "montoOtorgado":solicitud.integrantes[0].montoOtorgado,
                  "solicitud":solicitud.integrantes[0].solicitud,
                  "comisionApertura":"0",
                  "ivaComisionApertura":"0",
                  "cliente":solicitud.integrantes[0].cliente,
                  "numeroIntegrante":solicitud.numeroIntegrantes
               }
            ],
            "claveCorresponsal":solicitud.claveCorresponsal || null,
            "nivelClienteAnalisis":producto.nivelCliente,
            "grupoRenovacionAnalisis":producto.grupoRenovacion
         };
         this.openDialog(DIALOGO_NOTIFICACION_CARGANDO);
         this.props.calculaMontoPago(solicitudMontoPago, this.closeDialog);
         this.ValidarXmlSucursalPdf();
    }

    ValidarXmlSucursalPdf = () => {
        const { solicitud, } = this.props;
        const solicitudPdf = {
            "solicitud": solicitud.solicitud,
            "cliente": solicitud.cliente,
            "numeroIntegrantes": solicitud.numeroIntegrantes,
            "integrantes":[{
                "seguros":[],
                "numeroIntegrante":solicitud.numeroIntegrantes}
            ]
        };
        this.props.fetchValidarXmlSucursalPdf(solicitudPdf);
    }

    render() {
        const { dirtyDatosCredito,
            validDatosCredito,
            solicitud,
            integrantes,
            iformularios,
            delIntegrante,
            descripcionCatalogos,
            primaSeguros,
            seguros,
            listaClientes,
            catalogosCaptura,
            valuesDatosCredito,
            valuesDatosPersonales,
            valuesDatosEmpleo,
            validaForm,
            tipoAnalisis,
            productos,
            contratoAnterior,
            fetchValidarZonaAutorizada,
            getEvaluacionReferencias,
            consultarRfcCalculado,
            referenciasSeleccionadas,
            noSolicitud,
            montoPago,
            oficina,
            xmlValidoPdf } = this.props;
        return (
            <div>
            { solicitud && integrantes && catalogosCaptura && descripcionCatalogos  && iformularios && primaSeguros && tipoAnalisis && productos && contratoAnterior ?
                <Grid fluid>
                    <Row start="xs">
                        <Col xs={11} md={11}>
                            <Steper
                                opciones={stepsCaptura}
                                opcionActiva={0}
                                nonLinear={false}
                                handleOnChange={null}
                                titulo={'Captura de solicitud'}
                            />
                        </Col>
                        <Col xs={1} md={1}>
                            <MenuMapaComponent handleOpenVisorExpedientes={this.handleOpenVisorExpedientes}/>
                        </Col>
                    </Row>
                    <Row top="xs" >
                        <Col xs={12} md={8} >
                            <CapturaExpansionComponent
                                solicitud={solicitud}
                                iformularios={iformularios}
                                delIntegrante={delIntegrante}
                                descripcionCatalogos={descripcionCatalogos}
                                integrantes={integrantes}
                                primaSeguros={primaSeguros}
                                seguros={seguros}
                                listaClientes={listaClientes}
                                dirtyDatosCredito={dirtyDatosCredito}
                                validDatosCredito={validDatosCredito}
                                valuesDatosCredito={valuesDatosCredito}
                                valuesDatosPersonales={valuesDatosPersonales}
                                valuesDatosEmpleo={valuesDatosEmpleo}
                                validaForm={validaForm}
                                handleSelectProducto={this.handleSelectProducto}
                                fetchValidarZonaAutorizada={fetchValidarZonaAutorizada}
                                getEvaluacionReferencias={getEvaluacionReferencias}
                                consultarRfcCalculado={consultarRfcCalculado}
                                referenciasSeleccionadas={referenciasSeleccionadas}
                                rutaValijaLiberacion={oficina.configuracion.rutaValijaLiberacion}
                                closeDialog={this.closeDialog}
                                openDialog={this.openDialog}
                                {...catalogosCaptura}
                                ></CapturaExpansionComponent>
                            <DialogActions>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="button"
                                    onClick={this.handleOpenImprimirSolicitud}
                                    disabled={xmlValidoPdf !== 'V'} >
                                    Imprimir solicitud
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="button"
                                    onClick={this.handleClickCapturaParcial} >
                                    Captura parcial
                                </Button>
                            </DialogActions>
                        </Col>
                        <Col xs={12} md={4}>
                            <DatosGeneralesSolicitudComponent {...solicitud} {...integrantes[0]}></DatosGeneralesSolicitudComponent>
                            <DatosGeneralesCreditoComponent {...solicitud} descTipoAnalisis={tipoAnalisis} calculaMontoPago={this.calculaMontoPago} montoPago={montoPago}></DatosGeneralesCreditoComponent>
                        </Col>
                    </Row>
                    <DialogoImprimirSolicitud
                        urlPdf={this.state.urlPdfSolicitud}
                        open={this.state.openDialogoImprimirSolicitud}
                        onClose={this.handleCloseImprimirSolicitud} />
                    <DialogoVisorExpedientes
                        open={this.state.openDialogoVisorExpedientes}
                        onClose={this.handleCloseVisorExpedientes}
                        solicitud={noSolicitud}
                        oficina={solicitud.oficina.oficina}
                        empresa={solicitud.oficina.claveEmpresa} />
                </Grid> :
                <CircularProgress size={50} />
            }
                <DialogNotificationModal
                    {...this.state.openDialog}
                    opened={false}
                    content=""
                    handleClose={this.closeDialog}
                    handleOnClose={this.closeDialog} />
                <SnackbarNotificacion
                    {...this.state.snackbarNotificacion}
                    opened={this.state.openSnackBar}
                    onClose={this.handleCloseSnack}>
                </SnackbarNotificacion>
            </div>
        );
    }
}


CapturaContainer.propTypes = {
    noSolicitud: PropTypes.string.isRequired,
    cliente: PropTypes.string.isRequired,
    fetchSolicitudProductos: PropTypes.func.isRequired,
    solicitud: PropTypes.object,
    iformularios: PropTypes.array,
    integrantes: PropTypes.array,
};

CapturaContainer.defaultProps = {
    solicitud: null,
    iformularios: null,
};

const selectorDatosCredito = formValueSelector('DatosCredito');
const selectorDatosPersonales = formValueSelector('DatosPersonales');
const selectorDatosEmpleo = formValueSelector('DatosEmpleo');

const mapStateToProps = state => {
    const valuesDatosCredito = selectorDatosCredito(state,
        'tipoProducto',
        'categoria',
        'codigoProducto',
        'frecuenciaPago',
        'plazo',
        'tasa',
        'efectivoOtorgado',
        'codigoDestinoCredito',
        'medioContacto',
        'contratoRecomienda',
        'funcionarioPublico',
        'parienteFuncionarioPublico',
        'oficinaDisposicion',
        'diaPago',
        'tipoDisposicion',
        'banco',
        'numeroCuenta',
        'clabe',
        'domiciliacion',
        'bancoDomiciliacion',
        'numeroCuentaDomiciliacion',
        'clabeDomiciliacion');
    const valuesDatosPersonales = selectorDatosPersonales(state,
            'nombre',
            'apellidoPaterno',
            'apellidoMaterno',
            'fechaNacimiento',
            'rfcCapturado',
            'rfcCalculado',
            'nacionalidad',
            'codigoEstadoNacimiento',
            'curp',
            'codigoIdentificacion',
            'gradoEstudio',
            'codigoPaisNacimiento',
            'numeroDependientes',
            'correo',
            'estadoCivil',
            'sexo',
            'tiempo');
        const valuesDatosEmpleo = selectorDatosEmpleo(state,
            'nombreEmpresa',
            'razonSocialEmpresa',
            'egresos',
            'frecuenciaCobro',
            'fechaIngresoEmpresa',
            'tipoEmpleado',
            'grupoEmpleado',
            'codigoRelacionEmpresa',
            'objetoVentaEmpresa',
            'codigoEstablecimiento',
            'rfcEmpresa',
            'ingresos',
            'otrosIngresos',
            'numeroEmpleadoEmpresa',
            'nss',
            'tipoContrato',
            'nombreJefe',
            'apellidoPaternoJefe',
            'apellidoMaternoJefe',
            'areaPuestoJefe',
            'tipoCotizacion',
            'codigoGiroEmpresa',
            'codigoPuestoOcupacion',
            );
    const solicitud = getSolicitud(state);
    const tipoAnalisis = solicitud && getDescripcionCodigo(solicitud.tipoAnalisis)(state);
    return ({
        //persona: getPersona(state),
        integrantes: getIntegrantes(state),
        iformularios: getIformularios(state),
        catalogosCaptura: getCatalogosCaptura(state),
        descripcionCatalogos: getDescripcionCatalogos(state),
        solicitud,
        primaSeguros: getPrimaSeguros(state),
        seguros: getSeguros(state),
        listaClientes: getListaClientes(state),
        dirtyDatosCredito: isDirty('DatosCredito')(state),
        validDatosCredito: isValid('DatosCredito')(state),
        valuesDatosCredito,
        valuesDatosPersonales,
        valuesDatosEmpleo,
        tipoAnalisis,
        productos: getProductos(state),
        contratoAnterior: getContratoAnterior(state),
        referencias: getReferencias(state),
        referenciasSeleccionadas: getReferenciasSeleccionadas(state),
        montoPago: getMontoPago(state),
        oficina: getOficina(state),
        xmlValidoPdf: getXmlValidoPdf(state),
    })
};

export default withRouter(connect(mapStateToProps,
    {
        fetchSolicitudProductos,
        fetchCatalogoRelaciones,
        delIntegrante,
        fetchListaCatalogos,
        fetchValidarZonaAutorizada,
        getEvaluacionReferencias,
        consultarRfcCalculado,
        validaForm,
        postCapturaParcial,
        calculaMontoPago,
        fetchValidarXmlSucursalPdf,
        })(CapturaContainer));
