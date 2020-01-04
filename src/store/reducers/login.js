import * as actionTypes from '../actions/types';
import { updateObject } from '../../utils/index';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false
}

const loginInit = (state) => {
  const updatedStates = {
    error: null,
    loading: true
  }

  return updateObject(state, {...updatedStates});
}

const loginSuccess = (state, action) => {
  const updatedStates = {
    token: action.token,
    userId: action.userId,
    error: null,
    loading: false
  }

  return updateObject(state, {...updatedStates});
}

const loginFail = (state, action) => {
  const updatedStates = {
    error: action.error,
    loading: false
  }

  return updateObject(state, {...updatedStates});
}

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_INIT:
      return loginInit(state);

    case actionTypes.LOGIN_SUCCESS:
      return loginSuccess(state, action);

    case actionTypes.LOGIN_FAIL:
      return loginFail(state, action);

    default:
      return state;
  }
};

export default loginReducer;
