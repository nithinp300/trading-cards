import React, {Component} from 'react';
import MonsterCard from './MonsterCard'
import PaginationBar from './PaginationBar'
import {Container, Row, Col} from 'react-bootstrap'

class Monsters extends Component {
  constructor(){
    super();
    this.state = {
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

  // componentDidMount(){
  //   fetch("http://localhost:5000/monsters")
  //     .then(res => res.json())
  //     .then(data => {
  //       this.setState({
  //         monsters: data
  //       })
  //     })
  // }

  render(){
    let monsterCards = this.state.monsters.map(monster => {
      return(
        <Col md="4">
          <MonsterCard monster={monster}></MonsterCard>
        </Col>
      )
    })
    return(
      <div>
        <Container fluid="md">
          <Row>
            {monsterCards}
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