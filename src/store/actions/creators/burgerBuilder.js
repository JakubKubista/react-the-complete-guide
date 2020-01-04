import * as actionTypes from '../types';
import axios from '../../../axios-service';

export const ingredientInit = () => dispatch => {
  axios.get('/ingredients.json')
  .then(response => {
    dispatch(
      ingredientSet(response.data)
    )
  })
  .catch(error => {
    dispatch(
      ingredientsFetchFailed(error)
    )
  })
};

export const ingredientSet = (ingredients) => {
  return {
    type: actionTypes.INGREDIENT_SET,
    ingredients
  }
};

export const ingredientsFetchFailed = (error) => {
  return {
    type: actionTypes.INGREDIENT_FETCH_FAILED,
    error
  }
};

export const ingredientAdd = (name) => {
  return {
    type: actionTypes.INGREDIENT_ADD,
    name
  }
};

export const ingredientRemove = (name) => {
  return {
    type: actionTypes.INGREDIENT_REMOVE,
    name
  }
};

export const purchasingOn = () => {
  return {
    type: actionTypes.PURCHASING_ON
  }
};

export const purchasingOff = () => {
  return {
    type: actionTypes.PURCHASING_OFF
  }
};
