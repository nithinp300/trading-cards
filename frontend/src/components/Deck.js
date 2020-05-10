import React, { Component } from "react";
import axios from 'axios';
import {Container, Row, Col, Spinner} from 'react-bootstrap'
import TradingCard from './TradingCard'

class Deck extends Component {
  constructor(){
    super();
    this.state = {
      cards : []
    }
  }
  
  componentDidMount(){
    axios.get(`http://localhost:5000/api/cards`)
      .then(res => {
        const cards = res.data;
        this.setState({ cards });
      })
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
    return(
      <Container fluid="md">
        <Row>
          <p>&nbsp;</p>
        </Row>
        <Row>
          {monsterCards}
        </Row>
      </Container>
    );
  }
}

export default Deck;