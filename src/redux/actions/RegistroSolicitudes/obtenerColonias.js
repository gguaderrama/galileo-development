import { createAction } from "redux-actions";
import { CONSULTA_COLONIAS, CONSULTA_COLONIAS_EMPLEO } from './../../../constants/RegistroSolicitud/registroSolicitud';
import { urlConsultaColonias } from './../../../api/RegistroSolicitudes/urls';
import { consultaProductosGeneric } from './../../../services/RegistroSolicitudes/index'


export const consultaColonias = createAction(CONSULTA_COLONIAS, (request, notificacionClose) => consultaProductosGeneric(urlConsultaColonias, request, notificacionClose)());
export const consultaColoniasEmpleo = createAction(CONSULTA_COLONIAS_EMPLEO, (request, notificacionClose) => consultaProductosGeneric(urlConsultaColonias, request, notificacionClose)());
