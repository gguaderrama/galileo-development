/* eslint-disable import/first */
// Constants
import { API } from 'constants/api';

// Base
import appConfig from 'app-config';
const { baseProspectos } = appConfig.api;

// Utils
import { apiFetch } from 'utils/api';

class SearchPanelApi {
  static getEmpresas(params) {
    return apiFetch(`${baseProspectos}${API.SEARCH_PANEL.EMPRESAS_LIST}`, {body:params, method:'POST'});
  }

  static getOficinas(params) {
    return apiFetch(`${baseProspectos}${API.SEARCH_PANEL.OFICINAS_LIST}`, {body:params, method:'POST'});
  }

  static getCampanias(params) {
    return apiFetch(`${baseProspectos}${API.SEARCH_PANEL.CAMPANIAS_LIST}`, {body:params, method:'POST'});
  }

  static getEstatuses(params) {
    return apiFetch(`${baseProspectos}${API.SEARCH_PANEL.ESTATUSES_LIST}`, {body:params, method:'POST'});
  }

  static getPeriodos(params) {
    return apiFetch(`${baseProspectos}${API.SEARCH_PANEL.PERIODOS_LIST}`, {body:params, method:'POST'});
  }

  static getDestinos(params) {
    return apiFetch(`${baseProspectos}${API.SEARCH_PANEL.DESTINOS_LIST}`, {body:params, method:'POST'});
  }

  static getGestores(params) {
    return apiFetch(`${baseProspectos}${API.SEARCH_PANEL.GESTORES_LIST}`, {body:params, method:'POST'});
  }
}

export default SearchPanelApi;
