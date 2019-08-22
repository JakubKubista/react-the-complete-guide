import React, { Component } from 'react';
import './person.css';

class Person extends Component {
  render() {
    console.log('[Person.js] render');
    return <div className="Person">
      <p> Name: {this.props.name}, Age: {this.props.age}</p>
      <p> {this.props.children} </p>
      <input type="text" onChange={this.props.change} value={this.props.name} />
      <button onClick={this.props.click} >Delete</button>
    </div>;
  }
}

export default Person;
