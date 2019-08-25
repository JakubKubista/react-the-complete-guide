import React, { Fragment, useContext } from 'react';
import AuthContext from '../patterns/context/auth-context'

const Controls = props => {
  // Better than AuthContext.Consumer
  const authContext = useContext(AuthContext);

  // Better than array is Auxiliary, but even better is React.Fragment
  return <Fragment>
    <h1 key="h1">Test</h1>
    <button key="button-1" onClick={props.toggle}>Toggle</button>
    <button key="button-2" onClick={authContext.login}>Log in</button>
  </Fragment>;

  // We can deal with elements as with array, but it is not the best approach
  // return [
  //     <h1 key="h1">Test</h1>,
  //     <button key="button" onClick={props.toggle}>Toggle</button>
  //   ];
};

export default Controls;

