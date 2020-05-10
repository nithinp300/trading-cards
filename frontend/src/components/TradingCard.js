import React, {useState, useEffect} from 'react';
import {Card, Button} from 'react-bootstrap'
import {Link, useRouteMatch} from 'react-router-dom';
import { useAuth0 } from "../react-auth0-spa";
import axios from 'axios';

function TradingCard(props) {
  function handleAddClick(){
    let cardData = props.monster
    console.log(cardData)
    // make a post method with card data
    axios.post(`http://localhost:5000/api/cards`, cardData)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }
  const { isAuthenticated } = useAuth0();
  // const [inDeck, setInDeck] = useState(null);

  // useEffect(() => {

  // });

  if (!props.monster.card_images) return null;
  return(
    <div style={{margin:"2rem"}}>
      <Link to={`${props.url}/${props.monster.id}`} style={{textDecoration:"none"}}>
        <img src={props.monster.card_images[0].image_url} alt={props.monster.name} height="400" width="300"></img>
      </Link>
      <button onClick={handleAddClick}>Add</button>
      {/* {isAuthenticated && <button onClick={handleAddClick(props.monster)}>Add</button>} */}
      {/* <Card style={{margin:"1.5rem"}}>
        <Link to={`${props.url}/${props.monster.id}`} style={{textDecoration:"none"}}>
          <Card.Img variant="top" src={props.monster.card_images[0].image_url} />
          <Card.Body>
            <Card.Title>{props.monster.name}</Card.Title>
            <Card.Text>
              Classification: {props.monster.type}<br></br>
              Attribute: {props.monster.attribute}<br></br>
              Type: {props.monster.race}<br></br>
              Level: {props.monster.level}<br></br>
              ATK: {props.monster.atk}<br></br>
              DEF: {props.monster.def}<br></br>
            </Card.Text>
          </Card.Body>
        </Link>
        {isAuthenticated && <button >Add</button>}
      </Card> */}
    </div>
  )
}

export default TradingCard

// function handleAddClick(props){
//   let cardData = props.monster
//   console.log(cardData)
//   // make a post method with card data
//   axios.post(`http://localhost:5000/api/cards`, { cardData })
//     .then(res => {
//       console.log(res);
//       console.log(res.data);
//     })
// }