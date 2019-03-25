/* eslint-disable import/first */
// Dependencies
import {handleActions} from 'redux-actions';

// Actions
import CATALOGS_COLLECTION_PANEL from './constants-actions';

// Related methods
const _onSucces = (state, payload, key) => {
  if (!Array.isArray(payload))
    return state;
  const inputSelectData = {...state.inputSelectData, [key]: payload}
  return {...state, inputSelectData };
}

const catalogsCollectionReducer = handleActions({
  // Empresas
  [`${CATALOGS_COLLECTION_PANEL.EMPRESAS_LIST}_NOFETCH`]: (state, {payload}) => (_onSucces(state, payload, 'empresas')),

  [CATALOGS_COLLECTION_PANEL.EMPRESAS_LIST]: (state, {payload}) => (_onSucces(state, payload, 'empresas')),

  // Oficinas
  [CATALOGS_COLLECTION_PANEL.OFICINAS_LIST]: (state, {payload}) => (_onSucces(state, payload, 'oficinas')),

  // Campanias
  [CATALOGS_COLLECTION_PANEL.CAMPANIAS_LIST]: (state, {payload:_payload}) => {
    const { payload } = _payload;
    const campanias = payload[0].medios.map(i => ({
      codigoMedioContacto: i.codigoMedioContacto,
      descripcion: i.descripcion,
      submediosList: i.submediosList
    }));
    return {...state, campanias};
  },

  // Estatuses
  [CATALOGS_COLLECTION_PANEL.ESTATUSES_LIST]: (state, {payload}) => (_onSucces(state, payload, 'statuses')),

  // Periodos
  [CATALOGS_COLLECTION_PANEL.PERIODOS_LIST]: (state, {payload}) => (_onSucces(state, payload, 'periodos')),

  // Destinos
  [CATALOGS_COLLECTION_PANEL.DESTINOS_LIST]: (state, {payload}) => (_onSucces(state, payload, 'destinos')),

  // Gestores
  [CATALOGS_COLLECTION_PANEL.GESTORES_LIST]: (state, {payload}) => (_onSucces(state, payload, 'gestores')),

  // listaCatalogos
  [CATALOGS_COLLECTION_PANEL.CATALOGOS_LIST]: (state, {payload}) => {
    const { catalogList, response } = payload;
    const result = catalogList.reduce((a,n) => (
      {...a, [CATALOGS_COLLECTION_PANEL.TIPO_CODIGO[n.tipoCodigo]]: response.filter(i => i.tipoCodigo === n.tipoCodigo)}
    ),{});
    return {...state, ...result};
  },

  // Clean out catalogs
  [`${CATALOGS_COLLECTION_PANEL.CLEANOUT_LIST}`]: (state, {payload}) => {
    const payloadTransform = payload.reduce((buffer, next) => {
      return {...buffer, [next]: null}
    }, {});
    const inputSelectData = {...state.inputSelectData, ...payloadTransform};
    return {...state, inputSelectData };
  },

},{});

export default catalogsCollectionReducer;
