import React from 'react'
import Board from 'react-trello/dist'

const data = {
  lanes: [
    {
      id: 'lane1',
      title: 'Order finalizing',
      label: '2/2',
      cards: [
        {id: 'Card1', title: 'PharmaCo', description: 'MSFT', label: '$150000'},
        {id: 'Card2', title: 'BrowserStack', description: 'AMZN', label: '$10000'},
        {id: 'Card3', title: 'RBI', description: 'YesBank', label: '$1'},
      ]
    },
    {
      id: 'lane2',
      title: 'Order finalized',
      label: '0/0',
      cards: [
        {id: 'Card4', title: 'ZohoCRM', description: 'SalesForce', label: '$50000'},
        {id: 'Card5', title: 'Godrej', description: 'Timberlands', label: '$3000'},
      ]
    },
    {
      id: 'lane3',
      title: 'Order transacted',
      label: '0/0',
      cards: [
        {id: 'Card6', title: 'Indira Computers', description: 'Gaurav Textiles', label: '$4000'},
        {id: 'Card7', title: 'CompuSoft', description: 'WeWork', label: '$9000'},
      ]
    }
  ]
}

export default class Pipeline extends React.Component {
  render() {
    return <Board data={data} />
  }
}
