import React from 'react';
import NewActivityDialogBox from './NewActivityDialogBox';
import { Link } from 'react-router-dom';
import StarRateIcon from '@material-ui/icons/StarRate';
import CancelIcon from '@material-ui/icons/Cancel';
import AuthContext from '../Other/AuthContext.js';
import { prepareGETOptions } from '../Other/helper.js';
import {convertIsoDateToDateString} from "../Other/helper.js"
import '../styles/UpcomingTasksWidget.css'

const API = process.env.REACT_APP_API || "https://ancient-mountain-97216.herokuapp.com"

export default class UpcomingTasksWidget extends React.Component {
  static contextType = AuthContext;

	transitionActivity = async (activityId) => {
    this.props.setOpenSpinnerInDashboard(true);
    
    const activityToTransition = {
      "_id" : activityId,
      "activity_type" : "past",
      "company" : this.props.cache,
    };
    
		const response = await fetch(`${API}/main/change_activity_type`, {
      method: "POST",
      withCredentials: true,
      headers: {'access-token': this.context, 'Content-Type': 'application/json'},
      body: JSON.stringify(activityToTransition)
		});

		if (response.ok) {
      this.props.updateDashboard();
      this.props.setOpenSpinnerInDashboard(false); 
		}
	}
	
	deleteActivity = (activityId) => {
    this.props.setOpenSpinnerInDashboard(true);

		fetch(`${API}/main/delete_activity/${activityId}`, prepareGETOptions(this.context))
    .then( () => this.props.updateDashboard())
    .then( () => this.props.setOpenSpinnerInDashboard(false))
	}

  render() {
    return(
      <>
        <div className="upcoming-tasks-widget">

          <div className='tasks-widget-title'> 
  					&nbsp; Upcoming Tasks 
  					<span className="new-task-button"> 
              <NewActivityDialogBox 
                updateDashboard = {this.props.updateDashboard} 
                setOpenSpinnerInDashboard = {this.props.setOpenSpinnerInDashboard} 
              /> 
  					</span> 
  				</div>

      		<div className="tasks-scroller-container">
      			<ul className="tasks-list">
  						{
                this.props.activitiesList.sort( (a,b) => new Date(b.date) - new Date(a.date) ) //sort by most recent
                .map( (element,i) => {
  								return(							
  									<div key={i} >
  										
                      
                      {element.ai_activity ? 
                        <div className='ai-tag'>
                          <span className='ai-tag-star-icon'> 
                            <StarRateIcon />   
                          </span>
                          <span>
                            AI Generated
                          </span>
                        </div>
                        :
                        <p> &nbsp; </p>
                      }

  										<li>
                        &nbsp; 
                        <input 
                          type="checkbox" 
                          className="largerCheckbox" 
                          checked={false}
                          onClick={() => {this.transitionActivity(element._id)}} 
                        />

                        <Link to={ {pathname: "/accountprofile", state: {cid: element.user_id}} } >
                          <span className="task-title">
                            &nbsp; {element.title}                      
                          </span>
                        </Link>  

                        <span className="task-date">  {convertIsoDateToDateString(element.date)} </span> 
                        <span className="delete-icon" onClick={() => {this.deleteActivity(element._id)}}> <CancelIcon /> </span>
  										</li>

  										<li className="task-body"> &nbsp; &nbsp; &nbsp; &nbsp;{element.body} </li>
  									</div>
  								);
  							})
  						}
      			</ul>
          </div>
        </div>
      </>
    );
  }
}