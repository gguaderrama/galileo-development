import { SET_SESSION, CONSULTAR_VALORES } from '../../../constants/Session';
import { handleActions } from 'redux-actions';

export const sessionRegistro = handleActions({
    [SET_SESSION]: (state, action) => ({ ...state, sessionParams: action.payload }),
    [CONSULTAR_VALORES]: (state, action) => ({ ...state, valoresSession: action.payload })
}, {});