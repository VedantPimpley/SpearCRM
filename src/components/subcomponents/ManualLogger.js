import React from 'react'
import '../styles/ManualLogger.css'


export default class ManualLogger extends React.Component {
  componentDidMount() {
    console.log(this.props);
  }

  componentDidUpdate() {
    console.log(this.props);
  }

  //TODO:Create backend logic. Submitting new task with elapsed date (i.e. date that has already passed) sends it to past activity in the backend.
  //Refer notebook notes.

  render(){
    return(
      <div className="manual-logger">
        <ul className="segmented-control">
          <li className="segmented-control__item">
            <input className="segmented-control__input" type="radio"  value="call" name="option" id="option-1" defaultChecked />
            <label className="segmented-control__label" id="call" onClick={this.props.onClick} htmlFor="option-1">Log a Call</label>
          </li>
          <li className="segmented-control__item">
            <input className="segmented-control__input" type="radio" value="task" name="option" id="option-2" />
            <label className="segmented-control__label" id="task" onClick={this.props.onClick} htmlFor="option-2">New Task</label>
          </li>
        </ul>
        <div className="manual-logger-inputarea">
          <div>
            <input 
              type="date" 
              className="manual-logger-date" 
              onChange={this.props.handleDateChange} 
              value={this.props.draftDate} 
            />
          </div>
          <div>
            <input 
              type="text"
              onChange={this.props.handleChange}  
              value={this.props.currentInput} 
              placeholder={(this.props.type==="call" ? "Recap your call" : "Schedule new task/event")}
            />
            <button onClick={this.props.onSubmit}> Add </button> 
          </div>
        </div>
      </div>
    );
  }
}