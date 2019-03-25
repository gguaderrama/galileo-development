import { handleActions } from 'redux-actions';
import { VALIDAR_XML_SUCURSAL_PDF } from '../../../constants';

export const xmlValidoPdf = handleActions({
    [VALIDAR_XML_SUCURSAL_PDF]: (state, action) => action.payload,
}, []);
