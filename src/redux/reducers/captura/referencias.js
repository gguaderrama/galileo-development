import { handleActions } from 'redux-actions';
import { SET_REFERENCIAS_SELECCIONADAS } from '../../../constants';

export const referencias = handleActions({
    [SET_REFERENCIAS_SELECCIONADAS]: (state, action) => action.payload,
}, []);