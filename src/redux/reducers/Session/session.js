import {handleActions} from 'redux-actions';
import { GET_ACCESS } from '../../../constants/Session';

export const session = handleActions({
    [GET_ACCESS]: (state, action) => ({...state, access: action.payload})
}, {});