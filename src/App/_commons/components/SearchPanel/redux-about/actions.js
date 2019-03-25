// Dependencies
import { createAction } from 'redux-actions';

// Owns
import { showAndHideDialogNotificationModal } from 'redux/shared-reducers/app-actions';

// API
import SearchPanelApi from './api';

// Actions
import SEARCH_PANEL_ACTIONS from './constants-actions';

//
//export const loadEmpresas = createAction(SEARCH_PANEL_ACTIONS.EMPRESAS_LIST, params => SearchPanelApi.getEmpresas(params));
export const loadEmpresas = createAction(SEARCH_PANEL_ACTIONS.EMPRESAS_LIST, params =>
  showAndHideDialogNotificationModal(SearchPanelApi.getEmpresas(params)));

export const loadEmpresasNoFetch = createAction(`${SEARCH_PANEL_ACTIONS.EMPRESAS_LIST}_NOFETCH`, empresas => empresas);

export const loadOficinas = createAction(SEARCH_PANEL_ACTIONS.OFICINAS_LIST, params =>
  showAndHideDialogNotificationModal(SearchPanelApi.getOficinas(params)));

export const loadCampanias = createAction(SEARCH_PANEL_ACTIONS.CAMPANIAS_LIST, params =>
  showAndHideDialogNotificationModal(SearchPanelApi.getCampanias(params)));

export const loadEstatuses = createAction(SEARCH_PANEL_ACTIONS.ESTATUSES_LIST, params =>
  showAndHideDialogNotificationModal(SearchPanelApi.getEstatuses(params)));

export const loadEstatusesNoFetch = createAction(`${SEARCH_PANEL_ACTIONS.ESTATUSES_LIST}_NOFETCH`, statuses => statuses);

export const loadPeriodos = createAction(SEARCH_PANEL_ACTIONS.PERIODOS_LIST, params =>
  showAndHideDialogNotificationModal(SearchPanelApi.getPeriodos(params)));

export const loadDestinos = createAction(SEARCH_PANEL_ACTIONS.DESTINOS_LIST, params =>
  showAndHideDialogNotificationModal(SearchPanelApi.getDestinos(params)));

export const loadGestores = createAction(SEARCH_PANEL_ACTIONS.GESTORES_LIST, params =>
  showAndHideDialogNotificationModal(SearchPanelApi.getGestores(params)));

export const emptyResult = createAction(SEARCH_PANEL_ACTIONS.RESULT_EMPTY_LIST, params => null);

export const cleanOutCatalog = createAction(SEARCH_PANEL_ACTIONS.CLEANOUT_LIST, catalog => catalog);

export const cleanOutBuffer = createAction(SEARCH_PANEL_ACTIONS.CLEANOUT_BUFFER, () => null);

export const fillBuffer = createAction(SEARCH_PANEL_ACTIONS.FILL_BUFFER, buffer => buffer);
