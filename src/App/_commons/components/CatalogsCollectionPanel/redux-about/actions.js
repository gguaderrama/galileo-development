// Dependencies
import { createAction } from 'redux-actions';

// Owns
import { showAndHideDialogNotificationModal } from 'redux/shared-reducers/app-actions';

// API
import CatalogsCollectionPanelApi from './api';

// Actions
import CATALOGS_COLLECTION_PANEL from './constants-actions';

//
//export const loadEmpresas = createAction(CATALOGS_COLLECTION_PANEL.EMPRESAS_LIST, params =>
//  showAndHideDialogNotificationModal(CatalogsCollectionPanelApi.getEmpresas(params)));

//export const loadEmpresasNoFetch = createAction(`${CATALOGS_COLLECTION_PANEL.EMPRESAS_LIST}_NOFETCH`, empresas => empresas);

//export const loadOficinas = createAction(CATALOGS_COLLECTION_PANEL.OFICINAS_LIST, params =>
//  showAndHideDialogNotificationModal(CatalogsCollectionPanelApi.getOficinas(params)));

export const loadCampanias = createAction(CATALOGS_COLLECTION_PANEL.CAMPANIAS_LIST, params =>
  showAndHideDialogNotificationModal(CatalogsCollectionPanelApi.getCampanias(params)));

//export const loadEstatuses = createAction(CATALOGS_COLLECTION_PANEL.ESTATUSES_LIST, params =>
//  showAndHideDialogNotificationModal(CatalogsCollectionPanelApi.getEstatuses(params)));

//export const loadEstatusesNoFetch = createAction(`${CATALOGS_COLLECTION_PANEL.ESTATUSES_LIST}_NOFETCH`, statuses => statuses);

//export const loadPeriodos = createAction(CATALOGS_COLLECTION_PANEL.PERIODOS_LIST, params =>
//  showAndHideDialogNotificationModal(CatalogsCollectionPanelApi.getPeriodos(params)));

//export const loadDestinos = createAction(CATALOGS_COLLECTION_PANEL.DESTINOS_LIST, params =>
//  showAndHideDialogNotificationModal(CatalogsCollectionPanelApi.getDestinos(params)));

//export const loadGestores = createAction(CATALOGS_COLLECTION_PANEL.GESTORES_LIST, params =>
//  showAndHideDialogNotificationModal(CatalogsCollectionPanelApi.getGestores(params)));

export const loadListaCatalogos = createAction(CATALOGS_COLLECTION_PANEL.CATALOGOS_LIST, params =>
  showAndHideDialogNotificationModal(CatalogsCollectionPanelApi.getListaCatalogos(params)));
