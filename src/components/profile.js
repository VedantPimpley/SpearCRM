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
    <>
      <ProfileName />
      <StageIndicator />
    </>  
  );
}

function ProfileName() {
  return null;
}

function StageIndicator() {
  return null;
}

class FieldsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      draftData: this.props.fields.name,
    };
  }
  
  render() {
    return(
      <div>
        <p> Generic fields </p>
        <EditableField fieldName="Name" fieldData={this.state.draftData} handleChange={this.handleDataChange}/>
      </div>
    );
  }  

  handleDataChange = event => {
    this.setState({
      draftData: event.target.value
    }); 
  }

  componentDidMount() {
    console.log(this.state.draftData);
    console.log(this.props.fields);
  }

  componentDidUpdate() {
    console.log("Updated "+this.state.draftData);
  }
  
  handleDataChange = event => {
    this.setState({ draftData: event.target.value });
  }

}

const sample_data = {
  id: '1',
  name: 'John Brown',
  company: '3C Electronics',
};

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