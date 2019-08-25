import React, { Component, Fragment } from 'react';
import Aux from '../patterns/hoc/aux';
import AuthContext from '../patterns/context/auth-context';

class Car extends Component {
  state = {
    cars: [
      { name: 'Citroen' },
      { name: 'Skoda' },
      { name: 'Tesa' }
    ]
  }

  static contextType = AuthContext;

  componentDidMount() {
    console.log('authenticated: ' + this.context.authenticated);
  }

  render() {
    const style = {
      position: 'relative',
      backgroundColor: '#white',
      font: 'inherit',
      border: '1px solid #ddd',
      boxShadow: '0 2px 3px #ddd',
      padding: '8px',
      margin: '20px',
      cursor: 'pointer'
    }

    return <Aux>
      {this.context.authenticated ?
        <Fragment>
          <div style={style}>{this.state.cars[0].name}</div>
          <div style={style}>{this.state.cars[1].name}</div>
          <div style={style}>{this.state.cars[2].name}</div>
        </Fragment>
        : null}
    </Aux>;
  }
}

export default Car;