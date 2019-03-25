import { urlAdministracionSolicitudes, urlOtorgamiento } from './index';

//consultar persona
export const urlConsultaPersona = `${urlOtorgamiento}impresionSolicitudes/consultarPersona`;
//obtener formatos Drools
export const urlConsultaFoliosDrools = `${urlOtorgamiento}solicitud/getFormatosSolicitudDrools?formato=`;
//Generar Folio
export const urlGeneraFolio = `${urlOtorgamiento}folios/getFolioSolicitud?folioModel=`;
//Validar Folio
export const urlValidateFolio = `${urlOtorgamiento}solicitud/validarFolio?folio=`;
//Consultar vendedores
export const urlConsultaVendedores = `${urlOtorgamiento}solicitud/consultarVendedores?Oficina=`;
//consulta productos
export const urlConsultaProductos = `${urlOtorgamiento}solicitud/consultarProductos?folio=`;
//consulta descripcion
export const urlConsultaDescripcionProductos = `${urlOtorgamiento}solicitud/consultarDescripcionCatalogos?claveEmpresa=`;
//consulta Productos WS
export const urlConsultaProdWS = `${urlOtorgamiento}solicitud/consultarProductosWS?solicitud=`;
//URl consultaSeguros
export const urlSeguros = `${urlOtorgamiento}solicitud/consultaPrimaSeguros?seguros=`;
//URL calcula monto pago
export const urlCalculaMontoPago = `${urlOtorgamiento}solicitud/calculcaMontoPago?solicitud=`;
//URL obtener tipoAnalisis 
export const urlObtenerTipoAnalisis = `${urlOtorgamiento}solicitud/obtenTipoAnalisis?solicitud=`;
//URL consultaColonias
export const urlConsultaColonias = `${urlOtorgamiento}solicitud/consultarColonias?asentamientos=`;
//URL consultaContratoAnt
export const urlConsultaContratoAnt = `${urlOtorgamiento}solicitud/consultarDatosContratoAnterior?contrato=`;
//URL politicasRenovacionCliente
export const urlPoliticasRenovacionXCliente = `${urlOtorgamiento}solicitud/validarPoliticasRenovacionPorCliente?solicitud=`;
//URL consultaValores
export const urlConsultaValores = `${urlOtorgamiento}session/consultarValores?session=`;
//URL calcula RFC
export const urlCalculaRFC = `${urlOtorgamiento}solicitud/calcularRFC?jsonPersona=`;
//url consulta relaciones
export const urlConsultaRelaciones = `${urlAdministracionSolicitudes}impresionSolicitudes/consultarCatalogoRelaciones?catalogo=`;
//URL validarStatusXML
export const urlValidarStatusXML = `${urlOtorgamiento}solicitud/validarStatusXMLPrescore?solicitud=`;
//URL validarPoliticasRegistro
export const urlValidarPoliticasRegistro = `${urlOtorgamiento}solicitud/validarPoliticasRegistroSolicitud?solicitud=`;
// getModeloBPM
export const urlGetModeloBPM = `${urlOtorgamiento}solicitud/getModeloBPM?modeloBPM=`;
// validarZonaAutorizada
export const urlValidaZonaAutorizada = `${urlOtorgamiento}solicitud/validarZonaAutorizada?solicitud=`;
//registra solicitud
export const urlRegistroSolicitud = `${urlOtorgamiento}solicitud/registrarSolicitud?solicitud=`;
// consultaCorresponsales
export const urlConsultaCorresponsales = `${urlOtorgamiento}solicitud/consultarCorresponsales?corresponsal=`;
// consultar tipo disposicion 
export const urlConsultarTipoDisposicion = `${urlOtorgamiento}solicitud/consultarTiposDisposicion?codigo=`;
// guardarInformacionXML
export const urlGuardaInformacionPrescore = `${urlOtorgamiento}impresionSolicitudes/guardarInformacionXMLPrescore`;
// obtenerIp
export const urlObtnerIP = `${urlOtorgamiento}session/getIp?oficina=`;
// ulrValidaPRescore
export const ulrValidaPrescore = `${urlOtorgamiento}solicitud/validarPrescore?solicitud=`;

//url rechazoSolicitud
export const urlRechazoSolicitud=`${urlOtorgamiento}solicitud/registrarRechazoSolicitud?solicitud=`;


/*
import { urlAdministracionSolicitudes, urlOtorgamiento, urlAdministracionSolicitudesDevelop, urlOtorgamientoDevelop } from './index';
//consultar persona
export const urlConsultaPersona = `${urlAdministracionSolicitudesDevelop}impresionSolicitudes/consultarPersona`;
//obtener formatos Drools
export const urlConsultaFoliosDrools = `${urlOtorgamientoDevelop}solicitud/getFormatosSolicitudDrools?formato=`;
//Generar Folio
export const urlGeneraFolio = `${urlOtorgamientoDevelop}folios/getFolioSolicitud?folioModel=`;
//Validar Folio
export const urlValidateFolio = `${urlOtorgamientoDevelop}solicitud/validarFolio?folio=`;
//Consultar vendedores
export const urlConsultaVendedores = `${urlOtorgamientoDevelop}solicitud/consultarVendedores?Oficina=`;
//consulta productos
export const urlConsultaProductos = `${urlOtorgamientoDevelop}solicitud/consultarProductos?folio=`;
//consulta descripcion
export const urlConsultaDescripcionProductos = `${urlOtorgamientoDevelop}solicitud/consultarDescripcionCatalogos?claveEmpresa=`;
//consulta Productos WS
export const urlConsultaProdWS = `${urlOtorgamientoDevelop}solicitud/consultarProductosWS?solicitud=`;
//URl consultaSeguros
export const urlSeguros = `${urlOtorgamientoDevelop}solicitud/consultaPrimaSeguros?seguros=`;
//URL calcula monto pago
export const urlCalculaMontoPago = `${urlOtorgamientoDevelop}solicitud/calculcaMontoPago?solicitud=`;
//URL obtener tipoAnalisis 
export const urlObtenerTipoAnalisis = `${urlOtorgamientoDevelop}solicitud/obtenTipoAnalisis?solicitud=`;
//URL consultaColonias
export const urlConsultaColonias = `${urlOtorgamientoDevelop}solicitud/consultarColonias?asentamientos=`;
//URL consultaContratoAnt
export const urlConsultaContratoAnt = `${urlOtorgamientoDevelop}solicitud/consultarDatosContratoAnterior?contrato=`;
//URL politicasRenovacionCliente
export const urlPoliticasRenovacionXCliente = `${urlOtorgamientoDevelop}solicitud/validarPoliticasRenovacionPorCliente?solicitud=`;
//URL consultaValores
export const urlConsultaValores = `${urlOtorgamientoDevelop}session/consultarValores?session=`;
//URL calcula RFC
export const urlCalculaRFC = `${urlOtorgamiento}solicitud/calcularRFC?jsonPersona=`;
//url consulta relaciones
export const urlConsultaRelaciones = `${urlAdministracionSolicitudes}impresionSolicitudes/consultarCatalogoRelaciones?catalogo=`;
*/