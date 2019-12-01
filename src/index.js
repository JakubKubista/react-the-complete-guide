import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import classes from './index.scss';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';

const reducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,
})

const store = createStore(reducer);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App className={classes.body} />
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
