import React, { useState, useEffect } from 'react';

import Modal from '../components/layout/modal/modal';
import Aux from './aux';

const errorHandler = (WrappedComponent, axios) => {
  return props => {
    const [error, setError] = useState(null);

    const reqInterceptors = axios.interceptors.request.use(request => {
      setError(null);
      return request;
    })

    const resInterceptors = axios.interceptors.response.use(response => response, resError => {
      setError(resError);
    })


    useEffect(() => {
      return () => {
        axios.interceptors.request.eject(reqInterceptors);
        axios.interceptors.response.eject(resInterceptors);
      };
    }, [reqInterceptors, resInterceptors])

    const errorConfirmedHandler = () => {
      setError(null);
    }

    const errorMessage = () => {
      let errorMessage = '';

      if (error.response.data.error.message) {
        errorMessage = error.response.data.error.message;
      } else if (error.response.data.error) {
        errorMessage = error.response.data.error;
      } else {
        errorMessage = error.message;
      }

      return errorMessage;
    }

    return (
      <Aux>
        <Modal
          show={!!error}
          modalClosed={errorConfirmedHandler}
        >
          {error && errorMessage()}
        </Modal>
        <WrappedComponent {...props} />
      </Aux>
    );
  };
}

export default errorHandler;
