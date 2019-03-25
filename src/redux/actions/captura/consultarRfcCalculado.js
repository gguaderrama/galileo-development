import { createAction } from 'redux-actions';
import { apiGet } from '../../../api';
import { urlConsultarRfcCalculado } from '../../../api/urls';
import { CONSULTAR_RFC_CALCULADO } from '../../../constants';

export const consultarRfcCalculado = createAction(
    CONSULTAR_RFC_CALCULADO,
    (persona) => apiGet(`${urlConsultarRfcCalculado}?persona=${encodeURIComponent(JSON.stringify(persona))}`, () => { })()
);