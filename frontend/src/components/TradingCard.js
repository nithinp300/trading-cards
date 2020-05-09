import React, {Component} from 'react';
import {Card, Button} from 'react-bootstrap'
import {Link, useRouteMatch} from 'react-router-dom';
import { useAuth0 } from "../react-auth0-spa";

function TradingCard(props) {
  const { isAuthenticated } = useAuth0();
  if (!props.monster.card_images) return null;
  return(
    <div>
      <Card style={{margin:"1.5rem"}}>
        <Link to={`${props.url}/${props.monster.id}`} style={{textDecoration:"none"}}>
          <Card.Img variant="top" src={props.monster.card_images[0].image_url} />
          {/* <Card.Body>
            <Card.Title>{props.monster.name}</Card.Title>
            <Card.Text>
              Classification: {props.monster.type}<br></br>
              Attribute: {props.monster.attribute}<br></br>
              Type: {props.monster.race}<br></br>
              Level: {props.monster.level}<br></br>
              ATK: {props.monster.atk}<br></br>
              DEF: {props.monster.def}<br></br>
            </Card.Text>
          </Card.Body> */}
        </Link>
        {isAuthenticated && <Button href="/deck">Add</Button>}
      </Card>
    </div>
  )
}

export default TradingCard