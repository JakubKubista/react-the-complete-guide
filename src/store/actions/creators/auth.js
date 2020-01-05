import * as actionTypes from '../types';
import axios from '../../../axios-service';
import { AUTH_SING_UP, AUTH_SING_IN } from '../../../constants/urls';

export const authInit = () => {
  return {
    type: actionTypes.AUTH_INIT
  };
};

export const authenticate = ({email, password, method}) => dispatch => {
  dispatch(
    authInit()
  );

  const url = method ? AUTH_SING_IN : AUTH_SING_UP;

  const authData = {
    email,
    password,
    returnSecureToken: true
  };

  axios.post(url, authData)
  .then(response => {
    console.log(response.data);
    dispatch(
      authSuccess(response.data)
    );
    dispatch(
      checkAuthTimeout(response.data.expiresIn)
    );
  })
  .catch(error => {
    dispatch(
      authFail(error)
    );
  });
};

export const authSuccess = (loginData) => {
  const {idToken, localId} = loginData;

  return {
    type: actionTypes.AUTH_SUCCESS,
    token: idToken,
    userId: localId
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error.response.data.error
  };
};

export const checkAuthTimeout = (expirationTime) => dispatch => {
  setTimeout(() => {
    dispatch(
      authSingOut()
    );
  }, expirationTime * 1000);
};

export const authSingOut = () => {
  return {
    type: actionTypes.AUTH_SING_OUT
  }
}