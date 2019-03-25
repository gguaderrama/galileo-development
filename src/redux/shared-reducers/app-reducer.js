/* eslint-disable import/first */
// Dependencies
import { handleActions } from 'redux-actions';
//import store from '../index';
//import { setDialogNotificationModalToInit } from './app-actions';

// Actions
import ACTIONS from 'constants/actions';
const { DIALOG_NOTIFICATION_MODAL, SNACKBAR_NOTIFICATION, GOBACK, BREADCRUMBS, APP_BUFFER } = ACTIONS;

// Constants
import STORE from 'constants/store';
const { DIALOG_NOTIFICATION_MODAL: {INITIAL_STATE, LOADING_STATE} } = STORE;

// Utils
//import { endsWith } from 'utils/misc';

const appReducer = handleActions({
  // Dialog notification modal
  [`${DIALOG_NOTIFICATION_MODAL.SET}`]: (state, action) => {
    const dialogNotificationModal = {...state.dialogNotificationModal, bufferState: action.payload};
    return {...state, dialogNotificationModal};
  },

  [`${DIALOG_NOTIFICATION_MODAL.INIT}`]: state => {
    const dialogNotificationModal = {...state.dialogNotificationModal, bufferState: INITIAL_STATE};
    return {...state, dialogNotificationModal};
  },

  [`${DIALOG_NOTIFICATION_MODAL.LOADING}`]: state => {
    const dialogNotificationModal = {...state.dialogNotificationModal, bufferState: LOADING_STATE};
    return {...state, dialogNotificationModal};
  },

  // Sanckbar notification
  [`${SNACKBAR_NOTIFICATION.SET}`]: (state, action) => {
    const snackbarNotificationInit = state.snackbarNotification.initialState;
    const snackbarNotification = {...state.snackbarNotification,
      bufferState: {...snackbarNotificationInit, ...action.payload}};
    return {...state, snackbarNotification};
  },

  [`${SNACKBAR_NOTIFICATION.CLOSE}`]: (state, action) => {
    const snackbarNotification = {...state.snackbarNotification, bufferState: null};
    return {...state, snackbarNotification};
  },

  // GoBack button
  [`${GOBACK.SHOW}`]: (state, action) => {
    const goBackPanel = {...state.goBackPanel, visible: true};
    return {...state, goBackPanel};
  },

  [`${GOBACK.HIDDEN}`]: (state, action) => {
    const goBackPanel = {...state.goBackPanel, visible: false};
    return {...state, goBackPanel};
  },

  // breadcrumbs
  [`${BREADCRUMBS.SHOW}`]: (state, {payload=null}) => {
    const breadcrumbsPanel = {...state.breadcrumbsPanel, visible: true, altTitle: payload};
    return {...state, breadcrumbsPanel};
  },

  [`${BREADCRUMBS.HIDDEN}`]: (state, {payload}) => {
    const breadcrumbsPanel = {...state.breadcrumbsPanel, visible: false};
    return {...state, breadcrumbsPanel};

    //return state;
  },

  // App buffer & cache
  [`${APP_BUFFER.CLEANOUT_BUFFER}`]: (state, action) => (({...state, bufferState: null})),

  [`${APP_BUFFER.FILL_BUFFER}`]: (state, {payload}) => {
    const bufferState = {...state.bufferState, ...payload};
    return {...state, bufferState};
  },

  [`${APP_BUFFER.MERGE_BUFFER}_START`]: (state, action) => state,

  [`${APP_BUFFER.MERGE_BUFFER}_SUCCES`]: (state, {payload}) => {
    const dialogNotificationModal = {...state.dialogNotificationModal, bufferState: INITIAL_STATE};
    const appBufferKey = Object.keys(state.bufferState[payload.appBufferKey]).indexOf(Object.keys(payload.response)[0]) === -1
    ? {...state.bufferState[payload.appBufferKey], ...payload.response}
    : {...state.bufferState[payload.appBufferKey],
        [Object.keys(payload.response)[0]]: {
          ...state.bufferState[payload.appBufferKey][Object.keys(payload.response)[0]], ...payload.response[Object.keys(payload.response)[0]]
        }
      };
    const bufferState = {...state.bufferState, [payload.appBufferKey]: appBufferKey};
    return {...state, bufferState, dialogNotificationModal};
  },
  [APP_BUFFER.MERGE_BUFFER]: (state, {payload}) => {
    // Transform 'consultarSolicitudesCliente' response
    const panelInfoTabs = payload.solicitudesTransform ? payload.solicitudesTransform(payload.response.panelInfoTabs): null
    const payloadResponse = panelInfoTabs ? {...payload.response, panelInfoTabs} : payload.response;

    // open loading modal
    const dialogNotificationModal = {...state.dialogNotificationModal, bufferState: INITIAL_STATE};
    // Reduce indeed
    const appBufferKey = Object.keys(state.bufferState[payload.appBufferKey]).indexOf(Object.keys(payloadResponse)[0]) === -1
    ? {...state.bufferState[payload.appBufferKey], ...payloadResponse}
    : {...state.bufferState[payload.appBufferKey],
        [Object.keys(payloadResponse)[0]]: {
          ...state.bufferState[payload.appBufferKey][Object.keys(payloadResponse)[0]], ...payloadResponse[Object.keys(payloadResponse)[0]]
        }
      };
    const bufferState = {...state.bufferState, [payload.appBufferKey]: appBufferKey};
    return {...state, bufferState, dialogNotificationModal};
  },

  /*[`${APP_BUFFER.MERGE_BUFFER}_ERROR`]: (state, action) => {
    console.log('ERROR -> MERGE_BUFFER');
    return state;
  },*/

  [`${APP_BUFFER.FILL_CACHE}`]: (state, action) => {
    const bufferState = state.bufferState;
    localStorage.setItem('appBuffer', JSON.stringify(bufferState));
    return state;
  },

  [`${APP_BUFFER.GET_CACHE}`]: (state, {payload}) => {
    const bufferState = JSON.parse(localStorage.getItem('appBuffer')) || null;
    return {...state, bufferState};
  },

  [`${APP_BUFFER.CLEANOUT_CACHE}`]: (state, {payload}) => {
    localStorage.setItem('appBuffer', null);
    return state;
  },

},{});

/*
export default function reducer(state, action) {
  if (endsWith('_START', action.type))
    return appReducer(state, {...action, type:DIALOG_NOTIFICATION_MODAL.LOADING});

  if (endsWith('_SUCCES', action.type) && action.type !== 'APP_BUFFER_MERGE_BUFFER_SUCCES')
    return appReducer(state, {...action, type:DIALOG_NOTIFICATION_MODAL.INIT});

  if (endsWith('_ERROR', action.type))
    return appReducer(state, {
      payload:{
        opened:true,
        iconColor: 'error',
        icon: 'error',
        content: 'Error on loading...',
        handleClose: e => store.dispatch(setDialogNotificationModalToInit()),
      },
      type:DIALOG_NOTIFICATION_MODAL.SET
    });

  return appReducer(state, action);
}
*/

export default appReducer
