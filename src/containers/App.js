import React, { Component } from 'react';
import './App.css';

import Persons from '../components/persons';
import Control from '../components/control'
import Car from '../components/car';

import Aux from '../patterns/hoc/aux';
import withClassArguments from '../patterns/hoc/with-class-arguments';
import AuthContext from '../patterns/context/auth-context';

class App extends Component {
  constructor(props) {
    // You can use this property only after super,
    // which refers to parent class constructor
    super(props);
    console.log('[App.js] constructor');
  }

  state = {
    persons: [
      { id: '1', name: 'Max', age: 28 },
      { id: '2', name: 'Peter', age: 21 },
      { id: '3', name: 'Tim', age: 30 }
    ],
    note: 'some additionals',
    count: 3,
    showPersons: true,
    authenticated: false
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
    // Following apporach guarantee, that you will change real previous state
    // and not some older one, because in case of multiple setState functions
    // could for example 'this.state.count + 1' cause a problem - BEST PRACTICE
    this.setState((prevState, props) => {
      return {
        persons: persons,
        count: prevState.count - 1
      };
    });
  }

  loginHandler = () => {
    this.setState({
      authenticated: true
    })
  }

  render() {
    console.log('count:' + this.state.count)

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
        <AuthContext.Provider value={{
          authenticated: this.state.authenticated,
          login: this.loginHandler
        }}>
          <Control
            toggle={this.togglePersonsHandler} />
          {persons}
        </AuthContext.Provider>
        <Car />
      </Aux>
      // Or is possible to use:
      // <WithClass classes="App" >...</WithClass>
    );
  }
}

export default withClassArguments(App, "App");
