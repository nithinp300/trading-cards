import React from 'react';
import {Card, Button} from 'react-bootstrap'

export default function MonsterCard(props){
  console.log(props.monster);
  return(
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="https://storage.googleapis.com/ygoprodeck.com/pics/6983839.jpg" />
      <Card.Body>
        <Card.Title>{props.monster.name}</Card.Title>
        <Card.Text>{props.monster.desc}</Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}