import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose }
from 'redux';
import thunk from 'redux-thunk';

import burgerBuilderReducer from './reducers/burgerBuilder';

const reducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
);