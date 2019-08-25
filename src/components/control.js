import React from 'react';
import Aux from '../patterns/hoc/aux';
import AuthContext from '../patterns/context/auth-context'

const controls = props => {
  // Better apporach than array is Auxiliary, but even better is React.Fragment
  return <Aux>
    <h1 key="h1">Test</h1>
    <button key="button-1" onClick={props.toggle}>Toggle</button>
    <AuthContext.Consumer>
      {context =>
        <button key="button-2" onClick={context.login}>Log in</button>
      }
    </AuthContext.Consumer>
  </Aux>;

  // We can deal with elements as with array, but it is not the best approach
  // return [
  //     <h1 key="h1">Test</h1>,
  //     <button key="button" onClick={props.toggle}>Toggle</button>
  //   ];
};

export default controls;

