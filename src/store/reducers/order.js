import * as actionTypes from '../actions/types';
import { updateObject } from '../../utils/index';

const initialState = {
  orders: [],
  loading: false,
  purchased: false
}

/* PURCHASE */

const purchaseInit = (state) => {
  return updateObject(state, {purchased: false});
}

const purchaseOrderStart = (state) => {
  return updateObject(state, {loading: true});
}

const purchaseSuccess = (state, action) => {
  const order = {
    ...action.orderData,
    id: action.orderId
  }

  const updatedStates = {
    orders: state.orders.concat(order),
    loading: false,
    purchased: true
  }

  return updateObject(state, {...updatedStates});
}

const purchaseFail = (state) => {
  return updateObject(state, {loading: false});
}

/* ORDERS */

const ordersFetchInit = (state) => {
  return updateObject(state, {loading: true});
}

const ordersFetchSuccess = (state, action) => {
  const updatedStates = {
    orders: action.orders,
    loading: false
  }

  return updateObject(state, {...updatedStates});
}

const ordersFetchFail = (state) => {
  return updateObject(state, {loading: false});
}

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    /* PURCHASE */
    case actionTypes.PURCHASE_INIT:
      return purchaseInit(state);

    case actionTypes.PURCHASE_ORDER_START:
      return purchaseOrderStart(state);

    case actionTypes.PURCHASE_SUCCESS:
      return purchaseSuccess(state, action);

    case actionTypes.PURCHASE_FAIL:
      return purchaseFail(state);

    /* ORDERS */
    case actionTypes.ORDERS_FETCH_INIT:
      return ordersFetchInit(state);

    case actionTypes.ORDERS_FETCH_SUCCESS:
      return ordersFetchSuccess(state, action);

    case actionTypes.ORDERS_FETCH_FAIL:
      return ordersFetchFail(state);

    default:
      return state;
  }
};

export default orderReducer;
