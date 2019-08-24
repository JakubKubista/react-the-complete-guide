import React, { useEffect, createRef } from 'react';
import PropTypes from 'prop-types';

import Aux from '../../hoc/Aux'
import withClassArguments from '../../hoc/WithClassArguments';

import './person.css';

const Person = props => {
  let inputElRef = createRef();

  // If it would be a class component,
  // then it should looks like this:
  // constructor(props) {
  //   super(props);
  //   this.inputElRef = createRef();
  // }

  useEffect(() => {
    // inputEl.focus();
    inputElRef.current.focus();
  }, [inputElRef]);

  return (
    <Aux>
      <p> Name: {props.name}, Age: {props.age}</p>
      <p> {props.children} </p>
      <input
        type="text"
        // ref={(el) => { inputEl = el }}
        ref={inputElRef}
        onChange={props.change}
        value={props.name} />
      <button onClick={props.click} >Delete</button>
    </Aux>
  );
}

// Works for class components as well.
// Lower case of name propTypes.
Person.propTypes = {
  name: PropTypes.string,
  age: PropTypes.number,
  change: PropTypes.func,
  click: PropTypes.func
}

export default withClassArguments(Person, "Person");
