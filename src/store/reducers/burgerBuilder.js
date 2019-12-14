import * as actionTypes from '../actions/types';
import {INGREDIENT_PRICES} from '../../constants/burger';
import { updateObject } from '../../utils/index';

const initialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0
  },
  price: 0,
  purchasing: false
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

/* Purchasing helper */

const purchasingOn = (state) => {
  return updateObject(state, {purchasing: true});
}

const purchasingOff = (state, action) => {
  return updateObject(state, {purchasing: false});
}

/* Reducer */

const burgerBuilderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INGREDIENT_ADD:
      return ingredientAdd(state, action);

    case actionTypes.INGREDIENT_REMOVE:
      return ingredientRemove(state, action);

    case actionTypes.PURCHASING_ON:
      return purchasingOn(state, action);

    case actionTypes.PURCHASING_OFF:
      return purchasingOff(state, action);

    default:
      return state;
  }
};

export default burgerBuilderReducer;