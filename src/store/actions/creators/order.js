import * as actionTypes from '../types';
import axios from '../../../axios-service';

/* PURCHASE */

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

/* ORDERS */

export const ordersFetchInit = () => {
  return {
    type: actionTypes.ORDERS_FETCH_INIT,
  }
};

export const ordersFetchSuccess = (orders) => {
  return {
    type: actionTypes.ORDERS_FETCH_SUCCESS,
    orders
  }
};

export const ordersFetchFail = (error) => {
  return {
    type: actionTypes.ORDERS_FETCH_FAIL,
    error
  }
};

export const ordersFetch = () => dispatch => {
  dispatch(
    ordersFetchInit()
  );

  axios.get('/orders.json')
  .then(response => {
    const fetchedOrders = [];
    // eslint-disable-next-line no-unused-vars
    for (let key in response.data) {
      fetchedOrders.push({
        id: key,
        ...response.data[key]
      });
    }
    dispatch(
      ordersFetchSuccess(fetchedOrders)
    )
  })
  .catch(error => {
    dispatch(
      ordersFetchFail(error)
    )
  })
}