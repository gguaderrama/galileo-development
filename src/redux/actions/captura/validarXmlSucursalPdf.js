import { createAction } from 'redux-actions';
import { apiGet } from '../../../api';
import { urlValidarXmlSucursalPdf } from '../../../api/urls';
import { VALIDAR_XML_SUCURSAL_PDF } from '../../../constants';

export const fetchValidarXmlSucursalPdf = createAction(
    VALIDAR_XML_SUCURSAL_PDF,
    (solicitud) => apiGet(`${urlValidarXmlSucursalPdf}?solicitud=${encodeURIComponent(JSON.stringify(solicitud))}`, () => { })()
);