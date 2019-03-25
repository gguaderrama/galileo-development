import { handleActions } from 'redux-actions';
import { CONSULTAR_CATALOGO_RELACIONES, 
    CONSULTAR_ESTADOS, 
    CONSULTAR_PAISES, 
    CONSULTAR_LISTA_CATALOGOS, 
    CONSULTAR_GIROS, 
    CONSULTAR_COLONIAS, 
    CONSULTAR_OFICINAS, 
    CONSULTAR_RELACIONES_BENEFICIARIOS,
    CONSULTAR_MEDIOS_SUBMEDIOS_CONTACTO,
    CONSULTAR_PUESTOS, } from '../../../constants';

export const catalogos = handleActions({
    [CONSULTAR_CATALOGO_RELACIONES]: (state, action) => {return { ...state, catalogoRelaciones: action.payload } },
    [CONSULTAR_ESTADOS]: (state, action) => {return { ...state, catalogoEstados: action.payload } },
    [CONSULTAR_PAISES]: (state, action) => {return { ...state, catalogoPaises: action.payload } },
    [CONSULTAR_LISTA_CATALOGOS]: (state, action) => {return { ...state, listaCatalogos: action.payload } },
    [CONSULTAR_GIROS]: (state, action) => {return { ...state, catalogoGiros: action.payload } },
    [CONSULTAR_COLONIAS]: (state, action) => {return { ...state, catalogoColonias: action.payload } },
    [CONSULTAR_OFICINAS]: (state, action) => {return { ...state, catalogoOficinas: action.payload } },
    [CONSULTAR_RELACIONES_BENEFICIARIOS]: (state, action) => {return { ...state, relacionesBeneficiarios: action.payload } },
    [CONSULTAR_MEDIOS_SUBMEDIOS_CONTACTO]: (state, action) => {return { ...state, mediosSubmedios: action.payload } },
    [CONSULTAR_PUESTOS]: (state, action) => {return { ...state, puestos: action.payload } },
    
}, null);