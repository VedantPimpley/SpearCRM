import React from 'react';
import './styles/AccountProfile.css'; //styling of both AccountProfile and LeadProfile pages is the same
import FieldsContainer from "./subcomponents/FieldsContainer";
import ActivityTracker from "./subcomponents/ActivityTracker";
import LeadProfileHeader from "./subcomponents/LeadProfileHeader";

export default class LeadProfile extends React.Component {
  componentDidMount() {
    const { uid } = this.props.location.state;
    console.log("UID is " + uid);
  }

  render(){
    return(
      <div className="profile-page-grid-container">
        <div className='profile-header-container'>
          <LeadProfileHeader />
        </div>
        <FieldsContainer fields={sample_data}/> 
        <FieldsContainer fields={sample_data}/>
        <ActivityTracker />
      </div>     
    );
  }
} 

const sample_data = {
  key: '1',
  name: 'John Brown',
  company: '3C Electronics',
  type: 'Small Business',
  city: 'New York',
  phoneNumber: '9090909090',
  email: 'johnbrown@gmail.com',
};