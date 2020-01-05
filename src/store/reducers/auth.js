import * as actionTypes from '../actions/types';
import { updateObject } from '../../utils/index';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false
}

const authInit = (state) => {
  const updatedStates = {
    error: null,
    loading: true
  }

  return updateObject(state, {...updatedStates});
}

const authSuccess = (state, action) => {
  const updatedStates = {
    token: action.token,
    userId: action.userId,
    error: null,
    loading: false
  }

  return updateObject(state, {...updatedStates});
}

const authFail = (state, action) => {
  const updatedStates = {
    error: action.error,
    loading: false
  }

  return updateObject(state, {...updatedStates});
}

const authSingOut = (state) => {
  const updatedStates = {
    token: null,
    userId: null
  }

  return updateObject(state, {...updatedStates});
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_INIT:
      return authInit(state);

    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);

    case actionTypes.AUTH_FAIL:
      return authFail(state, action);

    case actionTypes.AUTH_SIGN_OUT:
      return authSingOut(state);

    default:
      return state;
  }
};

export default authReducer;
