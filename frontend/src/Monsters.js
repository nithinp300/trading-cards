import React, {Component} from 'react';
import MonsterCard from './MonsterCard'
import PaginationBar from './PaginationBar'
import {Container, Row, Col} from 'react-bootstrap'
import TradingCard from './TradingCard'

class Monsters extends Component {
  constructor(){
    super();
    this.state = {
      loading: false,
      monsters: [
        {
          name: "Tornado Dragon",
          desc: "This is a description for tornado"
        },
        {
          name: "Fire Dragon",
          desc: "This is a description for fire"
        },
        {
          name: "Ice Dragon",
          desc: "This is a description for ice"
        },
        {
          name: "Tornado Dragon",
          desc: "This is a description for tornado"
        },
        {
          name: "Fire Dragon",
          desc: "This is a description for fire"
        }
      ]
    };
  }

  componentDidMount(){
    this.setState({loading: true})
    fetch("http://localhost:5000/monsters")
      .then(res => res.json())
      .then(data => {
        this.setState({
          loading: false,
          monsters: data
        })
      })
  }

  render(){
    let monsterCards = this.state.monsters.map(monster => {
      return(
        <Col md="4">
          <TradingCard monster={monster}></TradingCard>
        </Col>
      )
    })
    let isLoaded = this.state.loading ? "Loading..." : monsterCards
    return(
      <div>
        <Container fluid="md">
          <Row>
            {isLoaded}
          </Row>
          <br></br>
          <Row className="justify-content-md-center">
            <Col md="6"><PaginationBar></PaginationBar></Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Monsters;