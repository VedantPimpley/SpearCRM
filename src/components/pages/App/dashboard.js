import React from 'react';
import './dashboard.css';
import Chart from 'react-google-charts';

export default function Dashboard() {
	return(
	  <div className="flex-container">
			<Piechart />
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

const pieOptions = {
  title: "",
  pieHole: 0,
  slices: [
    {
      color: "#2BB673"
    },
    {
      color: "#d91e48"
    },
    {
      color: "#007fad"
    },
    {
      color: "#e9a227"
    }
  ],
  legend: {
    position: "bottom",
    alignment: "center",
    textStyle: {
      color: "233238",
      fontSize: 14
    }
  },
  tooltip: {
    showColorCode: true
  },
  chartArea: {
    left: 0,
    top: 0,
    width: "100%",
    height: "80%"
  },
  fontName: "Roboto"
};

class Piechart extends React.Component {
  state = {
    chartImageURI: ""
  };
  render() {
    return (
      <div className="App">
        <Chart
          chartType="PieChart"
					data={[
						['Lead', 'Size'],
					  ['Individuals', 5],
					  ['Small Enterprise', 29],
					  ['Medium Enterprise', 56],
						['Large Enterprise', 8],
					]}
          options={pieOptions}
          graph_id="PieChart"
          width={"100%"}
          height={"400px"}
          legend_toggle
        />
      </div>
    );
  }
}