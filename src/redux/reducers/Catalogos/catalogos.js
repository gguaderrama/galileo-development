import { handleActions } from 'redux-actions';
import { FETCH_OFICINAS, FETCH_CAMPANIAS, FETCH_PERIODOS, FETCH_GESTORES, FETCH_PERSONA, SET_GESTORES, FETCH_ARBOL_CAMPANIAS, SET_ARBOL_CAMPANIAS, FETCH_PROSPECTOS, SET_PROSPECTOS, POST_GENERAR_GESTION_PROSPECTO, FETCH_MAPA_JNDI, POST_AGREGAR_TELEFONOS_PERSONA, FETCH_CITAS, POST_GENERAR_CIERRE_CITA } from '../../../constants/Catalogos';

export const catalogos = handleActions({
    [FETCH_MAPA_JNDI]: (state, action) => ({ ...state, mapaJNDI: action.payload.payload }),
    [FETCH_OFICINAS]: (state, action) => ({ ...state, oficinas: action.payload.map(oficina => ({ oficina: oficina.oficina, nombre: oficina.nombre })) }),
    [FETCH_CAMPANIAS]: (state, action) => ({ ...state, campanias: action.payload }),
    [FETCH_PERIODOS]: (state, action) => ({ ...state, periodos: action.payload }),
    [FETCH_PERSONA]: (state, action) => ({ ...state, persona: action.payload }),
    [FETCH_GESTORES]: (state, action) => ({ ...state, gestores: action.payload.payload }),
    [FETCH_ARBOL_CAMPANIAS]: (state, action) => ({ ...state, arbolCampanias: action.payload.payload }),
    [FETCH_PROSPECTOS]: (state, action) => ({ ...state, prospectos: action.payload.payload }),
    [FETCH_CITAS]: (state, action) => ({ ...state, citas: action.payload.payload.citas }),
    [SET_GESTORES]: (state, action) => ({ ...state, gestores: action.payload }),
    [SET_ARBOL_CAMPANIAS]: (state, action) => ({ ...state, arbolCampanias: action.payload }),
    [SET_PROSPECTOS]: (state, action) => ({ ...state, prospectos: action.payload }),
    [POST_GENERAR_GESTION_PROSPECTO]: (state, action) => ({ ...state, gestionProspectoActual: action.payload }),
    [POST_GENERAR_CIERRE_CITA]: (state, action) => ({...state, cierreCitaActual: action.payload }),
    [POST_AGREGAR_TELEFONOS_PERSONA]: (state, action) => ({ ...state, telefonosPersonaActual: action.payload })
}, {});