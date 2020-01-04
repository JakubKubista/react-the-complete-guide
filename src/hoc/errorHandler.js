import React, {Component} from 'react';

import Modal from '../components/layout/modal/modal';
import Aux from './aux';

const errorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    }

    componentWillMount() {
      this.reqInterceptors = axios.interceptors.request.use(request => {
        this.setState({
          error: null
        })
        return request;
      })

      this.resInterceptors = axios.interceptors.response.use(response => response, error => {
        this.setState({
          error: error
        })
      })
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptors);
      axios.interceptors.response.eject(this.resInterceptors);
    }

    errorConfirmedHandler = () => {
      this.setState({
        error: null
      })
    }

    errorMessage = () => {
      return this.state.error.response.data.error.message ? this.state.error.response.data.error.message : this.state.error.message;
    }

    render () {
      return (
        <Aux>
          <Modal
            show={this.state.error ? true : false}
            modalClosed={this.errorConfirmedHandler}>
            {this.state.error ? this.errorMessage() : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
}

export default errorHandler;