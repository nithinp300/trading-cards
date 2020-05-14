import React, {useState, useEffect} from 'react';
import {Link, useRouteMatch} from 'react-router-dom';
import { useAuth0 } from "../react-auth0-spa";
import axios from 'axios';

function TradingCard(props) {
  const [inDeck, setInDeck] = useState(props.inDeck);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/cards`)
    .then(res => {
      let deckArr = res.data;
      let i = 0;
      for(i = 0; i < deckArr.length; i++){
        if(props.monster.id === deckArr[i].id) {
          setInDeck(true);
        }
      }
    })
  }, []);
  function handleAddClick(){
    let cardData = props.monster
    console.log(cardData)
    // make a post request with card data
    axios.post(`http://localhost:5000/api/cards`, cardData)
      .then(res => {
        console.log(res);
        console.log(res.status);
        setInDeck(true)
        //alert(`${cardData.name} was added to your Deck!`);
      })
  }

  function handleRemoveClick(){
    axios.delete(`http://localhost:5000/api/cards/${props.monster.id}`)
      .then(res => {
        console.log(res);
        console.log(res.data);
        setInDeck(false);
        //alert(`${props.monster.name} was removed from your Deck`);
      })
  }
  function showButton(){
    if(inDeck){
      return(<button style={{width:"100%"}} onClick={handleRemoveClick}>Remove</button>)
    }
    else{
      return(<button style={{width:"100%"}} onClick={handleAddClick}>Add</button>)
    }
  }
  const { isAuthenticated } = useAuth0();
  if (!props.monster.card_images) return null;
  return(
    <div style={{margin:"2rem"}}>
      <Link to={`${props.url}/${props.monster.id}`} style={{textDecoration:"none"}}>
        <img src={props.monster.card_images[0].image_url} alt={props.monster.name} height="400" width="286"></img>
      </Link>
      {showButton()}
    </div>
  )
}

export default TradingCard