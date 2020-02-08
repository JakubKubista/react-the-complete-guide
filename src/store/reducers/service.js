export const initState = {
  loading: false,
  error: null,
  data: null,
  actionType: null
};

export const serviceReducer = (state, action) => {
  switch (action.type) {
    case 'SEND':
      return {
        loading: true,
        error: null,
        actionType: action.innerType
      };

    case 'RESPONSE':
      return {
        ...state,
        loading: false,
        data: action.data
      };

    case 'ERROR':
      return {
        loading: false,
        error: action.error
      };

    case 'CLEAR':
      return initState;

    default:
      throw new Error('Ingredient Reducer:  Default action Error')
  }
}