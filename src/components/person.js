import React from 'react';
import classes from './person.css';

const Person = props => {
  return (
    <div className={classes.Person}>
      <p> Name: {props.name}, Age: {props.age}</p>
      <p> {props.children} </p>
      <input type="text" onChange={props.change} value={props.name} />
      <button onClick={props.click} >Delete</button>
    </div>
  );
}
export default Person;
