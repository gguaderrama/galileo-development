import { FETCH_CAMPOS_A_OCULTAR_EN_VISTA } from '../../../constants';
import { createAction } from 'redux-actions';
import { apiGet } from '../../../api';
import { urlObtenerCamposAOcultarEnVista } from '../../../api/urls';

export const fetchCamposAOcultarEnVista = createAction(
    FETCH_CAMPOS_A_OCULTAR_EN_VISTA, 
    (formato) => apiGet(`${urlObtenerCamposAOcultarEnVista}?formato=${encodeURIComponent(JSON.stringify(formato))}`, () => {})()
);