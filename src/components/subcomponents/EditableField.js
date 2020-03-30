import React from 'react'
import '../styles/EditableField.css'

export default class EditableField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fieldName: "",
      fieldData: "",
      DataIsBeingEdited: false,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.fieldName !== nextProps.fieldName){
      return{
        fieldName: nextProps.fieldName
      }
    }

    if (prevState.fieldData !== nextProps.fieldData){
      return{
        fieldData: nextProps.fieldData
      }
    }

    // Return null if the state hasn't changed
    return null;
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
    console.log(this.state.fieldData);
  }

  render() {
    let fieldDataDisplayElement = <span> {this.state.fieldData} </span> ;
    let fieldDataInputElement = null;
    if (this.state.DataIsBeingEdited) {
      fieldDataDisplayElement = null;
      fieldDataInputElement = <input  type="text" defaultValue={this.state.fieldData} 
                                      onChange={this.handleInputChange.bind(this)} 
                                      onKeyUp={this.onKeyUp.bind(this)}
                              />;
    }

    return(
      <div className="editable-field-component">
        <p> {this.state.fieldName} </p>
        {fieldDataDisplayElement}
        {fieldDataInputElement}
        <button className="DataEditButton"onClick={this.EditFieldData.bind(this)}> &#9999; </button>
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