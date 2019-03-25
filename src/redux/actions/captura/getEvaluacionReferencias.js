import { createAction } from 'redux-actions';
import { apiGet } from '../../../api';
import { urlGetEvaluacionReferencias } from '../../../api/urls';
import { GET_EVALUACION_REFERENCIAS } from '../../../constants';

export const getEvaluacionReferencias = createAction(
    GET_EVALUACION_REFERENCIAS,
    (referencia) => apiGet(`${urlGetEvaluacionReferencias}?jsonReferencia=${encodeURIComponent(JSON.stringify(referencia))}`, () => { })()
);