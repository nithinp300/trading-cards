import React from 'react';
import {Card, Button} from 'react-bootstrap'

export default function MonsterCard(props){
  // if (!props.monster.card_images) return null;
  // console.log(props.monster.card_images);
  
  return(
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={props.monster.avatar} />
      <Card.Body>
        <Card.Title>{props.monster.first_name}</Card.Title>
        <Card.Text>{props.monster.desc}</Card.Text>
      </Card.Body>
    </Card>
  );
}