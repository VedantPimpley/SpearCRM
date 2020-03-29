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

export default function Profile() {
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

class EditableField extends React.Component {
  constructor(){
    super(props);
    props = {
      fieldName: "",
      fieldData: "",
    }
  }

  onClickEditIcon(){

  }


  render() {
    return(
      <div>
        <p> {{$fieldName}} </p>
        <p> {{$fieldData}} </p>
      </div>
    );
  }
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