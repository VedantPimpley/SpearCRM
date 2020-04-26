import React from 'react';
import EditableField from './EditableField.js'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';

export default class FieldsContainer1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.fields.name,
      company: this.props.fields.company,
      education: this.props.fields.education,
      city: this.props.fields.city,
      state: this.props.fields.state,
      country: this.props.fields.country,
    };
  }
  
  render() {
    return(
      <div>
        <h2 style={{ textAlign: "center"}}> {this.props.container} fields </h2>
          <List>
            <ListItem><EditableField name="name" fieldName="Name" fieldData={this.state.name} onChange={this.handleChange}/></ListItem>
            <Divider />
            <ListItem><EditableField name="company" fieldName="Company" fieldData={this.state.company} onChange={this.handleChange}/></ListItem>
            <Divider />
            <ListItem><EditableField name="education" fieldName="Education" fieldData={this.state.type} onChange={this.handleChange}/></ListItem>
            <Divider />
            <ListItem><EditableField name="city" fieldName="City" fieldData={this.state.city} onChange={this.handleChange}/></ListItem>
            <Divider />
            <ListItem><EditableField name="state" fieldName="State" fieldData={this.state.phoneNumber} onChange={this.handleChange}/></ListItem>
            <Divider />
            <ListItem><EditableField name="country" this fieldName="Country" fieldData={this.state.email} onChange={this.handleChange}/></ListItem>
            <Divider />
          </List>
      </div>
    );
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