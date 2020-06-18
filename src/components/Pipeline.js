import React from 'react'
import Board from 'react-trello/dist'
import PipelineNewOrderDialogBox from './subcomponents/PipelineNewOrderDialogBox.js';
import SendIcon from '@material-ui/icons/Send';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import Button from "@material-ui/core/Button";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import './styles/Pipeline.css';

const API = process.env.REACT_APP_API || "https://ancient-mountain-97216.herokuapp.com"

export default class Pipeline extends React.Component {
  state = {
    fetchedOrders : [],
    openSpinner : false,
  };

  componentDidMount() {
    console.log(this.props);
    this._isMounted = true;

    fetch(`${API}/main/show_all_orders`).then(response =>
      response.json().then(data => {
        if (this._isMounted) {
          this.setState({ fetchedOrders: data });
        }
      })
    );
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  updatePipelineAPICall = async () => {
    console.log("Update triggered");
    fetch(`${API}/main/show_all_orders`).then(response =>
      response.json().then(data => {
        if (this._isMounted) {
          this.setState({ fetchedOrders: data });
        }
      })
    );
  }

  //prepares the input for Board component
  //AND passes possibly new (uncached) company names to App.js
  transformOrdersToBoardData = () => {
    let orders = this.state.fetchedOrders;

    const board = {
      lanes: [
        {
          id: 1,
          title: 'Order Received',
          label: '',
          cards: []
        },
        {
          id: 2,
          title: 'Order Finalized',
          label: '',
          cards: []
        },
        {
          id: 3,
          title: 'Order To-be-transacted',
          label: '',
          cards: []
        },
        {
          id: 0,
          title: 'Order Transacted',
          label: '',
          cards: []
        }
      ]
    };

    // formatting attributes to make a suitable input for Board component
    orders.forEach( (entry) => {
      entry.id = entry["_id"];
      entry.title = entry["company"];
      if ( (entry.trans_type).toLowerCase() === "sell" ) {
        entry.description = `Sell stocks for ${entry.name}`;
      }
      else {
        entry.description = `Buy stocks for ${entry.name}`;
      }
      entry.label = `${entry.no_of_shares} X ${entry.cost_of_share}`;
      entry.metadata = {account_id: entry.account_id}
    });

    board.lanes.forEach( (Lane) => {
      Lane.cards = orders.filter(entry => entry.stage === Lane.id);
    });

    
    let laneOneAndTwoCompanies = [];
    for (let i = 0; i < board.lanes.length; i++) {
      let Lane = board.lanes[i]
      Lane.cards = orders.filter(entry => entry.stage === Lane.id);

      //obtain names of companies in lane one and two.
      if (Lane.id === 1 || 2) {
        Lane.cards.forEach( card => {
          laneOneAndTwoCompanies.push(card.company);
        })
      }
    }

    //send company names to App.js, to cache their stockprice
    //only lanes one and two can have new orders
    this.props.receiveCompanyNamesDuringRuntime(laneOneAndTwoCompanies);

    return board;
  }

  updateCardStage = async (fromLaneId, toLaneId, cardId, index) => {
    this.setState({ openSpinner: true});

    //these are the only permissible drag-and-drop transitions
    if (fromLaneId === toLaneId){
      return null;
    }
    else if(     
         (fromLaneId === 1 && toLaneId === 2)
      || (fromLaneId === 2 && toLaneId === 3)
      || (fromLaneId === 3 && toLaneId === 0)
    ){
      const newCardStage = {
        "_id" : cardId,
        "stage" : toLaneId,
        "company" : {company: this.props.cache},
      };

      // third attribute company (actually means price)
      const response = await fetch(`${API}/main/order_stage_change`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newCardStage)
      });
      
      if (response.ok) {
        this.updatePipelineAPICall()
        .then(() => {
          if(this._isMounted) {
            this.setState({ openSpinner:false })
          }
        });
      }
      else if(response.ok === false && this._isMounted) {
        this.forceUpdate();
        alert("Server error encountered");
      }
    }
    else if(this._isMounted) {
      this.forceUpdate();
      alert("This kind of drag-and-drop is not allowed.")
    }
  }

  deleteCard = (cardId, laneId) => {
    this.setState({ openSpinner: true});
    fetch(`${API}/main/delete_order/${cardId}`)
    .then( () => this.updatePipelineAPICall() )
    .then( () => {
      if(this._isMounted) {
        this.setState({ openSpinner:false })
      }
    });
  }

  linkToAccountProfile = (cardId, metadata, laneId) => {
    this.props.history.push({
      pathname: "/accountprofile",
      state: {cid: metadata.account_id}
    });
  }

  markToBeTransactedOrdersAsTransacted = async () => {
    this.setState({ openSpinner: true});

    let companyPrices = {company: this.props.cache};

    console.log(companyPrices);
    //POST the prices along with the request. The backend will use the stockprice data
    const response = await fetch(`${API}/main/complete_all_orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(companyPrices)
    });
    
    if (response.ok && this._isMounted) {
      // fetch(`${API}/main/send_email_after_transaction`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json"
      //   },
      //   body: JSON.stringify(response.json())
      // })
      // .then(() => this.updatePipelineAPICall())
      // .then(() => {
      //   if(this._isMounted) {
      //     this.setState({ openSpinner:false })
      //   }
      // });
      console.log(response.json())
    }
  }

  //POSTs the stock prices of all companies to backend
  //backend then sees if the prices meet the conditions specified in the order price
  //if yes, it moves order from finalized to to-be-transacted
  //if no, it does not
  //if a to-be-transacted order NO LONGER meets the criteria, backend moves it back to finalized
	
  convertEligibleFinalizedOrders = async () => {
    this.setState({ openSpinner: true});

    let companyPrices = {company: this.props.cache};

    const response = await fetch(`${API}/main/convert_finalized_orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(companyPrices)
    });
    
    if (response.ok && this._isMounted) {
      // fetch(`${API}/main/send_email_after_transaction`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json"
      //   },
      //   body: JSON.stringify(response.json())
      // })
      // .then(() => this.updatePipelineAPICall())
      // .then(() => {
      //   if(this._isMounted) {
      //     this.setState({ openSpinner:false })
      //   }
      // });
      console.log(response.json());
    }
  }

  render() {
    return(
      <>
        <Board
          data={this.transformOrdersToBoardData()}
          onCardDelete={this.deleteCard}
          onCardMoveAcrossLanes={this.updateCardStage}
          onCardClick={this.linkToAccountProfile}
          collapsibleLanes
        />
        
        <div className="add-order-button"> 
          <PipelineNewOrderDialogBox 
            updatePipeline={this.updatePipelineAPICall} 
          /> 
        </div>

        <div className="complete-orders-button">
          <Button
            variant="contained"
            color="primary"
            onClick={this.markToBeTransactedOrdersAsTransacted}
            startIcon={<SendIcon />}
            fullWidth
          >
            Mark Orders as transacted
          </Button>
        </div>

        <div className="pricecheck-orders-button">
          <Button
            variant="contained"
            color="primary"
            onClick={this.convertEligibleFinalizedOrders}
            startIcon={<ShowChartIcon />}
            fullWidth
          >
            Check share price & update
          </Button>
        </div>

        <Backdrop className="spinner-backdrop" open={this.state.openSpinner}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </>
    );
  }
}