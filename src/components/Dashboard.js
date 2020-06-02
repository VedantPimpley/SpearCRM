import React, {useState, useEffect, useRef} from 'react';
import './styles/Dashboard.css';
import Chart from 'react-google-charts';
import CanvasJSReact from './Other/canvasjs.react';
import TopOpportunitiesWidget from './subcomponents/TopOpportunitiesWidget.js'
import NewActivityDialogBox from './subcomponents/NewActivityDialogBox';
import { Link } from 'react-router-dom';
import StarRateIcon from '@material-ui/icons/StarRate';

export default function Dashboard() {
	const [topLeads, setTopLeads] = useState([]);
	const [topAccounts, setTopAccounts] = useState([]);
	const [allActivities, setAllActivities] = useState([]);
	const [pieChartData, setPieChartData] = useState([]);
	const [lineChartData, setLineChartData] = useState([]);

  const _isMounted = useRef(true);
	useEffect( () => {
		Promise.all([
      fetch("/main/top_leads"),
      fetch("/main/top_accounts"),
      fetch("/main/show_all_activities"),
      fetch("/main/get_line_graph_data"),
      fetch("/main/get_pie_chart_data")
    ])
		.then(responses => {
      if (_isMounted.current) {
        responses[0].json().then( data => setTopLeads(data) );
        responses[1].json().then( data => setTopAccounts(data) );
        responses[2].json().then( data => setAllActivities(data) );
        responses[3].json().then( data => setLineChartData(data) );
        responses[4].json().then( data => setPieChartData(data) );
      }
    })
    
    return () => _isMounted.current = false;
	}, []);

	const updateDashboardAPICall = () => {
		Promise.all([
      fetch("/main/top_leads"),
      fetch("/main/top_accounts"),
      fetch("/main/show_all_activities"),
      fetch("/main/get_line_graph_data"),
      fetch("/main/get_pie_chart_data")
    ])
		.then(responses => {
			if (_isMounted.current) {
        responses[0].json().then( data => setTopLeads(data) );
        responses[1].json().then( data => setTopAccounts(data) );
        responses[2].json().then( data => setAllActivities(data) );
        responses[3].json().then( data => setLineChartData(data) );
        responses[4].json().then( data => setPieChartData(data) );
      }
		})
	}

	return(
    <div className="grid-container">
			<TopOpportunitiesWidget 
				topLeads = {topLeads} 
				topAccounts = {topAccounts}
			/>
      <LineChart 
        lineChartData = {lineChartData}
      />
      <PieChart 
        pieChartData = {pieChartData}
      />
			<UpcomingTasksWidget 
				updateDashboard = {updateDashboardAPICall}
				activitiesList = {allActivities.filter( activity => activity["activity_type"] === "future" )}
			/>
    </div>
	); 
} 

const pieOptions = {
  title: "Lead Size",
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
    height: "85%"
  },
  fontName: "Roboto"
};
class PieChart extends React.Component {
  state = {
    chartImageURI: ""
  };

  transformOrdersToDataPoints = (orders) => {
    let dataPoints = [
      ['Stage', 'Volume'],
      ['Received', 0],
      ['Finalized', 0],
      ['To-be-transacted', 0],
      ['Transacted', 0],
    ];

    orders.forEach( element => {
      switch(element.stage) {
        case 1:
          dataPoints[1][1] = dataPoints[1][1] + 1;
          break;
        case 2:
          dataPoints[2][1] = dataPoints[2][1] + 1;
          break;
        case 3:
          dataPoints[3][1] = dataPoints[3][1] + 1;
          break;
        case 0:
          dataPoints[4][1] = dataPoints[4][1] + 1;
          break;
        default:
          break;
      }
    });

    return dataPoints;
  }

  render() {
    return (
      <div className="pieChartContainer">
        <Chart
          chartType = "PieChart"
          data = {this.transformOrdersToDataPoints(this.props.pieChartData)}
          
          // [
					// 	['Stage', 'Volume'],
					//   ['Received', 5],
					//   ['Finalized', 29],
					//   ['To-be-transacted', 56],
					// 	 ['Transacted', 8],
					// ]
          options = {pieOptions}
          graph_id = "Distribution of orders currently"
          width = {"100%"}
          height = {"100%"}
          legend_toggle
        />
      </div>
    );
  }
}

