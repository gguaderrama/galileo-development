// Dependencies
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import isomorphicFetch from 'isomorphic-fetch';
import reduxPromiseMiddleware from 'redux-promise-middleware';
import promiseMiddleware from 'redux-promise';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';

const injectMiddleware = deps => ({ dispatch, getState }) => next => action =>
  next(typeof action === 'function'
    ? action({...deps, dispatch, getState })
    : action
  )

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(options, rootReducer) {
  const { initialState } = options;
  // eslint-disable-next-line
  const middleware = [
    injectMiddleware({
      fetch: isomorphicFetch
    }),
    reduxPromiseMiddleware({
      promiseTypeSuffixes: ['START', 'SUCCES', 'ERROR']
    }),
    reduxImmutableStateInvariant(),
    thunk
  ];
  //return createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(...middleware)));

  return createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(promiseMiddleware, thunk)));
}
