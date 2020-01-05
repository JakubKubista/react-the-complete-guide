import * as actionTypes from '../types';
import axios from '../../../axios-service';
import { AUTH_SIGN_UP, AUTH_SIGN_IN } from '../../../constants/urls';

export const authInit = () => {
  return {
    type: actionTypes.AUTH_INIT
  };
};

export const authenticate = ({email, password, method}) => dispatch => {
  dispatch(
    authInit()
  );

  const url = method ? AUTH_SIGN_IN : AUTH_SIGN_UP;

  const authData = {
    email,
    password,
    returnSecureToken: true
  };

  axios.post(url, authData)
  .then(response => {
    addToLocalStorage(response.data);

    dispatch(
      authSuccess(response.data)
    );
    dispatch(
      authCheckTimeout(response.data.expiresIn)
    );
  })
  .catch(error => {
    dispatch(
      authFail(error)
    );
  });
};

export const authSuccess = (authData) => {
  const {idToken, localId} = authData;

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

export const authCheckTimeout = (expirationTime) => dispatch => {
  setTimeout(() => {
    dispatch(
      authSignOut()
    );
  }, expirationTime * 1000);
};

export const authSignOut = () => {
  removeFromLocalStorage();

  return {
    type: actionTypes.AUTH_SIGN_OUT
  }
};

/* LOCAL STORAGE */

export const authCheckLocalStorage = () => dispatch => {
  const {
    idToken,
    expirationDate,
    localId
  } = getFromLocalStorage();

  if (idToken && expirationDate > new Date()) {
    const expirationSecondsLeft = (expirationDate.getTime() - new Date().getTime()) / 1000;

    dispatch(
      authSuccess({idToken, localId})
    );
    dispatch(
      authCheckTimeout(expirationSecondsLeft)
    );
  } else {
    dispatch(
      authSignOut()
    );
  }
};

const addToLocalStorage = ({idToken, expiresIn, localId}) => {
  const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);

  localStorage.setItem('token', idToken);
  localStorage.setItem('expirationDate', expirationDate);
  localStorage.setItem('userId', localId);
};

const removeFromLocalStorage = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
};

const getFromLocalStorage = () => {
  return {
    idToken: localStorage.getItem('token'),
    expirationDate: new Date(localStorage.getItem('expirationDate')),
    localId: localStorage.getItem('userId')
  };
};