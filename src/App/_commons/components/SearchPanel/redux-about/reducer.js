/* eslint-disable import/first */
// Dependencies
import {handleActions} from 'redux-actions';

// Actions
import SEARCH_PANEL_ACTIONS from './constants-actions';

// Related methods
const _onSucces = (state, payload, key) => {
  if (!Array.isArray(payload))
    return state;
  const inputSelectData = {...state.inputSelectData, [key]: payload}
  return {...state, inputSelectData };
}

const searchPanelReducer = handleActions({
  // Empresas
  [`${SEARCH_PANEL_ACTIONS.EMPRESAS_LIST}_NOFETCH`]: (state, {payload}) => (_onSucces(state, payload, 'empresas')),

  [`${SEARCH_PANEL_ACTIONS.EMPRESAS_LIST}_START`]: (state, action) => {
      const inputSelectData = {...state.inputSelectData, "oficinas": null, "campanias": null};
      return {...state, inputSelectData };
  },

  [`${SEARCH_PANEL_ACTIONS.EMPRESAS_LIST}_SUCCES`]: (state, {payload}) => (_onSucces(state, payload, 'empresas')),
  [SEARCH_PANEL_ACTIONS.EMPRESAS_LIST]: (state, {payload}) => (_onSucces(state, payload, 'empresas')),

  /*[`${SEARCH_PANEL_ACTIONS.EMPRESAS_LIST}_ERROR`]: (state, action) => {
    console.log('ERROR -> empresas');
    return state;
  },*/

  // Oficinas
  [`${SEARCH_PANEL_ACTIONS.OFICINAS_LIST}_START`]: (state, action) => state,

  [`${SEARCH_PANEL_ACTIONS.OFICINAS_LIST}_SUCCES`]: (state, {payload}) => (_onSucces(state, payload, 'oficinas')),
  [SEARCH_PANEL_ACTIONS.OFICINAS_LIST]: (state, {payload}) => (_onSucces(state, payload, 'oficinas')),

  /*[`${SEARCH_PANEL_ACTIONS.OFICINAS_LIST}_ERROR`]: (state, action) => {
    console.log('ERROR -> oficinas');
    return state;
  },*/

  // Campanias
  [`${SEARCH_PANEL_ACTIONS.CAMPANIAS_LIST}_START`]: (state, action) => state,

  [`${SEARCH_PANEL_ACTIONS.CAMPANIAS_LIST}_SUCCES`]: (state, {payload}) => (_onSucces(state, payload, 'campanias')),
  [SEARCH_PANEL_ACTIONS.CAMPANIAS_LIST]: (state, {payload}) => (_onSucces(state, payload, 'campanias')),

  /*[`${SEARCH_PANEL_ACTIONS.CAMPANIAS_LIST}_ERROR`]: (state, action) => {
    console.log('ERROR -> campanias');
    return state;
  },*/

  // Estatuses
  [`${SEARCH_PANEL_ACTIONS.ESTATUSES_LIST}_NOFETCH`]: (state, {payload}) => (_onSucces(state, payload, 'statuses')),

  [`${SEARCH_PANEL_ACTIONS.ESTATUSES_LIST}_START`]: (state, action) => state,

  [`${SEARCH_PANEL_ACTIONS.ESTATUSES_LIST}_SUCCES`]: (state, {payload}) => (_onSucces(state, payload, 'statuses')),
  [SEARCH_PANEL_ACTIONS.ESTATUSES_LIST]: (state, {payload}) => (_onSucces(state, payload, 'statuses')),

  /*[`${SEARCH_PANEL_ACTIONS.ESTATUSES_LIST}_ERROR`]: (state, action) => {
    console.log('ERROR -> statuses');
    return state;
  },*/

  // Periodos
  [`${SEARCH_PANEL_ACTIONS.PERIODOS_LIST}_START`]: (state, action) => state,

  [`${SEARCH_PANEL_ACTIONS.PERIODOS_LIST}_SUCCES`]: (state, {payload}) => (_onSucces(state, payload, 'periodos')),
  [SEARCH_PANEL_ACTIONS.PERIODOS_LIST]: (state, {payload}) => (_onSucces(state, payload, 'periodos')),

  /*[`${SEARCH_PANEL_ACTIONS.PERIODOS_LIST}_ERROR`]: (state, action) => {
    console.log('ERROR -> periodos');
    return state;
  },*/

  // Destinos
  [`${SEARCH_PANEL_ACTIONS.DESTINOS_LIST}_START`]: (state, action) => state,

  [`${SEARCH_PANEL_ACTIONS.DESTINOS_LIST}_SUCCES`]: (state, {payload}) => (_onSucces(state, payload, 'destinos')),
  [SEARCH_PANEL_ACTIONS.DESTINOS_LIST]: (state, {payload}) => (_onSucces(state, payload, 'destinos')),

  /*[`${SEARCH_PANEL_ACTIONS.DESTINOS_LIST}_ERROR`]: (state, action) => {
    console.log('ERROR -> destinos');
    return state;
  },*/

  // Gestores
  [`${SEARCH_PANEL_ACTIONS.GESTORES_LIST}_START`]: (state, action) => state,

  [`${SEARCH_PANEL_ACTIONS.GESTORES_LIST}_SUCCES`]: (state, {payload}) => (_onSucces(state, payload, 'gestores')),
  [SEARCH_PANEL_ACTIONS.GESTORES_LIST]: (state, {payload}) => (_onSucces(state, payload, 'gestores')),

  /*[`${SEARCH_PANEL_ACTIONS.GESTORES_LIST}_ERROR`]: (state, action) => {
    console.log('ERROR -> gestores');
    return state;
  },*/

  // Clean out catalogs
  [`${SEARCH_PANEL_ACTIONS.CLEANOUT_LIST}`]: (state, {payload}) => {
    const payloadTransform = payload.reduce((buffer, next) => {
      return {...buffer, [next]: null}
    }, {});
    const inputSelectData = {...state.inputSelectData, ...payloadTransform};
    return {...state, inputSelectData };
  },

  // RESULTS
  [`${SEARCH_PANEL_ACTIONS.RESULT_LIST}_START`]: (state, action) => state,

  [`${SEARCH_PANEL_ACTIONS.RESULT_LIST}_SUCCES`]: (state, {payload}) => {
    if (typeof(payload) === 'string') {
      // Personas
      try {
        return {...state, result: JSON.parse(payload)};
      } catch (e) {
        return {...state, result: null};
      }
    } else {
      // Prospectos
      if(payload.payload.prospectos)
        return {...state, result: payload.payload.prospectos};
    }
  },
  [SEARCH_PANEL_ACTIONS.RESULT_LIST]: (state, {payload}) => {
    if (typeof(payload) === 'string') {
      // Personas
      try {
        return {...state, result: JSON.parse(payload)};
      } catch (e) {
        return {...state, result: null};
      }
    } else {
      // Prospectos
      if(payload.payload.prospectos)
        return {...state, result: payload.payload.prospectos};
    }
  },

  /*[`${SEARCH_PANEL_ACTIONS.RESULT_LIST}_ERROR`]: (state, action) => {
    console.log('ERROR -> prospectos', action);
    return state;
  },*/

  [`${SEARCH_PANEL_ACTIONS.RESULT_EMPTY_LIST}`]: (state, {payload}) => ({...state, result: null}),

  // Buffer
  [`${SEARCH_PANEL_ACTIONS.CLEANOUT_BUFFER}`]: (state, action) => (({...state, bufferState: null})),

  [`${SEARCH_PANEL_ACTIONS.FILL_BUFFER}`]: (state, {payload}) => ({...state, bufferState: payload}),
},{});

export default searchPanelReducer;
