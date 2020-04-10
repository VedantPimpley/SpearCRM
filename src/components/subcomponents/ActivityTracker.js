import React from 'react'
import '../styles/ActivityTracker.css'
import ManualLogger from './ManualLogger.js'

export default class ActivityTracker extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      mode: "call", //other mode is task
      draftInput: "",
      draftDate: new Date().toJSON().slice(0,10).replace(/-/g,'/'),
    };
  }

    
  onTabChange = event => {
    this.setState({
      mode: event.target.value
    }); 
  }

  handleDateChange = event => {
    this.setState({
      draftDate: event.target.value
    });
  }

  handleChange = event => {
    this.setState({
      draftInput: event.target.value
    });
  }

  onSubmit = () => {
    return null;
    // add new data as a <li> to NextStep or PastActivity
  }

  componentDidUpdate() {
    console.log(`Updated mode ${this.state.mode} and updated  draftInput ${this.state.draftInput}`)
  }

  render() {
    return(
      <>
        <ManualLogger 
          draftDate={this.state.draftDate}
          draftInput={this.state.draftInput}
          currentState={this.state.mode} 
          onClick={this.onTabChange} 
          handleChange={this.handleChange} 
          handleDateChange={this.handleDateChange} 
          onSubmit={this.onSubmit}
        />
        <NextStep />
        <PastActivity />
      </>
    );
  }  
}

function NextStep() {
  return(
    <PrettyList />
    // with listItems as the one recommendation made by AI Core from backend
  );
}

function PastActivity() {
  return(
    <PrettyList />
    // with listItems as the recent history of client-customer interactions
  );
}

function PrettyList() {
  return null;
}


//Date selector/component
//Text Input
//State is stored in segmentedControl
