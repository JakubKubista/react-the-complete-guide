import React, { Component } from 'react';

class ErrorBounary extends Component {
  state = {
    hasError: false,
    errorMessage: ''
  }

  componentDidcatch = (error, info) => {
    this.setState({
      hasError: true,
      errorMessage: error
    })
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong</h1>
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBounary;