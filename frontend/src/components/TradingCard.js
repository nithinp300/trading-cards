import React, {useState, useEffect} from 'react';
import {Button} from 'react-bootstrap'
import {Link, useRouteMatch} from 'react-router-dom';
import { useAuth0 } from "../react-auth0-spa";
import axios from 'axios';

function TradingCard(props) {
  function handleAddClick(){
    let cardData = props.monster
    console.log(cardData)
    // make a post request with card data
    axios.post(`http://localhost:5000/api/cards`, cardData)
      .then(res => {
        console.log(res);
        console.log(res.status);
        alert(`${cardData.name} was added to your Deck!`);
      })
  }

  function handleRemoveClick(){
    axios.delete(`http://localhost:5000/api/cards/${props.monster.id}`)
      .then(res => {
        console.log(res);
        console.log(res.data);
        alert(`${props.monster.name} was removed from your Deck`);
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
      <button onClick={handleRemoveClick}>Remove</button>
    </div>
  )
}

export default TradingCard