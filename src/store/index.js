import { createStore, combineReducers } from 'redux';
import burgerBuilderReducer from './reducers/burgerBuilder';

const reducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,
})

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

export const store = createStore(
  reducer,
  devTools
);