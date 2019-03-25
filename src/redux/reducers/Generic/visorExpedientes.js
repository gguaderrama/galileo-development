import { handleActions } from 'redux-actions';
import { CONSULTAR_IMAGENES_VISOR, OBTENER_RUTA_COA } from './../../../constants/Generic';

export const visorExpedientes = handleActions({
    [CONSULTAR_IMAGENES_VISOR]: (state, action) => {return { ...state, expedientes: action.payload } },
    [OBTENER_RUTA_COA]: (state, action) => {return { ...state, rutaCoa: action.payload } },
}, null);