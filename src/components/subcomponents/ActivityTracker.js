import React from 'react'
import '../styles/ActivityTracker.css'

export default class ActivityTracker extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      mode: false,
      //false means input is a call being logged. true means input is a new task.
      draftInput: "",
    };
  }

  onDivClick = () => {
    this.setState({
      mode: !this.state.mode
    });
  }

  onSubmit = () => {
    return null;
    // add new data as a <li> to NextStep or PastActivity
  }

  handleChange = event => {
    this.setState({
      draftInput: event.target.value
    });
  }

  componentDidUpdate() {
    console.log(`Updated mode ${this.state.mode} and updated  draftInput ${this.state.draftInput}`)
  }

  render() {
    return(
      <>
        <ManualLogger 
          currentInput={this.state.draftInput}
          currentState={this.state.mode} 
          onClick={this.onDivClick} 
          handleChange={this.handleChange} 
          onSubmit={this.onSubmit}
        />
        <NextStep />
        <PastActivity />
      </>
    );
  }  
}

class ManualLogger extends React.Component {
  componentDidMount() {
    console.log("")
  }

  render(){
    return(
      <div className="manual-logger">
        <div className="grid-container">
          <div className="log-call"> Log a Call </div>
          <div className="new-task"> New Task </div>
          <div className="manual-logger-inputarea">
            <input type="text" onChange={this.props.handleChange} value={this.props.currentInput} />
            <button onClick={this.props.onSubmit}> Add </button> 
          </div>
        </div>
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

function PrettyList() {
  return null;
}
