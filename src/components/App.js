import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
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

const API = process.env.REACT_APP_API || "https://ancient-mountain-97216.herokuapp.com"
const stocksAPI = process.env.REACT_APP_STOCKS_API || "brhln8nrh5ra2pui7160"

export default class App extends React.Component {
  state = {
    cache : {},
    isStartupSpinnerOn : true
  }

  companiesThisSession = new Set();
  waitingList = new Set();
  cachedCompanies = new Set();
  callCacheUpdaterAt = 0;
  timer1 = 0;
  timer2 = 0;

  //Javascript Set operations
  difference = (setA, setB) => {
    let _difference = new Set(setA)
    for (let elem of setB) {
        _difference.delete(elem)
    }
    return _difference
  }

  union = (setA, setB) => {
    let _union = new Set(setA)
    for (let elem of setB) {
        _union.add(elem)
    }
    return _union
  }

  componentDidMount() {
    this.receiveCompanyNamesDuringStartup()
    .then( ()=> {
      //timer checks if cacheUpdater should be called every second
      //as a result, cacheUpdater is called in 1 minute intervals between a response and next call
      this.timer1 = setInterval( () => {
        if (Date.now() > this.callCacheUpdaterAt 
            && this.waitingList.size > 0) 
        {
          this.cacheUpdater()
          .then( () => this.callCacheUpdaterAt = Date.now() + 60000)
        }
      }, 1000)
    });
  }

  componentWillUnmount(){
    //clear timers
    clearInterval(this.timer1);
    clearInterval(this.timer2);
  }
  
  
  //populates  the waitingList on startup
  receiveCompanyNamesDuringStartup = async () => {
    let initialCompanies = new Set();

    fetch(`${API}/main/show_all_orders`)
    .then(response => {
      response.json()
      .then( allOrders => {
        console.log(allOrders);
        allOrders.map( order => initialCompanies.add(order.company) );

        this.waitingList = initialCompanies;
      })
    })
  }
      
  receiveCompanyNamesDuringRuntime = companies => {
    this.companiesThisSession = this.union(this.companiesThisSession, new Set(companies))
		// new companies is a misnomer. It consists of new companies AND the companies which were earlier cached 
		// but were cleared from cachedCompanies because we do that every 5 minutes for freshness of data
		let newCompanies = this.difference(this.companiesThisSession, this.cachedCompanies)
		this.waitingList = this.union(this.waitingList, newCompanies)
  }

  //this function is called after all companies are cached during startup
  //at that time, we begin the timers which are responsible for 
  //(i) periodically emptying cachedCompanies set
  //(ii) periodically calling the get_order_from_email API
  startAdditionalTimers = () => {
    this.timer2 = setInterval( () => {
      //(i)
      this.cachedCompanies.clear(); 

      //(ii)
      fetch(`${API}/main/get_order_from_email`)
      .then( response => 
        response.text()
        .then( text => {
          if (text === "Inserted") {alert(" New orders received from email. Refresh page to view changes.")}
        })
      )
    }, 300000);
  }

  cacheUpdater = async() => {
    if(this.waitingList.size === 0) { return null; }

    //therefore, below code executes when elements ARE present in waitingList
    let n = this.waitingList.size > 30 ? 29 : this.waitingList.size;
		let ApiInput = [...this.waitingList].slice(0,n);
		let ApiOutput = {};
    let priceFoundCompanies = new Set();
    console.log(this.waitingList);
    console.log(ApiInput);

    Promise.all( ApiInput.map(elem => this.getPrice(elem)) )
		.then( responses => {
			responses.forEach( resp => {
				if (resp.price !== null) {
					ApiOutput[resp.company] = resp.price;
					priceFoundCompanies.add(resp.company);
				}
      })
      
      //update variables
      this.setState({ cache: {...this.state.cache, ...ApiOutput} }) //merging of two objects
      this.cachedCompanies = this.union(this.cachedCompanies, priceFoundCompanies);
      this.waitingList = this.difference(this.waitingList, priceFoundCompanies);
  
      console.log(this.state.cache);
      //below code disables the loading spinner when all companies prices
      //are done caching during startup
      if (this.state.isStartupSpinnerOn && this.waitingList.size === 0) {
        this.setState({ isStartupSpinnerOn: false }, this.startAdditionalTimers())
      }
    })
  }

  getPrice = async(company) => {
    //notice the URL formatting here: .NS appended and toUpperCase applied
    let promise = fetch(`https://finnhub.io/api/v1/quote?symbol=${company.toUpperCase()}.NS&token=${stocksAPI}`);

     //returns company's price
    let price = await promise.then( response => response.json().then( data => data.c ) ).catch( err => null );

    let output = { company: company, price: price };
    return(output);
  }

  render() {
    return(
      <>
        <Backdrop className="spinner-backdrop" open={this.state.isStartupSpinnerOn}>
          <CircularProgress color="inherit" />
          <p style={{ fontWeight: 800 }}> &nbsp; Loading stock prices </p>
        </Backdrop>

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
              <Route 
                path="/accounts" 
                component={Accounts} 
              />

              <Route 
                path="/accountprofile" 
                render = {() => 
                  <AccountProfile 
                    cache = {this.state.cache}
                    receiveCompanyNamesDuringRuntime = {this.receiveCompanyNamesDuringRuntime}  
                  />
                }
              />

              <Route 
                path="/leads" 
                component={Leads} 
              />

              <Route 
                path="/leadprofile" 
                component={LeadProfile} 
              />

              <Route 
                path="/pipeline" 
                render = {() => 
                  <Pipeline 
                    cache = {this.state.cache} 
                    receiveCompanyNamesDuringRuntime = {this.receiveCompanyNamesDuringRuntime}
                  />
                }
              />

              <Route 
                path="/" 
                component={Dashboard} 
              />

            </Switch>
          </div>
        </Router>
      </>
    );
  }
}