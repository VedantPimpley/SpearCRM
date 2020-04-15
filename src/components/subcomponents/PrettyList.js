import React from 'react'
import '../styles/PrettyList.css'

export default function PrettyList() {
  return(
    <div className="pretty-list">
      <ul class="experiences">
        {sample_activity.map( (element, i) => {
          return (
            <li class="blue" key={i}>
              <div class="where"> {element.activityTitle} </div>
              <div class="when"> {element.activityData} </div>
              <p class="description"> {element.activityBody} </p>
           </li>
          );
        })
        }
      </ul>
    </div>
  );
}

const sample_activity = [
  {
    activityTitle: "Past Event/Task",
    activityData: "2020-04-01",
    activityBody: "Signed $10k deal",
  },
  {
    activityTitle: "Logged call",
    activityData: "2020-03-01",
    activityBody: "Talked business",
  },
  {
    activityTitle: "Sent email",
    activityData: "2020-04-04",
    activityBody: "Sent prospective deal",
  },
];