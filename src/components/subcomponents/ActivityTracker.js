import React from 'react'
import '../styles/ActivityTracker.css'
import ManualLogger from './ManualLogger.js'
import PrettyList from './PrettyList.js'

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
    const activity = this.state;
    const response = fetch('/add_activity', {
      method: 'POST',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify()
    });

    if (response.ok) {
      console.log("Response to add_activity worked");
    }
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  render() {
    return(
      <div className="activity-tracker-container">
        <h3> Activity Tracker</h3>
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
      </div>
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

//Date selector/component
//Text Input
//State is stored in segmentedControl
