import React, { Component } from 'react';
import './App.css';

import Persons from '../components/persons';
import Control from '../components/control'
import Car from '../components/car';

class App extends Component {
  // [Creating] Lifecycle Hook
  // Init states etc.
  constructor(props) {
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
    showPersons: false,
    showControl: true
  }

  // [Creating, Updating props] Lifecycle Hook
  // Sync State to Props - use rarely, it will show warning if you do not use it
  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedStateFromProps');
    return state;
  }

  // [Updating] Lifecycle Hook
  // Cancel/Continue updating process - optimalization - use rarely (e.g. disable button)
  // shouldComponentUpdate(nextProps, nextState) {
  //  return true; // true is default
  // }

  // [Updating props] Lifecycle Hook
  // For updating internal states, warnings with getSnapshotBeforeUpdate
  // Not supported with many other workflows of newer verison of React
  // componentWillReceiveProps(props) {
  //  console.log('[App.js] componentWillReceiveProps', props)
  // }

  // [Creating] Lifecycle Hook
  // Cause Side-effects - only old versions of React supports
  // componentWillMount() {
  //   console.log('[App.js] componentWillMount')
  // }

  // [Creating] Lifecycle Hook
  // Not supported in newer versions of React - should not be used
  // componentWillUpdate() {
  //   console.log('[App.js] componentWillUpdate')
  //   return true;
  // }

  // Methods
  togglePersonsHandler = () => {
    this.setState({
      showPersons: !this.state.showPersons
    });
  }

  toggleControlHandler = () => {
    this.setState({
      showControl: !this.state.showControl
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

  // [Creating, Updating] Lifecycle Hook
  // After componentWillMount and before componentDidMount
  render() {
    console.log('[App.js] render');
    let persons = null;
    let control = null;

    if (this.state.showPersons) {
      persons = (
        <Persons
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.changeNameHandler} />
      );
    }

    if (this.state.showControl) {
      control = (
        <Control
          toggle={this.togglePersonsHandler}
          personsLength={this.state.persons.length} />
      );
    }

    return (
      <div className="App" >
        <button onClick={this.toggleControlHandler}>Toggle Control</button>
        {control}
        {persons}
        <Car />
      </div>
    );
  }

  // [Creating] Lifecycle Hook
  // Cause Side-effects
  componentDidMount() {
    console.log('[App.js] componentDidMount')
  }

  // [Updating] Lifecycle Hook
  // Last-minute DOM optimalization - use rarely
  // This does not updating DOM, but can be used for example to get scrolling position.
  // getSnapshotBeforeUpdate(prevProps, prevState) {
  //  return null; // returns Snapshot of earlier props
  // }

  // [Updating] Lifecycle Hook
  // Cause Side-effects like http requests (be careful about infinite loop)
  componentDidUpdate() {
    console.log('[App.js] componentDidUpdate')
  }
}

export default App;
