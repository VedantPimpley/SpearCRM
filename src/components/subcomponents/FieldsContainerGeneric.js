import React from 'react';
import EditableField from './EditableField.js'

export default class FieldsContainerGeneric extends React.Component {
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