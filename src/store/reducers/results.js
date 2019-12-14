// Immutable Update Patterns:
// https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/8303068#overview
// https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns

import * as actionTypes from '../actions/types';
import { updateObject } from '../utility';

const initialState = {
  results: []
}

const reducer = (state = initialState, action) => {
  let results = null;

  switch (action.type) {
    case actionTypes.STORE_RESULT:
      results = state.results.concat({id: new Date(), value: action.result})
      return updateObject(state, {results})

    case actionTypes.DELETE_RESULT:
      // For case if id is index we can use methods like push, unshift,
      // splice, but only as long as we are using copy of state.

      // const newResults = [...state.results];
      // newResults.splice(action.resultId, 1);
      results = state.results.filter(result => result.id !== action.resultId);
      return updateObject(state, {results})

    default:
      return state;
  }
};

export default reducer;