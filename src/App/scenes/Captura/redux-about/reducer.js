/* eslint-disable import/first */
// Dependencies
import { handleActions } from 'redux-actions';


const defaultState = { arrayDemo: [{id: '1', demo: 'demo'}] };
const capturaReducer = handleActions({
  ['TABLE_CAPTURA_INTEGRANTES']: (state, action) => {
    return [{'id': 1, 'nombre' : 'Gloria'}]
  },
},{defaultState});



export default capturaReducer
