import * as actionTypes from '../types';

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