import React, {Component} from 'react';
import {Card, Button} from 'react-bootstrap'

class TradingCard extends Component {
  render(){
    if (!this.props.monster.card_images) return null;
    console.log(this.props.monster.card_images)
    return(
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={this.props.monster.card_images[0].image_url} />
        <Card.Body>
          <Card.Title>{this.props.monster.name}</Card.Title>
          <Card.Text>{this.props.monster.desc}</Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    )
  }
}

export default TradingCard