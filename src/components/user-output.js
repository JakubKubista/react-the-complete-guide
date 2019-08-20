import React, { Component } from 'react';

class UserInput extends Component {

  render() {
    const style = {
      label: {
        color: 'grey',
        fontSize: '12px',
        paddingBottom: 0,
        marginBottom: '5px'
      },
      output: {
        paddingTop: 0,
        marginTop: 0,
        textDecoration: 'bold'
      }
    }

    return (
      <div>
        <p style={style.label}>User Name</p>
        <p style={style.output}>{this.props.userName}</p>
      </div>
    );
  }
}

export default UserInput;