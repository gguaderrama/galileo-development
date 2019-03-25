// export const getCatalogoRelaciones = state => state.catalogosCaptura ? state.catalogosCaptura.catalogoRelaciones : null;
export const getCatalogoEstados = state => state.catalogosCaptura ? state.catalogosCaptura.catalogoEstados: null;
// export const getCatalogoPaises = state => state.catalogosCaptura ? state.catalogosCaptura.catalogoPaises: null;
export const getCatalogoColonias = state => state.catalogosCaptura ? state.catalogosCaptura.catalogoColonias: null;
export const getCatalogosCaptura = state => state.catalogosCaptura;
export const getListaCatalogos = state => state.catalogosCaptura && state.catalogosCaptura.listaCatalogos;
export const getRelacionesBeneficiarios = state => state.catalogosCaptura ? state.catalogosCaptura.relacionesBeneficiarios: null;
export const getMediosSubmedios = state => state.catalogosCaptura ? state.catalogosCaptura.mediosSubmedios: null;
export const getPuestos = state => state.catalogosCaptura ? state.catalogosCaptura.puestos: null;