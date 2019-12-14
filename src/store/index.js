import { createStore, combineReducers } from 'redux';
import burgerBuilderReducer from './reducers/burgerBuilder';

const reducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,
})

export const store = createStore(reducer);