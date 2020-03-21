import React from 'react';
import PeopleTable from './people.js'; 
import Pipeline from './pipeline.js';
import Dashboard from './dashboard.js'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';

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
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/people">
            <PeopleTable />
          </Route>
          <Route path="/pipeline">
            <Pipeline />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}