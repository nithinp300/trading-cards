import React, {Component} from 'react';
import {Card, Button} from 'react-bootstrap'
import {Link, useRouteMatch} from 'react-router-dom';

class TradingCard extends Component {
  render(){
    if (!this.props.monster.card_images) return null;
    return(
      <div>
        <Link style={{textDecoration:"none"}} to={`${this.props.url}/${this.props.monster.id}`}>
          <Card style={{margin:"2rem"}}>
            <Card.Img variant="top" src={this.props.monster.card_images[0].image_url} />
            <Card.Body>
              <Card.Title>{this.props.monster.name}</Card.Title>
            </Card.Body>
          </Card>
        </Link>
      </div>
    )
  }
}

export default TradingCard