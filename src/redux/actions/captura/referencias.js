import { createAction } from 'redux-actions';
import { SET_REFERENCIAS_SELECCIONADAS, } from '../../../constants';
export const estableceReferenciasSeleccionadas = createAction(
    SET_REFERENCIAS_SELECCIONADAS,
    (referencias) => (referencias)
);