import React, {Component} from 'react';
import PaginationBar from './PaginationBar'
import {Container, Row, Col} from 'react-bootstrap'
import TradingCard from './TradingCard'
import monsterData from './monsters_data'

class Monsters extends Component {
  constructor(){
    super();
    this.state = {
      loading: false,
      monsters: monsterData
    };
  }

  // componentDidMount(){
  //   this.setState({loading: true})
  //   fetch("http://localhost:5000/monsters")
  //     .then(res => res.json())
  //     .then(data => {
  //       this.setState({
  //         loading: false,
  //         monsters: data
  //       })
  //     })
  // }

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