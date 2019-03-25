// Redux store
import configureStore from './configure-store';

// Reducers
import rootReducer from './root-reducer';

// Get initial state
import { initialState } from './initial-state';

// Config Redux store
const store = configureStore({
  initialState: {...initialState}
}, rootReducer);

export default store;
