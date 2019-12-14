import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import counterReducer from './store/reducers/counter';
import resultsReducer from './store/reducers/results';

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

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(logger)
  )
);

ReactDOM.render(<Provider store={store} ><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
