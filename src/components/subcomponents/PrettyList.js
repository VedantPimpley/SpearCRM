import React from 'react'
import '../styles/PrettyList.css'

export default function PrettyList() {
  return(
    <div className="pretty-list">
      <ul class="experiences">
        <li class="blue">
          <div class="where">Past Event/Task</div>
          <div class="when">2020-04-01</div>
          <p class="description">Signed $10k deal</p>
         </li>
        <li class="green">
          <div class="where">Logged call</div>
          <div class="when">2020-03-01</div>
          <p class="description">Talked business</p>
         </li>
      </ul>
    </div>
  );
}