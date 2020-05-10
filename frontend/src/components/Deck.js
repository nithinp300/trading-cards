import React, { Component } from "react";
import axios from 'axios';
import {Container, Row, Col, Spinner} from 'react-bootstrap'
import TradingCard from './TradingCard'

class Deck extends Component {
  constructor(){
    super();
    this.state = {
      cards: [],
      selectedFile: null,
      cardName: null,
      cardData: null
    }
    this.onFileChange = this.onFileChange.bind(this);
    this.onFileUpload = this.onFileUpload.bind(this);
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
      for(let i = 0; i < words.length; i++){
        nameArr.push(words[i].text);
      }
      let name = nameArr.join(" ");
      console.log(name);
      this.setState({cardName: name});
      axios.get(`https://yugioh-data-service.herokuapp.com/monsters?q=${name}`)
        .then(function (response) {
          // handle success
          console.log(response.data[0]);
          this.setState({cardData: response.data[0]});
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
          <TradingCard monster={card} url={url}></TradingCard>
        </Col>
      )
    })

    const fileData = () => {
      if (this.state.cardData) {
        return (
          <div> 
            <img src={this.state.cardData.card_images[0].image_url}></img>
            <h2>File Details:</h2> 
            <p>Card Name: {this.state.cardName}</p>
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
          <Row>
            <p>&nbsp;</p>
          </Row>
          <Row>
            <input type="file" onChange={this.onFileChange}></input>
            <button onClick={this.onFileUpload}>
              Upload
            </button>
          </Row>
          <Row>
          {fileData()}
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