import React from 'react'
import '../styles/EditableField.css'

export default class EditableField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fieldData: "Apple",
      isDataBeingEdited: false,
    };
  }

  EditFieldData() {
    this.setState({
      isDataBeingEdited: true
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
        isDataBeingEdited: false
      });
    }
  }

  componentDidUpdate() {
    console.log(this.state.fieldData);
  }

  render() {
    let fieldDataDisplayElement = <span> {this.state.fieldData} </span> ;
    let fieldDataInputElement = null;
    if (this.state.isDataBeingEdited) {
      fieldDataDisplayElement = null;
      fieldDataInputElement = (
        < input  
          type="text" 
          defaultValue={this.state.fieldData} 
          onChange={this.handleInputChange.bind(this)} 
          onKeyUp={this.onKeyUp.bind(this)}
        />
      );
    }

    return(
      <div className="editable-field-component">
        <p> {this.props.fieldName} </p>
        {fieldDataDisplayElement}
        <button className="DataEditButton"onClick={this.EditFieldData.bind(this)}> &#9999; </button>
        {fieldDataInputElement}
      </div>  
    );
  }
}

//1. Internal state isn't consistent with derived state
//2. Element placement is weird: component container edges keep moving.



//All the things id like to look further into
// this binding
// events
// event handlers
// jsx 
// setting js variables with value as jsx or html (single parent node)
// conditional rendering
// multiple conditioal rendering
// derived components/states
// generators