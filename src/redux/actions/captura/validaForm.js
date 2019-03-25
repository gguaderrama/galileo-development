import { startSubmit, stopSubmit, touch } from 'redux-form';

export const validaForm = payload => {
    return (dispatch, getState) => {
        const { form, errors,fieldsWithError } = payload;
        dispatch(startSubmit(form));
        dispatch(touch(form, ...fieldsWithError));
        dispatch(stopSubmit(form, errors));
    }
}