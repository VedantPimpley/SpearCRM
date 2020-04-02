import React from 'react'
import '../styles/EditableField.css'

export default class EditableField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isBeingEdited: false,
    };
  }

  componentDidMount() {
    console.log(`State is ${this.state.isBeingEdited}`)
  }

  componentDidUpdate() {
    console.log(`State is ${this.state.isBeingEdited}`)
  }

  render() {
    let fieldDataComponent = <p> {this.props.fieldData} </p>;
    let editButton = <button className="DataEditButton" onClick={this.alternateViews.bind(this)} > &#9999; </button>;
    if(this.state.isBeingEdited) {
      fieldDataComponent = <input type="text" defaultValue={this.props.fieldData} onChange={this.props.handleDataChange}/>;
      editButton = <button className="DataEditButton" onClick={this.alternateViews.bind(this)} > &#10003; </button>;
    }

    return(
      <div className="editable-field-component">
        <p> {this.props.fieldName} </p>
        <div className="inline-section-editable-fields">
          {fieldDataComponent}
          {editButton}
        </div>
      </div>  
    );
  }

  alternateViews() {
    this.setState({
      isBeingEdited: !this.state.isBeingEdited
    });
  }
}