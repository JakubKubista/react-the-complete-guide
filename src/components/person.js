import React from 'react';
import './person.css';

const Person = props => {
  const rnd = Math.random();

  if (rnd > 0.7) {
    throw new Error('Something went wrong');
  }

  return (
    <div className="Person">
      <p> Name: {props.name}, Age: {props.age}</p>
      <p> {props.children} </p>
      <input type="text" onChange={props.change} value={props.name} />
      <button onClick={props.click} >Delete</button>
    </div>
  );
}
export default Person;
