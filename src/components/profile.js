import React from 'react';
import './styles/profile.css';


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

default export function Profile() {
  return(
    <>
      <ProfileHeader />
      <FieldsContainer /> 
       {/* with props as common fields  */}
      <FieldsContainer /> 
      {/* with props as specific fields */}
      <ActivityTracker />
    </>     
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
  //
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