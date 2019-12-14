// Immutable Update Patterns:
// https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/8303068#overview
// https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns

import * as actionTypes from '../actions/types';
import { updateObject } from '../utility';

const initialState = {
  counter: 0
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INCREMENT:
      return updateObject(state, {counter: state.counter + 1})

    case actionTypes.DECREMENT:
      return updateObject(state, {counter: state.counter - 1})

    case actionTypes.ADD:
      return updateObject(state, {counter: state.counter + action.value})

    case actionTypes.SUBTRACT:
      return updateObject(state, {counter: state.counter - action.value})

    default:
      return state;
  }
};

export default reducer;