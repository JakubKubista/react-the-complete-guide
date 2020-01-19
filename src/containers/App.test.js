import React from 'react';
import ReactDOM from 'react-dom';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter } from 'react-router-dom';
import {
  createStore,
  combineReducers,
  applyMiddleware
} from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import App from './App';

configure({adapter: new Adapter()});

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
  reducer,
  applyMiddleware(thunk)
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
