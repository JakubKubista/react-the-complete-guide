import * as actionTypes from '../types';
import axios from '../../../axios-orders';

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  }
};

export const purchaseOrderStart = () => {
  return {
    type: actionTypes.PURCHASE_ORDER_START
  }
};

export const purchaseOrder = (orderData) => dispatch => {
  dispatch(
    purchaseOrderStart()
  );

  axios.post('/orders.json', orderData)
  .then(response => {
    dispatch(
      purchaseSuccess(response.data.name, orderData)
    )
  })
  .catch(error => {
    dispatch(
      purchaseFail(error)
    )
  });
};

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