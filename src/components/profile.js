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
      name: this.props.fields.name,
      company: this.props.fields.company,
      type: this.props.fields.type,
      city: this.props.fields.city,
      phoneNumber: this.props.fields.phoneNumber,
      email: this.props.fields.email,
    };
  }
  
  render() {
    return(
      <div>
        <p> Generic fields </p>
        <EditableField fieldName="Name" fieldData={this.state.name} handleChange={this.handleNameChange}/>
        <EditableField fieldName="Company" fieldData={this.state.company} handleChange={this.handleCompanyChange}/>
        <EditableField fieldName="Type" fieldData={this.state.type} handleChange={this.handleTypeChange}/>
        <EditableField fieldName="City" fieldData={this.state.city} handleChange={this.handleCityChange}/>
        <EditableField fieldName="Phone Number" fieldData={this.state.phoneNumber} handleChange={this.handlePhoneNumberChange}/>
        <EditableField fieldName="Email" fieldData={this.state.email} handleChange={this.handleEmailChange}/>
      </div>
    );
  }  

  handleNameChange = event => {
    this.setState({
      name: event.target.value
    }); 
  }

  handleCompanyChange = event => {
    this.setState({
      company: event.target.value
    }); 
  }

  handleTypeChange = event => {
    this.setState({
      type: event.target.value
    }); 
  }

  handleCityChange = event => {
    this.setState({
      city: event.target.value
    }); 
  }
  
  handlePhoneNumberChange = event => {
    this.setState({
      phoneNumber: event.target.value
    }); 
  }

  handleEmailChange = event => {
    this.setState({
      email: event.target.value
    }); 
  }

  componentDidMount() {
    console.log(this.props.fields);
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  handleDataChange = event => {
    this.setState({ draftData: event.target.value });
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

class ActivityTracker extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      mode: false,
      //false means input is a call being logged. true means input is a new task.
      draftInput: "",
    };
  }

  onDivClick = () => {
    this.setState({
      mode: !this.state.mode
    });
  }

  onSubmit = () => {
    return null;
    // add new data as a <li> to NextStep or PastActivity
  }

  render() {
    return(
      <>
        <ManualLogger onDivClick={this.onDivClick} onSubmit={this.onSubmit} />
        <NextStep />
        <PastActivity />
      </>
    );
  }  
}

function ManualLogger() {
  
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