import React from 'react';

import Modal from '../components/layout/modal/modal';
import Aux from './aux';
import useErrorHandler from '../hooks/errorHandler';

const errorHandler = (WrappedComponent, axios) => {
  return props => {
    const [error, errorMessage, clearError] = useErrorHandler(axios);

    return (
      <Aux>
        <Modal
          show={!!error}
          modalClosed={clearError}
        >
          {error && errorMessage()}
        </Modal>
        <WrappedComponent {...props} />
      </Aux>
    );
  };
};

export default errorHandler;
