import * as actionTypes from '../actions/types';
import {INGREDIENT_PRICES} from '../../constants/burger';

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

const burgerBuilderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INGREDIENT_ADD:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        price: state.price + INGREDIENT_PRICES[action.ingredientName]
      }
    case actionTypes.INGREDIENT_REMOVE:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        price: state.price - INGREDIENT_PRICES[action.ingredientName]
      }
    case actionTypes.PURCHASING_ON:
      return {
        ...state,
        purchasing: true
      }
    case actionTypes.PURCHASING_OFF:
      return {
        ...state,
        purchasing: false
      }
    default:
      return state;
  }
};

export default burgerBuilderReducer;