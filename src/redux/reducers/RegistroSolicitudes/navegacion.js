import { handleActions } from 'redux-actions';
import { SET_ACTIVE_STEP, SET_NEXT_STEP, SET_STEP_DISABLED, SET_STEP_VISIBLE, LIMPIAR_REDUCER_BUSQUEDA } from "constants/RegistroSolicitud/registroSolicitud";


export const navegacion = handleActions({
    [SET_ACTIVE_STEP]: (state, action) => ({ ...state, opcionActiva: action.payload }),
    [SET_NEXT_STEP]: (state, action) => ({ ...state, opcionActiva: state.opcionActiva + 1 }),
    [SET_STEP_DISABLED]: (state, action) => {
        let opciones = state.opciones;
        let step = opciones[action.payload.index];
        step.disabled = action.payload.disabled;
        opciones[opciones[action.payload.index]] = step;
        return {
            ...state,
            opciones
        }
    },
    [SET_STEP_VISIBLE]: (state, action) => {
        let opciones = state.opciones;
        let step = opciones[action.payload.index];
        step.color = action.payload.color;
        step[opciones[action.payload.index]] = step;
        return {
            ...state,
            opciones
        }
    },
    [LIMPIAR_REDUCER_BUSQUEDA]: (state, action) => {
        return {
            ...state,
            opciones: [{
                "id": 0,
                "nombre": "BÚSQUEDA CLIENTE",
                "icon": 'search',
                "color": "primary",
                "disabled": false
            },
            {
                "id": 1,
                "nombre": "DATOS CRÉDITO",
                "icon": "payment",
                "color": "disabled",
                "disabled": true
            },
            {
                "id": 2,
                "nombre": "INTEGRANTES",
                "icon": "people",
                "color": "disabled",
                "disabled": true
            },
            {
                "id": 3,
                "nombre": "DIGITALIZACIÓN",
                "icon": "scanner",
                "color": "disabled",
                "disabled": true
            },
            {
                "id": 4,
                "nombre": "PREEVALUACIÓN",
                "icon": "assignment",
                "color": "disabled",
                "disabled": true
            }]
            , opcionActiva: 0
        }
    },
}, []);

