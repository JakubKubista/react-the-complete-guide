import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import counterReducer from './reducers/counter';
import resultsReducer from './reducers/results';
import {logger} from './middlewares/logger';

const reducer = combineReducers({
  ctr: counterReducer,
  res: resultsReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(logger, thunk)
  )
);