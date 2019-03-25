import { createAction } from "redux-actions";
import {
    CONSULTA_FORMATOS, GENERA_FOLIO, VALIDA_FOLIO, CONSULTA_VENDEDORES, VALIDA_XML_PRESCORE, CONSULTA_CORRESPONSALES, CONSULTA_TIPOS_DISPOSICION
} from 'constants/RegistroSolicitud/registroSolicitud';
import {
    urlConsultaFoliosDrools, urlGeneraFolio, urlValidateFolio, urlConsultaVendedores, urlValidarStatusXML, urlConsultaCorresponsales, urlConsultarTipoDisposicion
} from 'api/RegistroSolicitudes/urls'
import { consultaProductosGeneric } from 'services/RegistroSolicitudes/index'


export const consultaMenu = createAction(CONSULTA_FORMATOS, (request, notificacionClose) => consultaProductosGeneric(urlConsultaFoliosDrools, request, notificacionClose)());
export const generaFolio = createAction(GENERA_FOLIO, (request, notificacionClose) => consultaProductosGeneric(urlGeneraFolio, request, notificacionClose)());
export const validarFolio = createAction(VALIDA_FOLIO, (request, notificacionClose) => consultaProductosGeneric(urlValidateFolio, request, notificacionClose)());
export const consultaVendores = createAction(CONSULTA_VENDEDORES, (request, notificacionClose) => consultaProductosGeneric(urlConsultaVendedores, request, notificacionClose)());
export const validaXMLPrescore = createAction(VALIDA_XML_PRESCORE, (request, notificacionClose) => consultaProductosGeneric(urlValidarStatusXML, request, notificacionClose)());
//MÁS NÓMINA
export const consultaCorresponsales = createAction(CONSULTA_CORRESPONSALES, (request, notificacionClose) => consultaProductosGeneric(urlConsultaCorresponsales, request, notificacionClose)());
export const consultaTipoDisposicion = createAction(CONSULTA_TIPOS_DISPOSICION, (request, notificacionClose) => consultaProductosGeneric(urlConsultarTipoDisposicion, request, notificacionClose)());