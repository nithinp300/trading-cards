import React, {Component} from 'react';
import {Card, Button} from 'react-bootstrap'
import {Link, useRouteMatch} from 'react-router-dom';

class TradingCard extends Component {
  constructor(){
    super();
    this.state = {
      cardData: {}
    }
  }

  componentDidMount(){
    fetch(`https://yugioh-data-service.herokuapp.com/monsters/${this.props.match.params.id}`)
    .then(res => res.json())
    .then((data) => {
      this.setState({ cardData: data })
    })
    .catch(console.log)
  }
    
  render(){
    console.log(this.state.cardData)
    return(
      <div>
        <h1>{this.state.cardData.name}</h1>
      </div>
    )
  }
}

export default TradingCard