import React from 'react'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fieldName: "Name", //this.props.FieldName,
      fieldData: "Rahul", //this.props.FieldData,
      DataIsBeingEdited: false,
    };
  }

  EditFieldData() {
    this.setState = ({
      DataIsBeingEdited: true,
    });
    console.log(this.state.DataIsBeingEdited);
  }

  handleInputChange(e) {
    e.preventDefault();
    this.setState({
      fieldData: e.target.value,
    });
  }

  render() {
    let fieldDataDisplayElement = <p> {this.state.fieldData} </p> ;
    let fieldDataInputElement = null;
    if (this.state.DataIsBeingEdited) {
      fieldDataDisplayElement = null;
      fieldDataInputElement = <input type="text" defaultValue={this.state.fieldData} onChange={this.handleInputChange.bind(this)}/>;
    }

    return(
      <>
        <p> {this.state.fieldName} </p>
        <button onClick={this.EditFieldData.bind(this)}> &#9999; </button>
        {fieldDataDisplayElement}
        {fieldDataInputElement}
      </>  
    );
  }

}


//Editable field

//this.state = { fieldName="props.fieldName", fieldData="props.fieldData" }
//Edit()
//SaveEdit()
//getDerivedStateFromProps()


//div container ? width:150px and height 50 px 
//fieldName p 
//fieldData p
//fieldDataInput input type="text"
//button ? top-right

//All the things im confused about
// this binding
// events
// event handlers
// jsx 
// setting js variables with value as jsx or html (single parent node)
// conditional rendering
// multiple conditioal rendering
// derived components/states
// generators

// 1. Create EditableField
// DONE 1a. Create field name element and button element
// DONE 1b. Create field data element and text input element and alternately render them
// 1c. Create logic to handle input data submission and receiving it the way its done in react
