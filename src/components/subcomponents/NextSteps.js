import React from 'react'
import '../styles/PrettyList.css'
import {convertIsoDateToDateString} from "../Dashboard.js"
import CloseIcon from '@material-ui/icons/Close';
import StarRateIcon from '@material-ui/icons/StarRate';

export default function NextSteps(props) {

  const transitionActivity = async (activityId, isAiActivity) => {
    const activityToTransition = {
      "_id" : activityId,
      "activity_type" : "past"
    };

    const response = await fetch("/main/change_activity_type", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(activityToTransition)
    });

    if (response.ok) {
      if (isAiActivity && props.lead === 0) {
        props.updateAccountDataAndOrdersAndActivities();
      }
      //isAiActivity is 1 for activities generated through automation. 
      //Deleting an AI generated activity might involve deletion of corresponding order and updating activity data
      //props.lead indicates the grandparent page. prop.lead===0 being true means AccountProfile is the grandparent.
      else {
        props.updateActivities();
      }
      //User generated activities can be deleted without updating orders and activities.
      //an AI generated activity can cause wider changes than user generated activity upon transition.
    }
  }

  const deleteActivity = (activityId, isAiActivity) => {
		fetch(`/main/delete_activity/${activityId}`)
		.then( () => {
      if (isAiActivity) {
        props.updateAccountDataAndOrdersAndActivities();
      }
      //isAiActivity is 1 for activities generated through automation
      else {
        props.updateActivities();
      }
    });
  }
  
  const dummyActivities = [
    {"_id": "5eaade1967f5adbdd24460a7", "title": "Finalize Amol's order", "body": "eh", "date": "2020-02-04T15:08:56.000Z", "activity_type": "future", "user_id": "5ea58fbc63e50fc607cf6a10", "elapsed": 0, "ai_activity": 1},
    {"_id":"5eaade2467f5adbdd24460a9", "title": "Finalize Amol's order", "body": "eh", "date": "2020-02-04T15:08:56.000Z", "activity_type":"past", "user_id": "5ea51dfc0498e7340c7c7225", "elapsed": 1, "ai_activity": 1},
    {"_id":"5eaade2467f5adbdd2446010", "title": "Finalize Amol's order", "body": "eh", "date": "2020-02-04T15:08:56.000Z", "activity_type":"past", "user_id": "5ea51dfc0498e7340c7c7225", "elapsed": 1, "ai_activity": 0},
    {"_id":"5eaade2467f5adbdd2446011", "title": "Finalize Amol's order", "body": "eh", "date": "2020-02-04T15:08:56.000Z", "activity_type":"past", "user_id": "5ea51dfc0498e7340c7c7225", "elapsed": 1, "ai_activity": 0},
    {"_id":"5eaade2467f5adbdd2446012", "title": "Finalize Amol's order", "body": "eh", "date": "2020-02-04T15:08:56.000Z", "activity_type":"past", "user_id": "5ea51dfc0498e7340c7c7225", "elapsed": 1, "ai_activity": 1},
  ];

  return(
    <> 
      <h2> Next Steps </h2>
      <div className="pretty-list">
        
        <ul className="experiences">
          {dummyActivities.map( (element, i) => {
            return (
              <li className="blue" key={i}>
                
              	{element.ai_activity ?
                  <div style={{color: "#1976d2" }}>
                    <span className='ai-tag'> 
                      <StarRateIcon />   
                    </span>
                    <span>
                      AI Generated
                    </span>
                  </div>
                  : null
                }

                <input 
                  className="largerCheckbox" 
                  type="checkbox" 
                  checked={false}
                  onClick={() => {transitionActivity(element._id, element.ai_activity)}}
                />

                <div className="where"> 
                  {element.title} 
                </div>


                <span className="when"> 
                  {convertIsoDateToDateString(element.date)} 
                </span>

                <span  className="cross" onClick={() => {deleteActivity(element._id, element.ai_activity)}}> <CloseIcon /> </span>

                <p className="description"> 
                  {element.body} 
                </p>
             </li>
            );
          })
          }
        </ul>
      </div>
    </>
  );
}