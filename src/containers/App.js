import React, { Component } from 'react';
import './App.css';

import Persons from '../components/persons';
import Control from '../components/control'
import Car from '../components/car';
import Aux from '../hoc/Aux';
import withClassArguments from '../hoc/WithClassArguments';

class App extends Component {

  state = {
    persons: [
      { id: '1', name: 'Max', age: 28 },
      { id: '2', name: 'Peter', age: 21 },
      { id: '3', name: 'Tim', age: 30 }
    ],
    note: 'some additionals',
    showPersons: true
  }

  togglePersonsHandler = () => {
    this.setState({
      showPersons: !this.state.showPersons
    });
  }

  changeNameHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(person => {
      return person.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    }
    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({ persons: persons });
  }

  deletePersonHandler = (index) => {
    const persons = [...this.state.persons];
    persons.splice(index, 1);
    this.setState({ persons: persons });
  }

  render() {

    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <Persons
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.changeNameHandler} />
      );
    }

    return (
      <Aux classes="App" >
        <Control toggle={this.togglePersonsHandler} />
        {persons}
        <Car />
      </Aux>
      // Or is possible to use:
      // <WithClass classes="App" >...</WithClass>
    );
  }
}

export default withClassArguments(App, "App");
