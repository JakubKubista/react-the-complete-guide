import React, { Component } from 'react';
import './App.css';

import UserInput from './components/user-input'
import UserOutput from './components/user-output'

// 1 Create TWO new components: UserInput and UserOutput
// 2 UserInput should hold an input element, UserOutput two paragraphs
// 3 Output multiple UserOutput components in the App component (any paragraph texts of your choice)
// 4 Pass a username (of your choice) to UserOutput via props and display it there
// 5 Add state to the App component (=> the username) and pass the username to the UserOutput component
// 6 Add a method to manipulate the state (=> an event-handler method)
// 7 Pass the event-handler method reference to the UserInput component and bind it to the input-change event
// 8 Ensure that the new input entered by the user overwrites the old username passed to UserOutput
// 9 Add two-way-binding to your input (in UserInput) to also display the starting username
// 10 Add styling of your choice to your components/ elements in the components - both with inline styles and stylesheets

class App extends Component {

  state = {
    userName: 'Jakub'
  }

  inputChange = (event) => {
    this.setState({
      userName: event.target.value
    })
  }

  render() {
    return (
      <div className="App" >

        <UserInput
          change={this.inputChange}
          userName={this.state.userName} />

        <UserOutput
          userName={this.state.userName} />
        <UserOutput
          userName={this.state.userName} />
        <UserOutput
          userName="Max" />

      </div>
    );
  }
}

export default App;
