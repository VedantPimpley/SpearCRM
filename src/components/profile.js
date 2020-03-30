import React from 'react';
import './styles/profile.css';
//import EditableField from "./subcomponents/EditableField.js";

export default function Profile() {
  return(
    <div className="grid-container">
      <p className="ProfileHeader"> ProfileHeader </p>
      <p> FieldsContainer</p> 
       {/* with props as common fields  */}
      <p> FieldsContainer</p>
      {/* with props as specific fields */}
      <p> ActivityTracker</p>    
    </div>     
  );
} 

function ProfileHeader() {
  return(
    <>
      <ProfileName />
      <StageIndicator />
    </>  
  );
}

function ProfileName() {
  //
}

function StageIndicator() {
  //
}

function FieldsContainer() {
  return(
    // for every field having App, Data as props
      <EditableField />
  );
}

function EditableField(){
  return null;
}

function ActivityTracker() {
  return(
    <>
      <ManualLogger />
      <NextStep />
      <PastActivity />
    </>
  );
}

function ManualLogger() {
  return null;
}

function NextStep() {
  return(
    <PrettyList />
    // with listItems as the one recommendation made by AI Core from backend
  );
}

function PastActivity() {
  return(
    <PrettyList />
    // with listItems as the recent history of client-customer interactions
  );
}

function PrettyList() {
  return null;
}

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