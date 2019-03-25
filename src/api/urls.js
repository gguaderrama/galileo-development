//QA
const urlBaseOtorgamiento = "http://10.1.44.117:8080/OtorgamientoCreditoWeb/rest/";
const urlBaseGenerarCaptura = "http://10.1.44.117:8080/AdministracionSolicitudesWeb/";
const urlBaseAdministracion = `${urlBaseGenerarCaptura}rest/`;
//Desarrollo
// const urlBaseOtorgamiento = "http://10.6.1.110:7011/OtorgamientoCreditoWeb/rest/";
// const urlBaseAdministracion = "http://10.6.1.110:7011/AdministracionSolicitudesWeb/rest/";

export const urlSolicitud = `${urlBaseOtorgamiento}reactivacion/consultarSolicitud`;
export const urlConsultarPersonaCambio = `${urlBaseOtorgamiento}reactivacion/consultarPersonaCambio`;
export const urlConsultarProductosWS = `${urlBaseOtorgamiento}reactivacion/consultarProductosWS`;
export const urlObtenCodigoFormatoFolio = `${urlBaseOtorgamiento}reactivacion/obtenCodigoFormatoFolio`;
export const urlConsultarDetalleReactivacion = `${urlBaseOtorgamiento}reactivacion/consultarDetalleReactivacion`;
export const urlValidarXmlSucursalPdf = `${urlBaseOtorgamiento}reactivacion/validarXmlSucursalPdf`;

export const urlConsultarDatosContratoAnterior = `${urlBaseOtorgamiento}solicitud/consultarDatosContratoAnterior`;
export const urlConsultarProductos = `${urlBaseOtorgamiento}solicitud/consultarProductos`;
//export const urlConsultarProductos = `http://10.6.1.110:7011/OtorgamientoCreditoWeb/rest/solicitud/consultarProductos`;
export const urlConsultarDescripcionCatalogos = `${urlBaseOtorgamiento}solicitud/consultarDescripcionCatalogos`;
//export const urlConsultarDescripcionCatalogos = `http://10.6.1.110:7011/OtorgamientoCreditoWeb/rest/solicitud/consultarDescripcionCatalogos`;
export const urlConsultaPrimaSeguros = `${urlBaseOtorgamiento}solicitud/consultaPrimaSeguros`;

// export const urlObtenerCamposAOcultarEnVista = `${urlBaseAdministracion}impresionSolicitudes/obtenerCamposAOcultarEnVistaFromDrools`;
export const urlObtenerCamposAOcultarEnVista = `http://10.6.1.110:7011/AdministracionSolicitudesWeb/rest/impresionSolicitudes/obtenerCamposAOcultarEnVistaFromDrools`;
export const urlConsultarPersona = `${urlBaseAdministracion}impresionSolicitudes/consultarPersona`;
export const urlConsultarCatalogoRelaciones = `${urlBaseAdministracion}impresionSolicitudes/consultarCatalogoRelaciones`;
export const urlConsultarPaises = `${urlBaseAdministracion}impresionSolicitudes/consultarCatalogoPaises`;
export const urlConsultarCatalogos = `${urlBaseOtorgamiento}impresionSolicitudes/consultarCatalogo`;
export const urlConsultarListaCatalogos = `${urlBaseOtorgamiento}impresionSolicitudes/getListaCatalogos`;
export const urlConsultarCatalogoGiros = `${urlBaseAdministracion}impresionSolicitudes/consultarCatalogoGiros`;
export const urlConsultarOficinas = `${urlBaseAdministracion}impresionSolicitudes/consultarOficinas`;
export const urlConsultarRelacionesBeneficiarios = `${urlBaseAdministracion}impresionSolicitudes/consultarRelacionesBeneficiarios`;
export const urlConsultarSolicitudXMLInterfaces = `${urlBaseAdministracion}impresionSolicitudes/consultarSolicitudXMLInterfaces`;
export const urlConsultarMediosSubmediosContacto = `${urlBaseAdministracion}impresionSolicitudes/consultarMediosSubmediosContacto`;
export const urlGuardarInformacionXML = `${urlBaseAdministracion}impresionSolicitudes/guardarInformacionXML`;
export const urlValidarZonaAutorizada = `${urlBaseAdministracion}impresionSolicitudes/validarZonaAutorizada`;
export const urlConsultarPuestos = `${urlBaseAdministracion}impresionSolicitudes/consultarPuestos`;
export const urlGetEvaluacionReferencias = `${urlBaseAdministracion}impresionSolicitudes/getEvaluacionReferencias`;
export const urlConsultarRfcCalculado = `${urlBaseAdministracion}impresionSolicitudes/consultarRfcCalcualdo`;
export const urlGeneraCapturaPdf = `${urlBaseGenerarCaptura}GenerarCapturaPdf`;

export const urlConsultarEstados = `${urlBaseOtorgamiento}asentamientos/consultarCiudades`;
export const urlConsultarColonias = `${urlBaseOtorgamiento}asentamientos/consultarColonias`;

export const urlConsultarImagenesVisor = `${urlBaseOtorgamiento}visorExpedientes/consultarImagenesVisor`;
export const urlObtenerRutaCoa = `${urlBaseOtorgamiento}visorExpedientes/obtenerRutaCoa`;

export const urlValidarOficinaConfiguracion = `${urlBaseOtorgamiento}registroAnalisis/validarOficinaConfiguracion`;
