import React from 'react';
import './styles/profile.css';
import FieldsContainer from "./subcomponents/FieldsContainer";
import ActivityTracker from "./subcomponents/ActivityTracker";
import ProfileHeader from "./subcomponents/ProfileHeader";

export default function Profile() {
  return(
    <div className="grid-container">
      <div className='profile-header-container'>
        <ProfileHeader />
      </div>
      <FieldsContainer fields={sample_data}/> 
      <FieldsContainer fields={sample_data}/>
      <ActivityTracker />
    </div>     
  );
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