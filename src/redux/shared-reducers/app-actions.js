/* eslint-disable import/first */
// Dependencies
import { createAction } from 'redux-actions';

// Actions
import ACTIONS from 'constants/actions';
const { DIALOG_NOTIFICATION_MODAL, SNACKBAR_NOTIFICATION, GOBACK, BREADCRUMBS, APP_BUFFER } = ACTIONS;

// store
import store from 'redux/index';

// Dialog notification modal
export const setDialogNotificationModal = createAction(DIALOG_NOTIFICATION_MODAL.SET, modalConfig => modalConfig);
export const setDialogNotificationModalToInit = createAction(DIALOG_NOTIFICATION_MODAL.INIT, () => null);
export const setDialogNotificationModalToLoading = createAction(DIALOG_NOTIFICATION_MODAL.LOADING, () => null);

// Snackbar notofication
export const setSnackbarNotification = createAction(SNACKBAR_NOTIFICATION.SET, config => config);
export const closeSnackbarNotification = createAction(SNACKBAR_NOTIFICATION.CLOSE, () => null);

// GoBack button & breadcrumbs
export const goBackButtonShow = createAction(GOBACK.SHOW, () => null);
export const goBackButtonHidden = createAction(GOBACK.HIDDEN, () => null);
export const breadcrumbsShow = createAction(BREADCRUMBS.SHOW, altTitle => altTitle);
export const breadcrumbsHidden = createAction(BREADCRUMBS.HIDDEN, routeToGo => routeToGo);

// App buffer & Cache -> LocalStorage
export const fillAppBuffer = createAction(APP_BUFFER.FILL_BUFFER, buffer => buffer);
export const cleanOutAppBuffer = createAction(APP_BUFFER.CLEANOUT_BUFFER, () => null);
export const changeZeroKeyAppBuffer = createAction(APP_BUFFER.FILL_BUFFER, buffer => ({zeroKey:parseInt(Math.random(1000)*100)}) );
export const fillAppCache = createAction(APP_BUFFER.FILL_CACHE, buffer => buffer);
export const getAppCache = createAction(APP_BUFFER.GET_CACHE, () => null);
export const cleanOutAppCache = createAction(APP_BUFFER.CLEANOUT_CACHE, () => null);

// Trigger loading & fetchError Modal
export const showAndHideDialogNotificationModal = _fetch => {
  store.dispatch(setDialogNotificationModalToLoading());
  return _fetch.then(r => {
      store.dispatch(setDialogNotificationModalToInit());
      return r;
    },
    error => {
      //console.log('Error on loading', error);
      return store.dispatch(setDialogNotificationModal({
        opened:true,
        iconColor: 'error',
        icon: 'error',
        content: `Error on loading: ${error}`,
        handleClose: e => store.dispatch(setDialogNotificationModalToInit()),
      }))
    }
  );
}
