import {
    CONSULTAR_CATALOGO_RELACIONES,
    CONSULTAR_ESTADOS,
    CONSULTAR_PAISES,
    CONSULTAR_LISTA_CATALOGOS,
    CONSULTAR_GIROS,
    CONSULTAR_COLONIAS,
    CONSULTAR_OFICINAS,
    CONSULTAR_RELACIONES_BENEFICIARIOS,
    CONSULTAR_MEDIOS_SUBMEDIOS_CONTACTO,
    CONSULTAR_PUESTOS
} from '../../../constants';
import { createAction } from 'redux-actions';
import { apiGet } from '../../../api';
import {
    urlConsultarCatalogoRelaciones,
    urlConsultarEstados,
    urlConsultarPaises,
    urlConsultarListaCatalogos,
    urlConsultarCatalogoGiros,
    urlConsultarColonias,
    urlConsultarOficinas,
    urlConsultarRelacionesBeneficiarios,
    urlConsultarMediosSubmediosContacto,
    urlConsultarPuestos
} from '../../../api/urls';

const status = "A";

const catalogo = {
    status,
}
export const fetchCatalogoRelaciones = createAction(
    CONSULTAR_CATALOGO_RELACIONES,
    apiGet(`${urlConsultarCatalogoRelaciones}?catalogo=${encodeURIComponent(JSON.stringify(catalogo))}&page=1&start=0&limit=10`, () => { })
);
export const fetchRelacionesBeneficiarios = createAction(
    CONSULTAR_RELACIONES_BENEFICIARIOS,
    apiGet(`${urlConsultarRelacionesBeneficiarios}`)
);
export const fetchCatalogoEstados = createAction(
    CONSULTAR_ESTADOS,
    apiGet(`${urlConsultarEstados}?ciudad=${encodeURIComponent(JSON.stringify(catalogo))}&page=1&start=0&limit=10`, () => { })
);
export const fetchCatalogoPaises = createAction(
    CONSULTAR_PAISES,
    apiGet(`${urlConsultarPaises}?pais=${encodeURIComponent(JSON.stringify(catalogo))}&page=1&start=0&limit=10`, () => { })
);
export const fetchListaCatalogos = createAction(
    CONSULTAR_LISTA_CATALOGOS,
    (catalogos) => apiGet(`${urlConsultarListaCatalogos}?listaCatalogos=${encodeURIComponent(JSON.stringify(catalogos))}&page=1&start=0&limit=10`, () => { })()
);
export const fetchCatalogoGiros = createAction(
    CONSULTAR_GIROS,
    (catalogoGiro) => apiGet(`${urlConsultarCatalogoGiros}?catalogoGiro=${encodeURIComponent(JSON.stringify(catalogoGiro))}&page=1&start=0&limit=10`, () => { })()
);
export const fetchCatalogoColonias = createAction(CONSULTAR_COLONIAS,
    (asentamiento, notificacionClose) =>
        apiGet(`${urlConsultarColonias}?asentamiento=${encodeURIComponent(JSON.stringify(asentamiento))}&page=1&start=0&limit=10`, notificacionClose)());
export const fetchOficinas = createAction(
    CONSULTAR_OFICINAS,
    (oficina) => apiGet(`${urlConsultarOficinas}?oficina=${encodeURIComponent(JSON.stringify(oficina))}&page=1&start=0&limit=10`, () => { })()
);
export const fetchMediosSubmediosContacto = createAction(
    CONSULTAR_MEDIOS_SUBMEDIOS_CONTACTO,
    (mediosSubmedios) => apiGet(`${urlConsultarMediosSubmediosContacto}?mediosSubmedios=${encodeURIComponent(JSON.stringify(mediosSubmedios))}`, () => { })()
);
export const fetchPuestos = createAction(
    CONSULTAR_PUESTOS,
    (catalogo) => apiGet(`${urlConsultarPuestos}?catalogo=${encodeURIComponent(JSON.stringify(catalogo))}`, () => { })()
);