import * as actionTypes from '../types';
import axios from '../../../axios-orders';

export const purchaseSuccess = (orderId, orderData) => {
  return {
    type: actionTypes.PURCHASE_SUCCESS,
    orderId,
    orderData
  }
};

export const purchaseFail = (error) => {
  return {
    type: actionTypes.PURCHASE_FAIL,
    error
  }
};

export const purchaseInitStart = () => {
  return {
    type: actionTypes.PURCHASE_INIT_START
  }
};

export const purchaseInit = (orderData) => dispatch => {
  dispatch(
    purchaseInitStart()
  );

  axios.post('/orders.json', orderData)
  .then(response => {
    dispatch(
      purchaseSuccess(response.data, orderData)
    )
  })
  .catch(error => {
    dispatch(
      purchaseFail(error)
    )
  });
};
