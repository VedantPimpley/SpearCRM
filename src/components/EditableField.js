import React from 'react'

export default class EditableField extends React.Component {
  constructor() {
    super(props);
    this.setState = {
      fieldName: "Name" //this.props.FieldName,
      fieldData: "Rahul" //this.props.FieldData,
      DataIsBeingEdited: false,
    };
  }

  getDerivedStateFromProps() {
    //as name suggests, refer alligator.io
  }

  EditFieldData() {
    this.setState = ({
      DataIsBeingEdited: true
    });
  }

  // onSubmit() {
  //   this.setState = ({
  //     DataIsBeingEdited: false
  //   });
  // }

  handleInputChange(e) {
    e.preventDefault();
    this.setState({
      fieldData: e.target.value
    });
  }

  render() {
    let fieldDataElement = <p> {this.state.fieldData} </p> ;
    let fieldInput = null;
    if (this.state.DataIsBeingEdited) {
      fieldInput = <input type="text" defaultValue="{this.state.fieldData}" onChange={this.handleInputChange.bind(this)}/>;
      fieldDataElement = null;
    }

    return(
      <>
        <p> {this.state.fieldName} </p>
        <button onClick={this.EditFieldData.bind(this)}> &#9999; </button>
        {fieldDataElement}
        {fieldInput}
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
