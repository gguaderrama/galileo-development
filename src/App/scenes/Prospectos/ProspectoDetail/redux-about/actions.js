// Dependencies
import { createAction } from 'redux-actions';

// API
import ProspectosDetailApi from './api';

// Owns
import { showAndHideDialogNotificationModal } from 'redux/shared-reducers/app-actions';

// Actions
import ACTIONS from 'constants/actions';
const { APP_BUFFER } = ACTIONS;

// App buffer merge
export const loadConsultarDatosContratoAnterior = createAction(APP_BUFFER.MERGE_BUFFER, (persona, appBufferKey) =>
  showAndHideDialogNotificationModal(ProspectosDetailApi.getConsultarDatosContratoAnterior(persona, appBufferKey)));

export const loadConsultarOfertasSolicitudesContratos = createAction(APP_BUFFER.MERGE_BUFFER, (params, appBufferKey) =>
  showAndHideDialogNotificationModal(ProspectosDetailApi.getConsultarOfertasSolicitudesContratos(params, appBufferKey, solicitudesTransform)));

export const loadContactoGestiones = createAction(APP_BUFFER.MERGE_BUFFER, (params, appBufferKey) =>
  showAndHideDialogNotificationModal(ProspectosDetailApi.getContactoGestiones(params, appBufferKey)));

export const loadGenerarGestionProspecto = createAction(APP_BUFFER.MERGE_BUFFER, (params, appBufferKey) =>
  showAndHideDialogNotificationModal(ProspectosDetailApi.postGenerarGestionProspecto(params, appBufferKey)));

// HELPERS
const solicitudesTransform = panelInfoTabs => panelInfoTabs.map((i,x) => {
    if(x === 1)
      return i.map(ii => Object.keys(ii).reduce((a,n) => {
        if (n === 'oficina')
          return {...a, [n]:ii[n]['oficina']}
        return {...a, [n]:ii[n]}
      },{}))
    //
    return i;
  })
