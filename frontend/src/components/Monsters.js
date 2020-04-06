import React, {Component} from 'react';
import PaginationBar from './PaginationBar'
import {Container, Row, Col} from 'react-bootstrap'
import TradingCard from './TradingCard'
import MonstersData from './monsters_data'
import MonsterCard from './MonsterCard'
import Pagination from 'react-bootstrap/Pagination'

class Monsters extends Component {
  constructor(){
    super();
    this.state = {
      loading: false,
      monsters: MonstersData.data,
      total: MonstersData.total,
      per_page: MonstersData.per_page,
      current_page: MonstersData.page,
      last_page: MonstersData.total_pages,
    };
  }

  componentDidMount(){
    this.makeHttpRequestWithPage(1)
  }

  makeHttpRequestWithPage = async pageNumber => {
    const response = await fetch(`http://localhost:5000/monsters?limit=6&page=${pageNumber}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    this.setState({
      monsters: data.data,
      total: data.total,
      per_page: data.per_page,
      current_page: data.page,
      last_page: data.total_pages
    });
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
            <Col md="3">
              <Pagination>
                <Pagination.First disabled={this.state.current_page === 1} 
                onClick={() => this.makeHttpRequestWithPage(1)}/>
                <Pagination.Prev disabled={this.state.current_page === 1} 
                onClick={() => this.makeHttpRequestWithPage(this.state.current_page-1)}/>
                <Pagination.Item>{this.state.current_page}</Pagination.Item>
                <Pagination.Next disabled={this.state.current_page === this.state.last_page} 
                onClick={() => this.makeHttpRequestWithPage(this.state.current_page+1)}/>
                <Pagination.Last disabled={this.state.current_page === this.state.last_page} 
                onClick={() => this.makeHttpRequestWithPage(this.state.last_page)}/>
              </Pagination>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Monsters;