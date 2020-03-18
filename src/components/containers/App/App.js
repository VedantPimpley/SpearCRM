import React from 'react';
import PeopleTable from '/home/vedant/Desktop/Workbench/Projects/CRM/front_end/src/components/containers/people/people.js'; 
import './App.css';

class NavBar extends React.Component {
  render(){
    return(
      <ul>
         <li className='navbar-entry'> <a href="#">Dashboard</a> </li>
         <li className='navbar-entry'> <a href="#">People</a> </li>
         <li className='navbar-entry'> <a href="#">Pipeline</a> </li>
         <li className='navbar-entry' style={{float:"right"}}> <a href="#">&#x1F464;</a> </li>
      </ul> 
    )
  }
}

class App extends React.Component {
  render() {
    return (
      <>
        <NavBar />
        <div >
          <PeopleTable className='table-container'/>
        </div>
      </>
    );
  }
}

export default App;