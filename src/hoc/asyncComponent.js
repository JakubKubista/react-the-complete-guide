/*
  HOC component for Lazy loading
*/

import React, { Component } from 'react';

const asyncComoponent = (importComponent) => {
  return class extends Component {
    state ={
      component: null
    }

    componentDidMount() {
      importComponent()
        .then(cmp => {
          this.setState({component: cmp.default});
        });
    }

    render() {
      const ComponentRef = this.state.component;

      return ComponentRef ? <ComponentRef {...this.props} /> : null;
    }
  }
}

export default asyncComoponent;