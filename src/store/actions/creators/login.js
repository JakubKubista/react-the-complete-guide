import * as actionTypes from '../types';
import axios from '../../../axios-service';
import { SING_UP } from '../../../constants/urls';

export const loginInit = () => {
  return {
    type: actionTypes.LOGIN_INIT
  }
};

export const authenticate = (email, password) => dispatch => {
  dispatch(
    loginInit()
  );

  const authData = {
    email,
    password,
    returnSecureToken: true
  }

  axios.post(SING_UP, authData)
  .then(response => {
    console.log(response);
    dispatch(
      loginSuccess(response.data)
    )
  })
  .catch(error => {
    dispatch(
      loginFail(error)
    )
  });
};

export const loginSuccess = (loginData) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    loginData
  }
};

export const loginFail = (error) => {
  return {
    type: actionTypes.LOGIN_FAIL,
    error
  }
};