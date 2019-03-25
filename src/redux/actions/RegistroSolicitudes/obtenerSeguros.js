import { createAction } from "redux-actions";
import { CONSULTA_SEGUROS, CALCULA_MONTO_PAGO, OBTEN_TIPO_ANALISIS, CALCULA_MONTO_PAGO_SIN_SEGURO } from './../../../constants/RegistroSolicitud/registroSolicitud';
import { urlSeguros, urlCalculaMontoPago, urlObtenerTipoAnalisis } from './../../../api/RegistroSolicitudes/urls';
import { consultaProductosGeneric } from './../../../services/RegistroSolicitudes/index'

export const consultaPrimaSeguros = createAction(CONSULTA_SEGUROS, (request, notificacionClose) => consultaProductosGeneric(urlSeguros, request, notificacionClose)());
export const calculaMontoPago = createAction(CALCULA_MONTO_PAGO, (request, notificacionClose) => consultaProductosGeneric(urlCalculaMontoPago, request, notificacionClose)());
export const calculaMontoPagoSinSeguro = createAction(CALCULA_MONTO_PAGO_SIN_SEGURO, (request, notificacionClose) => consultaProductosGeneric(urlCalculaMontoPago, request, notificacionClose)());
export const obtenerTipoAnalisis = createAction(OBTEN_TIPO_ANALISIS, (reques, notificacionClose) => consultaProductosGeneric(urlObtenerTipoAnalisis, reques, notificacionClose)());