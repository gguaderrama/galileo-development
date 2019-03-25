import { handleActions } from 'redux-actions';
import { VALIDAR_OFICINA_CONFIGURACION } from '../../../constants';

export const oficina = handleActions({
    [VALIDAR_OFICINA_CONFIGURACION]: (state, action) => action.payload,
}, []);