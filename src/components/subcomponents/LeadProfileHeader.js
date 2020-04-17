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
    let n = 1;
    return(
      <>
        <span className="profile-name"> John Brown </span>
        <span className="stage-indicator">
          <span className="stage1" style={ n===2 ? {backgroundColor:"green"} : {backgroundColor:"blue"} }>
            <span className="stage-name"> Unopened </span>
          </span>  

          <span className="stage2" style={ n===2 ? {backgroundColor:"blue"} : {backgroundColor:"gray"} }> 
            <span className="stage-name"> Contacted </span>
          </span>  

          <span className="success-checkmark"> </span>
        </span> 
      </>
    );
  }  
}
