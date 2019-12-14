import * as actionTypes from '../types';

export const ingredientAdd = (name) => {
  return {
    type: actionTypes.INGREDIENT_ADD,
    name
  }
}

export const ingredientRemove = (name) => {
  return {
    type: actionTypes.INGREDIENT_REMOVE,
    name
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