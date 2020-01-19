import * as actionTypes from '../actions/types';
import reducer, { initialState } from './auth';

describe('reducer: auth', () => {

  it('should return init state', () => {
      expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should store the token if is signed in', () => {
    const payload = {
      token: 'user-token',
      userId: 'user-id'
    }

    const action = {
      type: actionTypes.AUTH_SUCCESS,
      ...payload
    }

    const expectedState = {
      ...initialState,
      ...payload
    }

    expect(reducer(initialState, action)).toEqual(expectedState);
  });
});