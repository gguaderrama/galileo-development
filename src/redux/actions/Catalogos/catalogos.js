import { urlObtenerOficinas, urlConsultaCampanias, urlConsultaCampaniasPeriodo, urlConsultaVendedoresOficina, urlConsultaPersonas, urlConsultaArbolCampanias, urlConsultaProspectos, urlGenerarGestionProspecto, urlConsultaMapaJNDI, urlAgregarTelefonosPersona, urlConsultaCampaniasProspectoGestionesCitas, urlGenerarCierreCita } from '../../../api/GestionAsignacionProspectos/urls';
import { FETCH_OFICINAS, FETCH_CAMPANIAS, FETCH_PERIODOS, FETCH_PERSONA, FETCH_GESTORES, FETCH_ARBOL_CAMPANIAS, SET_GESTORES, SET_ARBOL_CAMPANIAS, FETCH_PROSPECTOS, SET_PROSPECTOS, POST_GENERAR_GESTION_PROSPECTO, FETCH_MAPA_JNDI, POST_AGREGAR_TELEFONOS_PERSONA, FETCH_CITAS, POST_GENERAR_CIERRE_CITA } from '../../../constants/Catalogos';
import { apiPost } from '../../../api/GestionAsignacionProspectos';
import { createAction } from 'redux-actions';

export const fetchMapaJNDI = createAction(FETCH_MAPA_JNDI, (params, notificacionClose) => apiPost(urlConsultaMapaJNDI, params, notificacionClose)());

export const fetchOficinas = createAction(FETCH_OFICINAS, (params, notificacionClose) => apiPost(urlObtenerOficinas, params, notificacionClose)());
export const fetchCampanias = createAction(FETCH_CAMPANIAS, (params, notificacionClose) => apiPost(urlConsultaCampanias, params, notificacionClose)());
export const fetchPeriodos = createAction(FETCH_PERIODOS, (params, notificacionClose) => apiPost(urlConsultaCampaniasPeriodo, params, notificacionClose)());
export const fetchPersona = createAction(FETCH_PERSONA, (params, notificacionClose) => apiPost(urlConsultaPersonas, params, notificacionClose)());
export const fetchGestores = createAction(FETCH_GESTORES, (params, notificacionClose) => apiPost(urlConsultaVendedoresOficina, params, notificacionClose)());
export const fetchArbolCampanias = createAction(FETCH_ARBOL_CAMPANIAS, (params, notificacionClose) => apiPost(urlConsultaArbolCampanias, params, notificacionClose)());
export const fetchProspectos = createAction(FETCH_PROSPECTOS, (params, notificacionClose) => apiPost(urlConsultaProspectos, params, notificacionClose)());
export const fetchCitas = createAction(FETCH_CITAS, (params, notificacionClose) => apiPost(urlConsultaCampaniasProspectoGestionesCitas, params, notificacionClose)());
export const setGestores = createAction(SET_GESTORES, gestores => gestores);
export const setArbolCampanias = createAction(SET_ARBOL_CAMPANIAS, arbolCampanias => arbolCampanias);
export const setProspectos = createAction(SET_PROSPECTOS, prospectos => prospectos);
export const postGenerarGestionProspecto = createAction(POST_GENERAR_GESTION_PROSPECTO, (params, notificacionClose) => apiPost(urlGenerarGestionProspecto, params, notificacionClose)());
export const postGenerarCierreCita = createAction(POST_GENERAR_CIERRE_CITA, (params, notificacionClose) => apiPost(urlGenerarCierreCita, params, notificacionClose)());
export const postAgregarTelefonosPersona = createAction(POST_AGREGAR_TELEFONOS_PERSONA, (params, notificacionClose) => apiPost(urlAgregarTelefonosPersona, params, notificacionClose)());