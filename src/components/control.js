import React from 'react';
import Aux from '../hoc/Aux';

const Controls = props => {
  // Better apporach than array is Auxiliary, but even better is React.Fragment
  return <Aux>
    <h1 key="h1">Test</h1>
    <button key="button" onClick={props.toggle}>Toggle</button>
  </Aux>;

  // We can deal with elements as with array, but it is not the best approach
  // return [
  //     <h1 key="h1">Test</h1>,
  //     <button key="button" onClick={props.toggle}>Toggle</button>
  //   ];
};

export default Controls;

