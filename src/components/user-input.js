import React from 'react';
import '../assets/style.css';

const UserInput = (props) => {
  return <input
    type="text"
    className="UserInput"
    placeholder={props.userName}
    onChange={props.change} />;
}

export default UserInput;