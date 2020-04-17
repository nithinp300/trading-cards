import React, {Component} from 'react';
import {Card, Button} from 'react-bootstrap'
import {Link, useRouteMatch} from 'react-router-dom';

class TradingCard extends Component {
  render(){
    if (!this.props.monster.card_images) return null;
    return(
      <div>
        <Link to={`${this.props.url}/${this.props.monster.id}`} style={{textDecoration:"none"}}>
          <Card style={{margin:"1.5rem"}}>
            <Card.Img variant="top" src={this.props.monster.card_images[0].image_url} />
            <Card.Body>
              <Card.Title>{this.props.monster.name}</Card.Title>
              {/* <Card.Text>
                Classification: {this.props.monster.type}<br></br>
                Attribute: {this.props.monster.attribute}<br></br>
                Type: {this.props.monster.race}<br></br>
                Level: {this.props.monster.level}<br></br>
                ATK: {this.props.monster.atk}<br></br>
                DEF: {this.props.monster.def}<br></br>
              </Card.Text> */}
            </Card.Body>
          </Card>
        </Link>
      </div>
    )
  }
}

export default TradingCard