import React, { useEffect, createRef } from 'react';
import PropTypes from 'prop-types';

import Aux from '../../patterns/hoc/aux'
import withClassArguments from '../../patterns/hoc/with-class-arguments';
import AuthContext from '../../patterns/context/auth-context';

import './person.css';

const Person = props => {
  const inputElRef = createRef(); // or useRef

  // If it would be a class component,
  // then it should looks like this:
  // constructor(props) {
  //   super(props);
  //   this.inputElRef = React.createRef();
  // }

  useEffect(() => { // Improvement: better to call at the top level (not in the loop etc.)
    // inputEl.focus();
    inputElRef.current.focus();
  }, [inputElRef]);

  return (
    <Aux>
      <AuthContext.Consumer>
        {context =>
          context.authenticated ? <p>Authenticated!</p> : <p>Please log in</p>}
      </AuthContext.Consumer>
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
