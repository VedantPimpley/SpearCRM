import React from 'react';
import './styles/profile.css';
import FieldsContainerGeneric from "./subcomponents/FieldsContainerGeneric";

export default function Profile() {
  return(
    <div className="grid-container">
      <p className="ProfileHeader"> ProfileHeader </p>
      <FieldsContainerGeneric fields={sample_data}/> 
       {/* with props as common fields  */}
      <p> FieldsContainerSpecific</p>
      {/* with props as specific fields */}
      {/* <ActivityTracker />     */}
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


//Component hierarchy
//profile.js: uid
//ProfileHeader? cssGridComponent
//  Name
//  StageIndicator
//FieldsContainer? cssGridComponent
//  EditableField
//FieldsContainer? cssGridComponent
//  EditableField
//Activity Tracker? cssGridComponent
//  ManualLogger
//  NextStep
//    PrettyList
//  PastActivity
//    PrettyList