
import { useReducer, useCallback } from 'react';

import {serviceReducer} from '../store/reducers/service';

const useService = () => {
  const [ service, dispatchService ] = useReducer( serviceReducer, {
    loading: false,
    error: null,
    data: null,
    actionType: null
  });

  const sendRequest = useCallback(async({url, method, body, actionType}) => {
    dispatchService({type: 'SEND', innerType: actionType});
    try {
      const response = await fetch(url, {
        method,
        body,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      dispatchService({type: 'RESPONSE', data});

      return data;

    } catch (error) {
      dispatchService({type: 'ERROR', error});
    }
  }, []);

  return {
    ...service,
    sendRequest
  }
};

export default useService;
