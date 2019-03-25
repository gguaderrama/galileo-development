import { createAction } from "redux-actions";
import { CALCULA_MONTO_PAGO_CAPTURA } from './../../../constants';
import { urlCalculaMontoPago } from './../../../api/RegistroSolicitudes/urls';
import { apiGet } from '../../../api';

export const calculaMontoPago = createAction(CALCULA_MONTO_PAGO_CAPTURA, (request, notificacionClose) => apiGet(`${urlCalculaMontoPago}${encodeURIComponent(JSON.stringify(request))}`, notificacionClose)());