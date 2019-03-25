import { createAction } from "redux-actions";
import {
    DELETE_DOMICILIO, DELETE_INTEGRANTE, AGREGA_DOMICILIO, ACTUALIZAR_INFORMACION_PERSONA, CALCULA_RFC, CONSULTA_CATALOGO_RELACIONES, UPDATE_DOMICILIO, SET_DATOS_CREDITO
} from './../../../constants/RegistroSolicitud/registroSolicitud';
import { urlCalculaRFC, urlConsultaRelaciones } from './../../../api/RegistroSolicitudes/urls';
import { consultaProductosGeneric } from './../../../services/RegistroSolicitudes/index'


export const eliminarIntegrante = createAction(DELETE_INTEGRANTE, integrante => integrante);
export const eliminarDomicilio = createAction(DELETE_DOMICILIO, domicilioID => domicilioID);
export const agregarDomicilio = createAction(AGREGA_DOMICILIO, domicilioID => domicilioID);
export const updateCliente = createAction(ACTUALIZAR_INFORMACION_PERSONA, cliente => cliente);
export const calculaRFC = createAction(CALCULA_RFC, (request) => consultaProductosGeneric(urlCalculaRFC, request, () => { })());
export const consultaCatalogoRelaciones = createAction(CONSULTA_CATALOGO_RELACIONES, (request) => consultaProductosGeneric(urlConsultaRelaciones, request, () => { })());
export const actualizarDomicilio = createAction(UPDATE_DOMICILIO, domicilioID => domicilioID);
export const setDatosCredito = createAction(SET_DATOS_CREDITO, datosSolcitud => datosSolcitud);
