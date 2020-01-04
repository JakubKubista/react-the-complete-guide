import * as actionTypes from '../types';
import axios from '../../../axios-orders';

export const loginInit = () => {
  return {
    type: actionTypes.LOGIN_INIT
  }
};

export const authenticate = (inputs) => dispatch => {
  const {email, password} = inputs;
  dispatch(
    loginInit()
  );

  // axios.post('/orders.json', orderData)
  // .then(response => {
  //   dispatch(
  //     purchaseSuccess(response.data.name, orderData)
  //   )
  // })
  // .catch(error => {
  //   dispatch(
  //     purchaseFail(error)
  //   )
  // });
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