import React from 'react';

export default function Dashboard() {
	return(
	  <div className="flex-container">
			<div id="piechart" />
			<div id="funnelchartContainer" />
		  <div id="linechartContainer" />
		  <div className="eventsWidget">
				<h1> &nbsp; Tasks </h1>
				<div className="eventsScroller">
					<ul>
						<li className="event" > Call Company X </li>
						<li className="eventDate" > Nov. 8 </li>
						<li className="event"> Meeting with ABC</li>
						<li className="eventDate" > Nov. 11 </li>
						<li className="event"> Email XYZ </li>
						<li className="eventDate" > Nov. 11 </li>
						<li className="event"> Transact Lorem's order </li>
						<li className="eventDate" > &nbsp; </li>
					</ul>
				</div>
			</div>
		</div>
	); 
}  