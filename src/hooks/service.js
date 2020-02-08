
import { useReducer, useCallback } from 'react';

import {serviceReducer} from '../store/reducers/service';

const initState = {
  loading: false,
  error: null,
  data: null,
  actionType: null
};

const useService = () => {
  const [ service, dispatchService ] = useReducer( serviceReducer, initState);

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
      const errorMessage = `${actionType}: ${error.message}`;

      dispatchService({type: 'ERROR', error: errorMessage});

      return {};
    }
  }, []);

  const clearService = useCallback(() => {
    dispatchService({type: 'CLEAR'});
  }, []);

  return {
    ...service,
    sendRequest,
    clearService
  }
};

export default useService;
