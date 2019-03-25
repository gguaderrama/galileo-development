import { handleActions } from 'redux-actions';
import { FETCH_CAMPOS_A_OCULTAR_EN_VISTA } from '../../../constants';

export const iformularios = handleActions({
    [FETCH_CAMPOS_A_OCULTAR_EN_VISTA]: (state, action) => action.payload,
}, []);
