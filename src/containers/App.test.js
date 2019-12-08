import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import App from './App';

const initialState = {
  ingredients: null,
  price: 4,
  purchasing: false
};

const burgerBuilderReducer = (state = initialState) => {
  return state;
};

const reducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,
})

const store = createStore(
  reducer
);

it('renders without crashing', () => {
  const app = (
    <Provider store={store}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </Provider>
  )
  const div = document.createElement('div');
  ReactDOM.render(app, div);
  ReactDOM.unmountComponentAtNode(div);
});
