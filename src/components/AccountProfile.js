import React from 'react';
import './styles/AccountProfile.css';
import FieldsContainer1 from "./subcomponents/FieldsContainer1";
import FieldsContainer2 from "./subcomponents/FieldsContainer2";
import ActivityTracker from "./subcomponents/ActivityTracker";
import AccountProfileHeader from "./subcomponents/AccountProfileHeader";

//possible TODO: remove account data, make API response the state 
// OR aD = this.state.accountData & use aD.name, aD.company etc.

export default class AccountProfile extends React.Component {
  state = {
    accountData: {},
  };

  componentDidMount() {
    const { cid } = this.props.location.state; //named cid temporarily
    console.log("CID is " + cid);
    fetch(`/main/display_acc/${cid}`).then(response =>
      response.json().then(data => {
        data["account_id"] = data["account_id"]["$oid"]; //TODO:verify source
        this.setState({ accountData: data });
      })
    );
  }

  updateAccountProfileAPICall = () => {
    fetch(`/main/display_acc/${this.state.accountData.account_id}`).then(response =>
      response.json().then(data => {
        data["account_id"] = data["account_id"]["$oid"]; //TODO:verify source
        this.setState({ accountData: data });
      })
    );
  }
  
  render(){
    let fields_set = {
      account_id: this.state.accountData.account_id, 
      contact_comm_type: this.state.accountData.contact_comm_type,
      name: this.state.accountData.name,
      dob: this.state.accountData.name, //needs sorting out on Amol's side
      company: this.state.accountData.company,
      education: this.state.accountData.education,
      city: this.state.accountData.city,
      state: this.state.accountData.state,
      country: this.state.accountData.country,
      last_contact: this.state.accountData.last_contact,
      trading_accno: this.state.accountData.trading_accno,
      demat_accno: this.state.accountData.demat_accno,
      job_type: this.state.accountData.job_type,
      marital_status: this.state.accountData.marital_status,
      email: this.state.accountData.email,
      phone_number: this.state.accountData.phone_number,
      latest_order_stage: this.state.accountData.latest_order_stage,
    };
    //alternative to fields_set is NOT this.state.accountData because orders, activity is not reqd. in FieldContainer

    return(
      <div className="profile-page-grid-container">
        <div className='profile-header-container'>
          <AccountProfileHeader name= {this.state.accountData.name}furthestStage={this.state.accountData.latest_order_stage} updateAccountProfile={this.updateAccountProfileAPICall}/>
        </div>
        <FieldsContainer1 fields={fields_set} updateAccountProfile={this.updateAccountProfileAPICall}/>
        <FieldsContainer2 fields={fields_set} updateAccountProfile={this.updateAccountProfileAPICall}/>
        <ActivityTracker updateAccountProfile={this.updateAccountProfileAPICall}/>
      </div>     
    );
  }
} 

const sample_data = {
  key: '1',
  name: 'John Brown',
  company: '3C Electronics',
  type: 'Small Business',
  city: 'New York',
  phoneNumber: '9090909090',
  email: 'johnbrown@gmail.com',
};