import { OBTENER_PERSONAS, SET_CLIENTES, SET_SELECTED_CLIENTE } from './../../../constants/RegistroSolicitud/registroSolicitud';
import { createAction } from "redux-actions";
import { urlConsultaPersona } from './../../../api/RegistroSolicitudes/urls'
import { consultaPersonas } from './../../../services/RegistroSolicitudes/index'


export const consultarPersonas = createAction(OBTENER_PERSONAS, (cliente, notificacionClose, errorNotification) => consultaPersonas(urlConsultaPersona, cliente, notificacionClose, errorNotification)());
export const setClientes = createAction(SET_CLIENTES, clientes => clientes);
export const setClienteSelected = createAction(SET_SELECTED_CLIENTE, cliente => cliente);






