import React from 'react'
import './styles/EditableField.css'

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
    this.setState({
      DataIsBeingEdited: true
    });
  }

  handleInputChange(e) {
    e.preventDefault();
    this.setState({
      fieldData: e.target.value,
    });
  }

  onKeyUp(e) {
    if(e.key === 'Enter') {
      this.setState({
        DataIsBeingEdited: false
      });
    }
  }

  componentDidUpdate() {
    console.log(this.state.DataIsBeingEdited);
  }

  render() {
    let fieldDataDisplayElement = <span> {this.state.fieldData} </span> ;
    let fieldDataInputElement = null;
    if (this.state.DataIsBeingEdited) {
      fieldDataDisplayElement = null;
      fieldDataInputElement = <input  type="text" defaultValue={this.state.fieldData} 
                                      onChange={this.handleInputChange.bind(this)} 
                                      onKeyUp={this.onKeyUp.bind(this)}/>;
    }

    return(
      <>
        <p> {this.state.fieldName} </p>
        <button className="DataEditButton"onClick={this.EditFieldData.bind(this)}> &#9999; </button>
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