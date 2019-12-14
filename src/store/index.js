import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import counterReducer from './reducers/counter';
import resultsReducer from './reducers/results';

const reducer = combineReducers({
  ctr: counterReducer,
  res: resultsReducer
});

const logger = store => {
  return next => action => {
    console.log('[Midleware] Dispatching');
    console.log(action);
    const result = next(action);
    console.log('[Midleware] next state');
    console.log(store.getState());
    return result;
  }
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(logger, thunk)
  )
);