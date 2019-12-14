import * as actionTypes from '../types';

export const ingredientAdd = (ingredientName) => {
  return {
    type: actionTypes.INGREDIENT_ADD,
    ingredientName
  }
}

export const ingredientRemove = (ingredientName) => {
  return {
    type: actionTypes.INGREDIENT_REMOVE,
    ingredientName
  }
}

export const purchasingOn = () => {
  return {
    type: actionTypes.PURCHASING_ON
  }
}

export const purchasingOff = () => {
  return {
    type: actionTypes.PURCHASING_OFF
  }
}