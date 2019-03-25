import { createAction } from 'redux-actions';
import { apiGet } from '../../../api';
import { urlValidarOficinaConfiguracion } from '../../../api/urls';
import { VALIDAR_OFICINA_CONFIGURACION } from '../../../constants';

export const fetchValidarOficinaConfiguracion = createAction(
    VALIDAR_OFICINA_CONFIGURACION,
    (jsonModeloOficina) => apiGet(`${urlValidarOficinaConfiguracion}?jsonModeloOficina=${encodeURIComponent(JSON.stringify(jsonModeloOficina))}`, () => { })()
);