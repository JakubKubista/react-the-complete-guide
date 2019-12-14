import * as actionTypes from './types';

export const increment = () => {
  return {
    type: actionTypes.INCREMENT
  }
}

export const decrement = () => {
  return {
    type: actionTypes.DECREMENT
  }
}

export const add = (value) => {
  return {
    type: actionTypes.ADD,
    value
  }
}

export const subtract = (value) => {
  return {
    type: actionTypes.SUBTRACT,
    value
  }
}

export const storeResultSync = (result) => {
  return {
    type: actionTypes.STORE_RESULT,
    result
    }
  }

export const storeResult = (result) => dispatch => {
  setTimeout( () => {
    dispatch(
      storeResultSync(result)
    )
  }, 2000);
}

export const deleteResult = (resultId) => {
  return {
    type: actionTypes.DELETE_RESULT,
    resultId
  }
}