import { OBTENER_STEPS_CAPTURA } from './../../../constants';
import { createAction } from "redux-actions";
import { urlSvcStepsCaptura } from './../../../api'


export const consultaStepsCaptura = createAction(OBTENER_STEPS_CAPTURA,() => fetch(urlSvcStepsCaptura).then(v => v.json()));
