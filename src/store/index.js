import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose }
from 'redux';
import thunk from 'redux-thunk';

import burgerBuilderReducer from './reducers/burgerBuilder';
import orderReducer from './reducers/order';
import authReducer from './reducers/auth';

const reducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  order: orderReducer,
  auth: authReducer
});

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

export const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
);
