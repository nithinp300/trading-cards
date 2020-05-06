import React, { Fragment, useState, useEffect} from "react";
import { useAuth0 } from "../react-auth0-spa";
import axios from 'axios';
import TradingCard from './TradingCard'

function Profile(){
  const { loading, user } = useAuth0();
  const [count, setCount] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [cardName, setCardName] = useState("");
  const [cardData, setCardData] = useState(null);

  useEffect(() => {
  });

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  const onFileChange = (event) => {
    // Update the state 
    setSelectedFile(event.target.files[0]);
  };

  const fileData = () => {
    if (cardData) {
      return (
        <div> 
          <img src={cardData.card_images[0].image_url}></img>
          <h2>File Details:</h2> 
          <p>Card Name: {cardName}</p>
          <p>File Name: {selectedFile.name}</p> 
          <p>File Type: {selectedFile.type}</p> 
          <p> 
            Last Modified:{" "} 
            {selectedFile.lastModifiedDate.toDateString()} 
          </p>
        </div> 
      ); 
    } else { 
      return ( 
        <div> 
          <br /> 
          <h4>Choose before Pressing the Upload button</h4> 
        </div> 
      ); 
    } 
  };

  const onFileUpload = () => {
    const form = new FormData();
    form.append('image', selectedFile);
    axios.post(
      'https://yugioh-deck.cognitiveservices.azure.com/vision/v2.0/ocr?language=unk&detectOrientation=true', 
      form, 
      { headers: {'Ocp-Apim-Subscription-Key':process.env.REACT_APP_COGNITIVE_SERVICES_API_KEY,'Content-Type': 'multipart/form-data'} })
    .then(res => {
      // handle success
      console.log(res);
      console.log(res.data);
      console.log(res.data.regions[0].lines[0].words);
      let words = res.data.regions[0].lines[0].words;
      let nameArr = [];
      for(let i = 0; i < words.length; i++){
        nameArr.push(words[i].text);
      }
      let name = nameArr.join(" ");
      console.log(name);
      setCardName(name);
      axios.get(`https://yugioh-data-service.herokuapp.com/monsters?q=${name}`)
        .then(function (response) {
          // handle success
          console.log(response.data[0]);
          setCardData(response.data[0]);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    })
    .catch(function (response) {
      //handle error
      console.log(response);
    });
  };

  return (
    <Fragment>
      <code>{JSON.stringify(user, null, 2)}</code>
      <div>
        <input type="file" onChange={onFileChange}></input>
        <button onClick={onFileUpload}>
          Upload
        </button>
      </div>
      {fileData()}
    </Fragment>
  );
};

export default Profile;