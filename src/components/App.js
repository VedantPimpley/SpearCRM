import React,{useEffect} from 'react';
import Pipeline from './Pipeline.js';
import Dashboard from './Dashboard.js';
import Accounts from './Accounts.js'; 
import AccountProfile from './AccountProfile.js';
import Leads from './Leads.js';
import LeadProfile from './LeadProfile.js'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './styles/App.css';

const API = process.env.REACT_APP_API

export default function App() {
  useEffect( () => {
    let timer = setInterval( () => {
      fetch(`${API}/main/get_order_from_email`)
      .then( response => 
        response.text()
        .then( text => {
          if (text === "Inserted") {alert(" New orders received from email. Refresh page to view changes.")}
        })
      )}, 300000);

    return () => {
      clearInterval(timer);
    }
  }, []);

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
          <Route path="/accounts" component={Accounts} />
          <Route path="/accountprofile" component={AccountProfile} />
          <Route path="/leads" component={Leads} />
          <Route path="/leadprofile" component={LeadProfile} />
          <Route path="/pipeline" component={Pipeline} />
          <Route path="/" component={Dashboard} />
        </Switch>
      </div>
    </Router>
  );
}