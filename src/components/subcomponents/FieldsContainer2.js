import React from 'react';
import EditableField from './EditableField.js'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';

export default class FieldsContainer2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      last_contact: this.props.fields.last_contact,
      trading_accno: this.props.fields.trading_accno,
      job_type: this.props.fields.job_type,
      marital_status: this.props.fields.marital_status,
      email: this.props.fields.email,
      phone_number: this.props.fields.phone_number,
    };
  }
  
  render() {
    return(
      <div>
        <h2 style={{ textAlign: "center"}}> {this.props.container} fields </h2>
          <List>
            <ListItem><EditableField name="last_contact" fieldName="Last Contact" fieldData={this.state.name} onChange={this.handleChange}/></ListItem>
            <Divider />
            <ListItem><EditableField name="trading_accno" fieldName="Trading Account No." fieldData={this.state.company} onChange={this.handleChange}/></ListItem>
            <Divider />
            <ListItem><EditableField name="job_type" fieldName="Job type" fieldData={this.state.type} onChange={this.handleChange}/></ListItem>
            <Divider />
            <ListItem><EditableField name="marital_status" fieldName="Marital Status" fieldData={this.state.city} onChange={this.handleChange}/></ListItem>
            <Divider />
            <ListItem><EditableField name="email" fieldName="Email" fieldData={this.state.phoneNumber} onChange={this.handleChange}/></ListItem>
            <Divider />
            <ListItem><EditableField name="phone_number" this fieldName="Phone Number" fieldData={this.state.email} onChange={this.handleChange}/></ListItem>
            <Divider />
          </List>
      </div>
    );
  }  

  submitChangedFields = async () => {
    //POST current state with account_id
    //overwrite received props object with state variables of same name
    //post the resulting object
  }

  handleChange = e => {
    console.log(`handleChange ${e.target.name}`);
    this.setState({
      [e.target.name] : e.target.value
    });
  }

  componentDidMount() {
    console.log(this.props.fields);
  }

  componentDidUpdate() {
    console.log(this.state);
  }
}