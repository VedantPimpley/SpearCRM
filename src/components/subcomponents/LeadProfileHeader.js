import React from 'react';
import '../styles/AccountProfileHeader.css'; //AccountProfileHeader and LeadProfileHeader have the same styling
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { Tooltip } from '@material-ui/core';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

export default class LeadProfileHeader extends React.Component {
  state = {
    open: false,
  }

  handleClickOpen = () => {
    if (this.props.leadStatus == "contacted") {
      this.setState({ open:true });
    }
  };

  handleClose = () => {
    this.setState({ open:false });
  };

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

          <span style={{ verticalAlign: "middle" }}>
            <Tooltip title="Lead created account">
              <CheckCircleIcon onClick={this.handleClickOpen} />
            </Tooltip>
          </span>
        </span> 

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Lead converts to Account holder</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="demat"
              label="Demat Account No."
              type="text"
              variant="outlined"
            />
          </DialogContent>
          <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleClose} color="primary">
            Confirm
          </Button>
        </DialogActions>
        </Dialog>
      </>
    );
  }  
}