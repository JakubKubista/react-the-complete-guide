import React from 'react';
import './person.css';
import Aux from '../../hoc/Aux'
import withClassArguments from '../../hoc/WithClassArguments';

const Person = props => {
  return (
    <Aux>
      <p> Name: {props.name}, Age: {props.age}</p>
      <p> {props.children} </p>
      <input type="text" onChange={props.change} value={props.name} />
      <button onClick={props.click} >Delete</button>
    </Aux>
  );
}
export default withClassArguments(Person, "Person");
