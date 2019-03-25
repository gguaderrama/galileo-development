import { createAction } from "redux-actions";
import { SET_ACTIVE_STEP, SET_STEP_DISABLED, SET_STEP_VISIBLE, LIMPIAR_REDUCER_BUSQUEDA, SET_NEXT_STEP } from './../../../constants/RegistroSolicitud/registroSolicitud'

export const setActiveStep = createAction(SET_ACTIVE_STEP, index => index);
export const setStepDisabled = createAction(SET_STEP_DISABLED, opcion => opcion);
export const setStepVisible = createAction(SET_STEP_VISIBLE, index => index);
export const setNextStep = createAction(SET_NEXT_STEP, nextStep => nextStep);
export const limpiarBusquedaPersona = createAction(LIMPIAR_REDUCER_BUSQUEDA, estadoInicial => estadoInicial);