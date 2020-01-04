import * as actionTypes from '../types';
import axios from '../../../axios-service';
import { SING_UP, SING_IN } from '../../../constants/urls';

export const loginInit = () => {
  return {
    type: actionTypes.LOGIN_INIT
  }
};

export const authenticate = ({email, password, method}) => dispatch => {
  dispatch(
    loginInit()
  );

  const url = method ? SING_IN : SING_UP;

  const authData = {
    email,
    password,
    returnSecureToken: true
  }

  axios.post(url, authData)
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