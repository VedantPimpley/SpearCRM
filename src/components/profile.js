import React from 'react';
import './styles/profile.css';
import FieldsContainer from "./subcomponents/FieldsContainer";
import ActivityTracker from "./subcomponents/ActivityTracker";


export default function Profile() {
  return(
    <div className="grid-container">
      <p className="ProfileHeader"> ProfileHeader </p>
      <FieldsContainer fields={sample_data}/> 
       {/* with props as common fields  */}
      <p> Specific fields</p>
      {/* with props as specific fields */}
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