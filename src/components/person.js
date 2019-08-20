import React from 'react';
import './person.css';

const Person = props => {
  return (
    <div className="Person" onClick={props.click}>
      <p> Name: {props.name}, Age: {props.age}</p>
      <p> {props.children} </p>
      <input type="text" onChange={props.change} value={props.name} />
    </div>
  );
}
export default Person;
