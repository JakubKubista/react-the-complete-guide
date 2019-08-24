import React from 'react';
import PropTypes from 'prop-types';

import Aux from '../../hoc/Aux'
import withClassArguments from '../../hoc/WithClassArguments';

import './person.css';

const person = props => {
  return (
    <Aux>
      <p> Name: {props.name}, Age: {props.age}</p>
      <p> {props.children} </p>
      <input type="text" onChange={props.change} value={props.name} />
      <button onClick={props.click} >Delete</button>
    </Aux>
  );
}
export default withClassArguments(person, "Person");
