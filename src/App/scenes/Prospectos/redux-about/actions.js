// Dependencies
import { createAction } from 'redux-actions';

// API
import ProspectosApi from './api';

// Owns
import { showAndHideDialogNotificationModal } from 'redux/shared-reducers/app-actions';

// Actions
import CONST_ACTIONS from 'constants/actions/';
const { SEARCH_PANEL:SEARCH_PANEL_ACTIONS } = CONST_ACTIONS;

export const loadProspectosByProspectos = createAction(SEARCH_PANEL_ACTIONS.RESULT_LIST, params =>
  showAndHideDialogNotificationModal(ProspectosApi.getProspectos_prospectos(params)));

export const loadPersonasByProspectos = createAction(SEARCH_PANEL_ACTIONS.RESULT_LIST, params =>
  showAndHideDialogNotificationModal(ProspectosApi.getPersonas_prospectos(params)));

export const loadPersonasByAnalisisCliente = createAction(SEARCH_PANEL_ACTIONS.RESULT_LIST, params =>
  showAndHideDialogNotificationModal(ProspectosApi.getPersonas_otorgamientoAnalisisCliente(params)));
