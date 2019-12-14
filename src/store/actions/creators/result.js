import * as actionTypes from '../types';

export const storeResultSync = (result) => {
  return {
    type: actionTypes.STORE_RESULT,
    result
    }
  }

export const storeResult = (result) => (dispatch, getState) => {
  // Possibility of using getState to connect to previous state of store
  // console.log('getState()');
  // console.log(getState().ctr.counter);
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