var CanvasJSChart = CanvasJSReact.CanvasJSChart;
class LineChart extends React.Component {
  transformOrdersToDataPoints = (orders) => {
    let dataPoints = [	
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 3, y: 0 },
      { x: 4, y: 0 },
      { x: 5, y: 0 },
      { x: 6, y: 0 },
      { x: 7, y: 0 },
      { x: 8, y: 0 },
      { x: 9, y: 0 },
      { x: 10, y: 0 },
      { x: 11, y: 0 },
      { x: 12, y: 0 },
    ];

    orders.forEach( element=> {
      dataPoints[element.month - 1].y += element.no_of_shares*element.cost_of_share;
    });

    dataPoints.forEach( element => {
      element.y = element.y/1000;
    });

    return dataPoints;
  }

	render() {
		const lineOptions = {
			animationEnabled: true,
			exportEnabled: true,
			theme: "light2", // "light1", "dark1", "dark2"
			title:{
				text: "Revenue generated"
			},
			axisY: {
				title: "Revenue (in Rs.)",
				includeZero: false,
        suffix: "k",
			},
			axisX: {
				title: "Month",
				prefix: "",
				interval: 1
			},
			data: [{
				type: "line",
				toolTipContent: "Week {x}: Rs. {y}",
				dataPoints: this.transformOrdersToDataPoints(this.props.lineChartData)
			}]
		}
		return (
		<div className="line-chart-container">
			<CanvasJSChart options = {lineOptions}
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
} 

export class UpcomingTasksWidget extends React.Component {
	transitionActivity = async (activityId) => {
		const activityToTransition = {
      "_id" : activityId,
      "activity_type" : "past",
		};

		const response = await fetch("/main/change_activity_type", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(activityToTransition)
		});

		if (response.ok) {
      this.props.updateDashboard();
		}
	}
	
	deleteActivity = (activityId) => {
		fetch(`/main/delete_activity/${activityId}`)
		.then( () => this.props.updateDashboard());
  }
  


  render() {
    const dummyActivities = [
      {"_id": "5eaade1967f5adbdd24460a7", "title": "Finalize Amol's order", "body": "eh", "date": "2020-02-04T15:08:56.000Z", "activity_type": "future", "user_id": "5ea58fbc63e50fc607cf6a10", "elapsed": 0},
      {"_id":"5eaade2467f5adbdd24460a8", "title": "Finalize Amol's order", "body": "eh", "date": "2020-02-04T15:08:56.000Z", "activity_type":"past", "user_id": "5ea51dfc0498e7340c7c7225", "elapsed": 1}
    ];
    return(
      <div className="upcoming-tasks-widget">

        <div className='tasks-widget-title'> 
					&nbsp; Upcoming Tasks 
					<span className="new-task-button"> 
						<NewActivityDialogBox updateDashboard = {this.props.updateDashboard} /> 
					</span> 
				</div>

        {/* <Divider /> */}

    		<div className="tasks-scroller-container">
    			<ul className="tasks-list">
						{
							dummyActivities.map( (element,i) => {
								return(							
									<div key={i}>
										<div style={{color: "grey" }}>
                      <span className='ai-tag'> 
                        <StarRateIcon />   
                      </span>
                      <span>
                        AI Generated
                      </span>
                    </div>

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
                      <span className="cross" onClick={() => {this.deleteActivity(element._id)}}> &times; </span>
										</li>

										<li className="task-body"> &nbsp; &nbsp; &nbsp; &nbsp;{element.body} </li>
									</div>
								);
							})
						}
    			</ul>
        </div>
      </div>
    );
  }
}

export const convertIsoDateToDateString = (isoDate) => {
	let tempDateObj = new Date(isoDate);
	return tempDateObj.toDateString();
};