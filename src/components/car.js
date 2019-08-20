import React, { Component } from 'react';

class Car extends Component {
  state = {
    cars: [
      { name: 'Citroen' },
      { name: 'Skoda' },
      { name: 'Tesa' }
    ]
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

    return (
      <div className="Car" >
        <div style={style}>{this.state.cars[0].name}</div>
        <div style={style}>{this.state.cars[1].name}</div>
        <div style={style}>{this.state.cars[2].name}</div>
      </div>
    );
  }
}

export default Car;