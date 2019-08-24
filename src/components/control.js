import React, { useEffect } from 'react';

const Control = props => {
  // Is called whenever is called render (so when is component created or changed)
  useEffect(() => {
    console.log('[Control.js] useEffect: component created');
    const timer = setTimeout(() => {
      alert('Component has been created!');
    }, 1000)
    // Statement is runned after render cycle (cleaning hook)
    return () => {
      clearTimeout(timer);
      console.log('[Control.js] cleanup Control')
    }
    // without any argument = change every time when is something changed
    // with empty array it is only when component is created - same like componentDidMount
  }, []);


  useEffect(() => {
    console.log('[Control.js] useEffect: props.persons');
    alert('personsLength has been changed!');
    return () => {
      console.log('[Control.js] cleanup Persons')
    }
    // set for which variables it should be called
  }, [props.personsLength])

  return (
    <div>
      <h1>Test</h1>
      <button onClick={props.toggle}>Toggle</button>
    </div>
  );
};

// Memo = React memoazie (store) a snapshot of component.
// Otherwise, update component only when inputs (props) has been changed.
// Use only when you are 100% sure, that this component has no
// dependencies to parent and can be really changed only when input is changed.
// Try to use because of optimalization.
export default React.memo(Control);

