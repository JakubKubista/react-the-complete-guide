import * as actionTypes from '../actions/types';
import { updateObject } from '../../utils/index';

const initialState = {
  orders: [],
  loading: false,
  purchased: false
}

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

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return purchaseInit(state, action);

    case actionTypes.PURCHASE_ORDER_START:
      return purchaseOrderStart(state, action);

    case actionTypes.PURCHASE_SUCCESS:
      return purchaseSuccess(state, action);

    case actionTypes.PURCHASE_FAIL:
      return purchaseFail(state);

    default:
      return state;
  }
};

export default orderReducer;
