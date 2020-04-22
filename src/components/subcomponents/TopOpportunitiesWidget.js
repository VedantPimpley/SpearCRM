import React, {useState, useEffect} from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import PeopleIcon from "@material-ui/icons/People";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import {Link} from 'react-router-dom';
import '../styles/TopOpportunitiesWidget.css'

export default function TopOpportunitiesWidget() {
  const [alignment, setAlignment] = useState("leads");
  
  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  useEffect( () => {
    console.log(alignment);
  });

  return (
    <div className="top-opportunities-widget-container">
      <h2 className="top-opportunities-title"> &nbsp; Top Opportunities </h2>
      <ToggleButtonGroup
        value={alignment}
        exclusive
        onChange={handleAlignment}
        aria-label="toggling"
      >
        <ToggleButton value="leads" aria-label="people">
          <PeopleOutlineIcon />
          <div> &nbsp; Leads</div>
        </ToggleButton>
        <ToggleButton value="customers" aria-label="centered">
          <PeopleIcon />
          <div> &nbsp; Customers</div>
        </ToggleButton>
      </ToggleButtonGroup>

      <div className="material-ui-list">
        <List dense={true}>
          {sample_opps[alignment].map( (element,i) => {
            return(
              <div key={element.id}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <div> {i+1} </div>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={element.name}
                    secondary={element.hotness}
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <Link to={{ pathname: (alignment === "customers" ? '/accountprofile' : '/leadprofile'), state:{uid:element.id} }}>
                          <OpenInNewIcon/>
                      </Link>
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </div>
            );
          })}
        </List>
      </div>
    </div>
  );
}

const sample_opps = {
  "leads": [
    {"id":"1", "name":"Vedant","hotness":"Excellent" },
    {"id":"2", "name":"Amol", "hotness":"Excellent"},
    {"id":"3", "name":"Harsh", "hotness":"Excellent"},
    // {"id":"4", "name":"Shivam","hotness":"Very Likely"},
    // {"id":"5", "name":"Sagar", "hotness":"Very Likely"},
  ],
  "customers" : [
    {"id":"6", "name":"Kanksha", "hotness":"Moderate" },
    {"id":"7", "name":"Devang", "hotness":"High" },
    {"id":"8", "name":"Vishal", "hotness":"Moderate" },
    // {"id":"9", "name":"Rahul", "hotness":"Moderate" },
    // {"id":"10", "name":"Nikhil", "hotness":"Low" },
  ],
}