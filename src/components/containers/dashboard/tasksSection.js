import React from 'react';
import ReactDOM from 'react-dom'

//hierarchy of react components: TasksSection contains TasksScrollbox;
//TasksScrollbox contains TaskEntry and PendingTasks; 
//PendingTasks contains TransactionTaskEntry.



let tasksList = [ 
  {
    "title": "Call Vivek Shah",
    "date": "February 27", 
    "status": "Undone",
  },

  {
    "title": "Call Preeti Singh",
    "date": "February 29", 
    "status": "Undone",
  },
]

let transactionTasksList = [
  {
    "title": "IoTAtHome",
    "amount": "$1500",
  },

  {
    "title": "Ramesh Sethi",
    "amount": "$2500",
  },
]

function TasksSection(props) {
  return(
    <h2> Tasks </h2>
    <br />
    <TasksScrollbox feedTasks="props." feedTransactionTasks = "" /> 
    <!-- TODO : Pass down correct props to TasksScrollbox -->
  );
}

class TasksScrollbox extends React.Component {
  super()
  render(){
    return(
      <PendingTasks transTasksList = "">
    );
  }
}

ReactDOM.render(
  <TasksSection tasksFeed = tasksList transactionTasksFeed = transactionTasksList/>
);