import { createAction } from "redux-actions";
import {
    VALIDA_POLITICAS_REGISTRO, GET_MODELO_BPM, VALIDA_ZONA_AUTORIZADA, ACTUALIZA_ASENTAMIENTO_PARTICULAR, ACTUALIZA_ASENTAMIENTO_EMPLEO,
    REGISTRA_SOLICITUD, SET_DATOS_PRESCORE, GUARDA_INFORMACION_XML_PRESCORE, VALIDA_PRESCORE, OBTENER_IP, RECHAZAR_SOLICITUD
} from './../../../constants/RegistroSolicitud/registroSolicitud';
import {
    urlValidarPoliticasRegistro, urlGetModeloBPM, urlValidaZonaAutorizada, urlRegistroSolicitud, urlGuardaInformacionPrescore, ulrValidaPrescore, urlObtnerIP, urlRechazoSolicitud
} from './../../../api/RegistroSolicitudes/urls';
import { consultaProductosGeneric, apiPost } from './../../../services/RegistroSolicitudes/index';



export const validaPoliticasRegistro = createAction(VALIDA_POLITICAS_REGISTRO, (request, notificacionClose) => consultaProductosGeneric(urlValidarPoliticasRegistro, request, notificacionClose)());
export const getModeloBPM = createAction(GET_MODELO_BPM, (request, notificacionClose) => consultaProductosGeneric(urlGetModeloBPM, request, notificacionClose)());
export const validarZonaAutorizada = createAction(VALIDA_ZONA_AUTORIZADA, (request, notificacionClose) => consultaProductosGeneric(urlValidaZonaAutorizada, request, notificacionClose)());
export const actualizarAsentamientoParticular = createAction(ACTUALIZA_ASENTAMIENTO_PARTICULAR, asentamientoParticular => asentamientoParticular);
export const actualizarAsentamientoEmpleo = createAction(ACTUALIZA_ASENTAMIENTO_EMPLEO, asentamientoEmpleo => asentamientoEmpleo);
export const setDatosPrescore = createAction(SET_DATOS_PRESCORE, datosPrescore => datosPrescore);
export const registraSolicitud = createAction(REGISTRA_SOLICITUD, (request, notificacionClose) => consultaProductosGeneric(urlRegistroSolicitud, request, notificacionClose)());
export const guardaXLMPrescore = createAction(GUARDA_INFORMACION_XML_PRESCORE, (solicitud, persona) => apiPost(urlGuardaInformacionPrescore, solicitud, persona)());
export const obtenerIP = createAction(OBTENER_IP, (request, notificacionClose) => consultaProductosGeneric(urlObtnerIP, request, notificacionClose)());
export const validarPrescore = createAction(VALIDA_PRESCORE, (request, notificacionClose) => consultaProductosGeneric(ulrValidaPrescore, request, notificacionClose)());
export const rechazarSolicitud = createAction(RECHAZAR_SOLICITUD, (request, notificacionClose) => consultaProductosGeneric(urlRechazoSolicitud, request, notificacionClose)());
