import { SET_SESSION, CONSULTAR_VALORES, GET_ACCESS } from '../../../constants/Session';
import { createAction } from 'redux-actions';
import { urlConsultaValores } from './../../../api/RegistroSolicitudes/urls';
import { consultaProductosGeneric } from './../../../services/RegistroSolicitudes/index'
import { apiGet } from '../../../api/Session';
import {urlGetAccess} from '../../../api/Session/urls';

export const setSession = createAction(SET_SESSION, session => session);
export const consultaValoresSession = createAction(CONSULTAR_VALORES, (request, notificacionClose) => consultaProductosGeneric(urlConsultaValores, request, notificacionClose)());
//jjr
export const getAccess = createAction(GET_ACCESS, (access) => apiGet(`${urlGetAccess}?access=${access}`)());