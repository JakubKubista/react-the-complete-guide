import * as actionTypes from '../actions/types';
import {INGREDIENT_PRICES} from '../../constants/containers/burger';
import { updateObject } from '../../utils/index';

const initialState = {
  ingredients: null,
  price: 0,
  purchasing: false,
  error: false,
  changed: false
}

/* Ingredient helper */

const ingredientAdd = (state, action) => {
  const updatedStates = {
    ingredients: {
      ...state.ingredients,
      [action.name]: state.ingredients[action.name] + 1
    },
    price: state.price + INGREDIENT_PRICES[action.name],
    changed: true
  }

  return updateObject(state, {...updatedStates});
}

const ingredientRemove = (state, action) => {
  const updatedStates = {
    ingredients: {
      ...state.ingredients,
      [action.name]: state.ingredients[action.name] - 1
    },
    price: state.price - INGREDIENT_PRICES[action.name],
    changed: true
  }

  return updateObject(state, {...updatedStates});
}

const getIngredientsPrice = (ingredients) => {
  let price = 0;
  for (var name in INGREDIENT_PRICES) {
    price += ingredients[name] * INGREDIENT_PRICES[name];
  }

  return price;
}

const ingredientSet = (state, action) => {
  const updatedStates = {
    // We cannot use ingredients: action.ingredients,
    // because in this case it would be re-ordered ASC
    ingredients: {
      salad: action.ingredients.salad,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat,
      bacon: action.ingredients.bacon
    },
    price: getIngredientsPrice(action.ingredients),
    error: false,
    changed: false
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