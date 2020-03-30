import React from 'react';
import './styles/profile.css';
import EditableField from "./subcomponents/EditableField.js";
import data from "./people.js"

export default function Profile() {
  return(
    <div className="grid-container">
      <p className="ProfileHeader"> ProfileHeader </p>
      <FieldsContainer /> 
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
    <div>
      <p> Generic fields </p>
      <EditableField fieldName="Name" fieldData="Jake"/>
      {/* <EditableField fieldName="Company" fieldData="Apple"/>
      <EditableField fieldName="Size" fieldData="Enterprise"/> */}
    </div>
  );
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