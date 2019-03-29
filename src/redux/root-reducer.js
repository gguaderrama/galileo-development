// Dependencies
import { combineReducers } from 'redux';

// Shared Reducers
import app from './shared-reducers/app-reducer';

// App Reducers
import searchPanel from 'App/_commons/components/SearchPanel/redux-about/reducer';
import catalogsCollection from 'App/_commons/components/CatalogsCollectionPanel/redux-about/reducer';
import capturaIntegrantes from  'App/scenes/Captura/redux-about/reducer'
// All reducer mixed
import allReducers from './reducers';

const rootReducer = combineReducers({
  ...allReducers,

  // App
  app,
  catalogsCollection,
  searchPanel, //TODO: Maybe discart and delegate to catalogsCollection
  capturaIntegrantes,
});

export default rootReducer;
