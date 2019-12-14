import * as actionTypes from '../actions/types';
import {INGREDIENT_PRICES} from '../../constants/burger';
import { updateObject } from '../../utils/index';

const initialState = {
  ingredients: null,
  price: 0,
  purchasing: false,
  error: false
}

/* Ingredient helper */

const ingredientAdd = (state, action) => {
  const updatedStates = {
    ingredients: {
      ...state.ingredients,
      [action.name]: state.ingredients[action.name] + 1
    },
    price: state.price + INGREDIENT_PRICES[action.name]
  }

  return updateObject(state, {...updatedStates});
}

const ingredientRemove = (state, action) => {
  const updatedStates = {
    ingredients: {
      ...state.ingredients,
      [action.name]: state.ingredients[action.name] - 1
    },
    price: state.price - INGREDIENT_PRICES[action.name]
  }

  return updateObject(state, {...updatedStates});
}

const ingredientSet = (state, action) => {
  const updatedStates = {
    ingredients: action.ingredients,
    error: false
  }
  return updateObject(state, {...updatedStates});
}

const ingredientFetchFailed = (state) => {
  return updateObject(state, {error: true});
}

/* Purchasing helper */

const purchasingOn = (state) => {
  return updateObject(state, {purchasing: true});
}

const purchasingOff = (state) => {
  return updateObject(state, {purchasing: false});
}

/* Reducer */

const burgerBuilderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INGREDIENT_ADD:
      return ingredientAdd(state, action);

    case actionTypes.INGREDIENT_REMOVE:
      return ingredientRemove(state, action);

    case actionTypes.INGREDIENT_SET:
      return ingredientSet(state, action);

    case actionTypes.INGREDIENT_FETCH_FAILED:
      return ingredientFetchFailed(state);

    case actionTypes.PURCHASING_ON:
      return purchasingOn(state);

    case actionTypes.PURCHASING_OFF:
      return purchasingOff(state);

    default:
      return state;
  }
};

export default burgerBuilderReducer;