import React from 'react'
import '../styles/ManualLogger.css'


export default class ManualLogger extends React.Component {
  componentDidMount() {
    console.log(this.props);
  }

  componentDidUpdate() {
    console.log(this.props);
  }

  render(){
    return(
      <div className="manual-logger">
        <div className="grid-container">
          <ul className="segmented-control">
            {/* TODO: STATE CHANGE IN MODE SHOULD OCCUR WHEN TABS ARE SELECTED*/}
            <li className="segmented-control__item">
              <input className="segmented-control__input" type="radio" onClick={this.props.onTabChange} value="call" name="option" id="option-1" defaultChecked />
              <label className="segmented-control__label" htmlFor="option-1">Log a Call</label>
            </li>
            <li className="segmented-control__item">
              <input className="segmented-control__input" type="radio" onClick={this.props.onTabChange} value="task" name="option" id="option-2" />
              <label className="segmented-control__label" htmlFor="option-2">New Task</label>
            </li>
          </ul>
          <div className="manual-logger-inputarea">
            <input 
              type="date" 
              className="manual-logger-date" 
              onChange={this.props.handleDateChange} 
              value={this.props.draftDate} 
            />
            <input 
              type="text"
              onChange={this.props.handleChange}  
              value={this.props.currentInput} 
            />
            <button onClick={this.props.onSubmit}> Add </button> 
          </div>
        </div>
      </div>
    );
  }
}