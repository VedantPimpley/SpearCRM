import React from 'react';
import Accounts from './Accounts.js'; 
import Pipeline from './pipeline.js';
import Dashboard from './dashboard.js';
import Profile from './profile.js';
import Leads from './Leads.js';
import LeadProfile from './LeadProfile.js'

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
              <Link to="/accounts"> Accounts </Link>
            </li>
            <li>
              <Link to="/leads"> Leads </Link>
            </li>
            <li>
              <Link to="/pipeline"> Pipeline </Link>
            </li>  
          </ul>  
        </nav>

        <Switch>
          <Route path="/accounts">
            <Accounts />
          </Route>
          <Route path="/accountprofile" component={Profile} />
          <Route path='/leads'>
            <Leads />
          </Route>
          <Route path="/leadprofile" component={LeadProfile} />
          <Route path="/pipeline">
            <Pipeline />
          </Route>
          <Route path="/">
            <Dashboard />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}