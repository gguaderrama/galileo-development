import { createAction } from "redux-actions";
import { CONSULTAR_IMAGENES_VISOR, OBTENER_RUTA_COA } from './../../../constants/Generic';
import { urlConsultarImagenesVisor, urlObtenerRutaCoa } from './../../../api/urls';
import { apiGet } from '../../../api'

export const consultaImagenesVisor = createAction(
    CONSULTAR_IMAGENES_VISOR,    
    (jsonImagen) => apiGet(`${urlConsultarImagenesVisor}?jsonImagen=${encodeURIComponent(JSON.stringify(jsonImagen))}`, () => { })()
);

export const obtenerRutaCoa = createAction(
    OBTENER_RUTA_COA,    
    apiGet(urlObtenerRutaCoa, () => { })
);