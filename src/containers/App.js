import React, { Component } from 'react';
import Layout from '../containers/layout/layout';
import BurgerBuilder from './burger-builder/burger-builder';

class App extends Component {

  render() {
    return <Layout >
      <BurgerBuilder />
    </Layout>;
  }
}

export default App;
