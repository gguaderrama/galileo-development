import { createAction } from "redux-actions";
import { CONSULTA_CONTRATO_ANT, CONSULTA_POLITICAS_RENOVACION_X_CLIENTE } from './../../../constants/RegistroSolicitud/registroSolicitud';
import { urlConsultaContratoAnt, urlPoliticasRenovacionXCliente } from './../../../api/RegistroSolicitudes/urls';
import { consultaProductosGeneric } from './../../../services/RegistroSolicitudes/index'

export const consultaContratoAnterior = createAction(CONSULTA_CONTRATO_ANT, (request, notificacionClose) =>
    consultaProductosGeneric(urlConsultaContratoAnt, request, notificacionClose)());
export const consultaPoliticaRenovacionCliente = createAction(CONSULTA_POLITICAS_RENOVACION_X_CLIENTE, (request, notificacionClose) =>
    consultaProductosGeneric(urlPoliticasRenovacionXCliente, request, notificacionClose)());
