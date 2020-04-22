import React from 'react'
import '../styles/ActivityTracker.css'
import ManualLogger from './ManualLogger.js'
import PrettyList from './PrettyList.js'
import NextSteps from './NextSteps'

export default class ActivityTracker extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      type: "call", //other type is task
      //In JSON post: if type=="call", activityTitle="Logged a call", activityBody={draftInput}, activityDate={draftDate}
      draftInput: "",
      draftDate: new Date().toJSON().slice(0,10),
    };
  }

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
        <EmailAutomator />
        <NextSteps />
        <PastActivity />
      </div>
    );
  }  
}

function PastActivity() {
  return(
    <PrettyList />
    // with listItems as the recent history of client-customer interactions
  );
}

class EmailAutomator extends React.Component {
  render() {
    let emailTo = "testing@gmail.com";
    let emailSubject = "Testing whether email automation could work well";
    let emailBody = "It seems that email automation could work well. I can't guarantee it, but this solution is great."
    let emailHref = ("https://mail.google.com/mail?view=cm&fs=1" +
      (emailTo ? ("&to=" + encodeURIComponent(emailTo)) : "") +
      (emailSubject ? ("&su=" + encodeURIComponent(emailSubject)) : "") +
      (emailBody ? ("&body=" + encodeURIComponent(emailBody)) : ""));
    //cc and bcc are parameters that are also available
    return(
      <>
        <div> 
          <a style={{fontSize:24}} href={emailHref} target="_blank"> &#9993; Draft automated email  
          </a>
        </div>
      </>
    );
  }
}

//Date selector/component
//Text Input
//State is stored in segmentedControl



// "1234": {"name":"Amol", "age": "21"
//           "userCreatedActivity":[
            
//             { activityTitle:"call", activityBody: "Meeting with XYZ", taskDate:"2020-10.."},
//             { activityTitle:"event", activityBody: "Meeting with XYZ", taskDate:"2020-10.."},
//           ]
// }

// { type:"airecommendedstep", taskBody:"Confirm the order with XYZ", taskDate:" "}

// Activity: uid, title(Logged a call, Task/Event), Date, Body