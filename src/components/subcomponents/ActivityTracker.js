import React from 'react'
import '../styles/ActivityTracker.css'
import ManualLogger from './ManualLogger.js'

export default class ActivityTracker extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      type: "call", //other type is task
      draftInput: "",
      draftDate: new Date().toJSON().slice(0,10),
    };
  }

  // TODO:GROUP TOGETHER ALL CHANGLE HANDLERS

  onTabChange = event => {
    this.setState({
      type: event.target.id
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
    console.log(this.state);
    // TODO: DIRECTLY TAKE THIS AS A NEW ENTRY TO UPDATE BACKEND
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  render() {
    return(
      <>
        <ManualLogger 
          draftDate={this.state.draftDate}
          draftInput={this.state.draftInput}
          type={this.state.type} 
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
