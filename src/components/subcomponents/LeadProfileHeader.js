import React from 'react';
import '../styles/AccountProfileHeader.css'; //AccountProfileHeader and LeadProfileHeader have the same styling

export default class LeadProfileHeader extends React.Component {
  onTickClick() {
    //if (n==3)
    //turn all 3 into green background
    //wait for 2-3 seconds
    //set n==0 in the backend, turning the background for all 3 into white
    return null;
  }

  render() {
    return(
      <>
        <span className="profile-name"> John Brown </span>
        <span className="stage-indicator">
          <span 
           className="stage1" 
           onClick={this.props.onClick} 
           id="uncontacted"
           style={ this.props.leadStatus==="contacted" ? {backgroundColor:"forestgreen"} : {backgroundColor:"blue"} }
          >
            <span id="uncontacted" className="stage-name"> Uncontacted </span>
          </span>  

          <span 
           className="stage2" 
           onClick={this.props.onClick} 
           id="contacted"
           style={ this.props.leadStatus==="contacted" ? {backgroundColor:"blue"} : {backgroundColor:"gray"} }
          > 
            <span id="contacted" className="stage-name"> Contacted </span>
          </span>  

          <span className="success-checkmark"> </span>
        </span> 
      </>
    );
  }  
}
