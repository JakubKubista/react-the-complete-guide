import React, { Component } from 'react';

import { BrowserRouter, Switch, Route, NavLink, Redirect } from 'react-router-dom';

import Task from './containers/Task/Task';
import Courses from './containers/Courses/Courses';
import Users from './containers/Users/Users';

class App extends Component {
  render () {
    return (
      <div className="App">
        <br />
        <BrowserRouter>
          <div className="Menu">
            <nav>
              <li>
                <NavLink to="/" exact>Task</NavLink>
              </li>
              <li>
                <NavLink to="/users">Users</NavLink>
              </li>
              <li>
                <NavLink to="/courses">Courses</NavLink>
              </li>
            </nav>

            <Switch>
              <Route path="/" exact component={Task} />
              <Route path="/users" component={Users} />
              <Route path="/courses" component={Courses} />
              <Redirect from="/all-courses" to="/courses" />
              <Route render={() => <h1>Not found</h1>} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
