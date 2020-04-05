import React from 'react';
import {Card, Button} from 'react-bootstrap'

export default function MonsterCard(props){
  if (!props.monster.card_images) return null;
  console.log(props.monster.card_images);
  
  return(
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={props.monster.card_images[0].image_url} />
      <Card.Body>
        <Card.Title>{props.monster.name}</Card.Title>
        <Card.Text>{props.monster.desc}</Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}