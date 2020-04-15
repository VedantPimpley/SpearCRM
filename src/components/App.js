import React from 'react';
import PeopleTable from './people.js'; 
import Pipeline from './pipeline.js';
import Dashboard from './dashboard.js';
import Profile from './profile.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './styles/App.css';

export default function App() {
  return(
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/dashboard"> Dashboard </Link>
            </li>
            <li>
              <Link to="/people"> People </Link>
            </li>
            <li>
              <Link to="/pipeline"> Pipeline </Link>
            </li>  
          </ul>  
        </nav>

        <Switch>
          <Route path="/people">
            <PeopleTable />
          </Route>
          <Route path="/pipeline">
            <Pipeline />
          </Route>
          <Route path="/profile" component={Profile} />
          <Route path="/">
            <Dashboard />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}