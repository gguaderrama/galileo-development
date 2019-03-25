import { createAction } from "redux-actions";
import {
    CONSULTA_PRODUCTOS,
    CONSULTA_DESCRIPCION_PRODUCTOS,
    CONSULTA_PRODUCTOS_WS,
    LIMPIAR_DATOS_CREDITO
} from './../../../constants/RegistroSolicitud/registroSolicitud';
import {
    urlConsultaProductos, urlConsultaDescripcionProductos, urlConsultaProdWS
} from './../../../api/RegistroSolicitudes/urls'
import { consultaProductosGeneric } from './../../../services/RegistroSolicitudes/index'

export const consultaProductos = createAction(CONSULTA_PRODUCTOS, (request, notificacionClose) => consultaProductosGeneric(urlConsultaProductos, request, notificacionClose)());
export const consultaDescripcionProductos = createAction(CONSULTA_DESCRIPCION_PRODUCTOS, (request, notificacionClose) => consultaProductosGeneric(urlConsultaDescripcionProductos, request, notificacionClose)());
export const consultaProductosWS = createAction(CONSULTA_PRODUCTOS_WS, (request, notificacionClose) => consultaProductosGeneric(urlConsultaProdWS, request, notificacionClose)());
export const limpiarDatosCredito = createAction(LIMPIAR_DATOS_CREDITO, cliente => cliente)