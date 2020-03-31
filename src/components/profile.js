import React from 'react';
import './styles/profile.css';
import EditableField from "./subcomponents/EditableField.js";
import data from "./people.js"

export default function Profile() {
  return(
    <div className="grid-container">
      <p className="ProfileHeader"> ProfileHeader </p>
      <FieldsContainer fields={sample_data}/> 
       {/* with props as common fields  */}
      <p> FieldsContainer</p>
      {/* with props as specific fields */}
      <p> ActivityTracker</p>    
    </div>     
  );
} 

function ProfileHeader() {
  return(
    <Fragment>
      <ProfileName />
      <StageIndicator />
    </Fragment>  
  );
}

function ProfileName() {
  //
}

function StageIndicator() {
  //
}

function FieldsContainer() {
  constructor(props) {
    super(props);
    state = {
      tempFieldData: this.props.fields.name
    }
  }

  handleEmailChange = event => {
    this.setState({ draftEmail: event.target.value });
  };

  return(
    <div>
      <p> Generic fields </p>
      <EditableField fieldName="Name" fieldData="Jake" handleChange={this.handleEmailChange}/>
      <EditableField fieldName="Company" fieldData="Apple" handleChange={this.handleEmailChange}/>
      <EditableField fieldName="Size" fieldData="Enterprise" handleChange={this.handleEmailChange}/>
    </div>
  );
}

const sample_data = [
  {
    id: '1',
    name: 'John Brown',
    company: '3C Electronics',
  }
];

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