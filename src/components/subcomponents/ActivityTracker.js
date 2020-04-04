import React from 'react';

class ActivityTracker extends React.Component {
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

  render() {
    return(
      <>
        <ManualLogger onDivClick={this.onDivClick} onSubmit={this.onSubmit} handleChange={this.props.handleChange} />
        <NextStep />
        <PastActivity />/p
      </>
    );
  }  
}

function ManualLogger() {
  return(
    <div className="manual-logger-container">
      <div className="manual-logger-header">
        <div className="log-call"> Log a Call </div>
        <div className="new-task"> New Task </div>
      </div>
      <div className="manual-logger-inputarea">
        <input type="text" onChange={this.props.handleChange} value={this.props.draftInput} />
        <button onClick={this.props.onSubmit}> Add </button> 
      </div>
    </div>
  );
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
