import { createAction } from 'redux-actions';
import { apiGet } from '../../../api';
import { urlValidarZonaAutorizada } from '../../../api/urls';
import { VALIDAR_ZONA_AUTORIZADA } from '../../../constants';

export const fetchValidarZonaAutorizada = createAction(
    VALIDAR_ZONA_AUTORIZADA,
    (solicitud) => apiGet(`${urlValidarZonaAutorizada}?solicitud=${encodeURIComponent(JSON.stringify(solicitud))}`, () => { })()
);