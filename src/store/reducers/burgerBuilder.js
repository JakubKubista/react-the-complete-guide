import * as actionTypes from '../actions/types';

const initialState = {
  purchasing: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASING_ON:
      return {
        ...state,
        purchasing: true
      }
    case actionTypes.PURCHASING_OFF:
      return {
        ...state,
        purchasing: false
      }
    default:
      return state;
  }
};

export default reducer;