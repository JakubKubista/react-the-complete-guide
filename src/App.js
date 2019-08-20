import React, { Component } from 'react';
import './App.css';

import Person from './components/person'
import Car from './components/car'

class App extends Component {

  state = {
    persons: [
      { name: 'Max', age: 28 },
      { name: 'Peter', age: 21 },
      { name: 'Tim', age: 30 }
    ],
    note: 'some additionals',
    showPersons: false
  }

  togglePersonsHandler = () => {
    this.setState({
      showPersons: !this.state.showPersons
    });
  }

  switchNameHandler = (event) => {
    console.log(event.target.value)
    this.setState({
      persons: [
        { name: event.target.value, age: 28 },
        { name: 'Peter', age: 21 },
        { name: 'Tim', age: 36 }
      ]
    })
  }
  render() {
    return (
      <div className="App" >
        <h1>Test</h1>
        <p>Works!</p>
        <button onClick={this.togglePersonsHandler}>Toggle</button>
        {
          this.state.showPersons ?
            <div>
              <Person
                name={this.state.persons[0].name}
                age={this.state.persons[0].age}
                id={0}
                change={this.switchNameHandler} />
              <Person
                name={this.state.persons[1].name}
                age={this.state.persons[1].age}
                id={1} />
              <Person
                name={this.state.persons[2].name}
                age={this.state.persons[2].age}
                id={2} >Children</Person>
            </div> : null
        }
        <Car />
      </div>
    );
  }
}

export default App;
