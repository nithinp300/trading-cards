import React, { Component } from "react";
import axios from 'axios';
import {Container, Row, Col, Spinner} from 'react-bootstrap'
import TradingCard from './TradingCard'

class Deck extends Component {
  constructor(){
    super();
    this.state = {
      cards: [],
      selectedFile: null
    }
    this.onFileChange = this.onFileChange.bind(this);
    this.onFileUpload = this.onFileUpload.bind(this);
    this.makeSearchRequest = this.makeSearchRequest.bind(this);
  }
  
  componentDidMount(){
    axios.get(`http://localhost:5000/api/cards`)
      .then(res => {
        const cards = res.data;
        this.setState({ cards });
      })
  }

  componentDidUpdate() {
    axios.get(`http://localhost:5000/api/cards`)
    .then(res => {
      const cards = res.data;
      this.setState({ cards });
    })
  }

  onFileUpload() {
    const form = new FormData();
    form.append('image', this.state.selectedFile);
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
      for(let i = 0; i < words.length; i++) {
        nameArr.push(words[i].text);
      }
      let name = nameArr.join(" ");
      console.log(name);
      this.makeSearchRequest(name);
    })
    .catch(function (response) {
      //handle error
      console.log(response);
    });
  }

  makeSearchRequest(searchQuery) {
    const currentComponent = this;
    axios.get(`https://yugioh-data-service.herokuapp.com/monsters?q=${searchQuery}`)
      .then(function (response) {
        // handle success
        console.log(response.data[0]);
        currentComponent.makeAddRequest(response.data[0])
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }

  makeAddRequest(cardData) {
    axios.post(`http://localhost:5000/api/cards`, cardData)
    .then(res => {
      console.log(res);
      console.log(res.status);
      alert(`${cardData.name} was added to your Deck!`);
    })
  }

  onFileChange(event) {
    // Update the state
    this.setState({ selectedFile: event.target.files[0] });
  }

  render(){
    let url = "/monsters"
    let monsterCards = this.state.cards.map(card => {
      return(
        <Col md="4">
          <TradingCard monster={card} url={url} inDeck={true}></TradingCard>
        </Col>
      )
    })

    const fileData = () => {
      if (this.state.selectedFile) {
        return (
          <div> 
            <h2>File Details:</h2> 
            <p>File Name: {this.state.selectedFile.name}</p> 
            <p>File Type: {this.state.selectedFile.type}</p> 
            <p> 
              Last Modified:{" "} 
              {this.state.selectedFile.lastModifiedDate.toDateString()} 
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
    }
    return(
      <div>
        <Container fluid="md">
          {/* <Row>
            <p>&nbsp;</p>
          </Row> */}
          <Row>
            <div style={{margin: "auto"}}>
              <h4>Upload an image of a card to add to your Deck</h4>
              <input type="file" onChange={this.onFileChange}></input>
              <button onClick={this.onFileUpload}>Upload</button>
            </div>
          </Row>
          <Row>
            {monsterCards}
          </Row>
        </Container>
      </div>
    );
  }
}

export default Deck;