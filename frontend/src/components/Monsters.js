import React, {Component} from 'react';
import PaginationBar from './PaginationBar'
import {Container, Row, Col, Dropdown, DropdownButton, Spinner} from 'react-bootstrap'
import TradingCard from './TradingCard'
import MonstersData from './monsters_data'
import MonsterCard from './MonsterCard'
import Pagination from 'react-bootstrap/Pagination'

class Monsters extends Component {
  constructor(){
    super();
    this.state = {
      isLoading: true,
      monsters: MonstersData.data,
      total: MonstersData.total,
      per_page: MonstersData.per_page,
      current_page: MonstersData.page,
      last_page: MonstersData.total_pages,
      attribute: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
    this.makeHttpRequestWithPage(1, "")
  }

  makeHttpRequestWithPage = async (pageNumber, attribute) => {
    if(!attribute){
      attribute = this.state.attribute
    }
    const response = await fetch(`https://yugioh-data-service.herokuapp.com/monsters?limit=6&page=${pageNumber}&attribute=${attribute}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    this.setState({
      isLoading: false,
      monsters: data.data,
      total: data.total,
      per_page: data.per_page,
      current_page: data.page,
      last_page: data.total_pages
    });
  }

  makeRequest = async pageNumber => {
    document.querySelectorAll('input[type=checkbox]').forEach( el => el.checked = false );
    fetch(`https://yugioh-data-service.herokuapp.com/monsters?limit=6&page=${pageNumber}`)
    .then(res => res.json())
    .then(data => {
      this.setState({
        isLoading: false,
        monsters: data.data,
        total: data.total,
        per_page: data.per_page,
        current_page: data.page,
        last_page: data.total_pages
      })
    })
  }

  handleClearClick(){
    document.querySelectorAll('input[type=checkbox]').forEach( el => el.checked = false );
    this.makeHttpRequestWithPage(1)
  }

  handleChange(event){
    this.setState({attribute: event.target.value, isLoading: true})
    this.makeHttpRequestWithPage(1, event.target.value)
  }

  render(){
    let monsterCards = this.state.monsters.map(monster => {
      return(
        <Col md="4">
          <TradingCard monster={monster}></TradingCard>
        </Col>
      )
    })
    let isLoaded = this.state.isLoading ? <Spinner style={{margin: "auto"}} animation="border" /> : monsterCards
    return(
      <div>
        <br></br>
        <div style={{float:"right"}}>
          <DropdownButton id="dropdown-basic-button" title="Sort by">
            <Dropdown.Item href="#/action-1">Name: A to Z</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Name: Z to A</Dropdown.Item>
            <Dropdown.Item href="#/action-3">ATK: Low to High</Dropdown.Item>
            <Dropdown.Item href="#/action-4">ATK: High to Low</Dropdown.Item>
            <Dropdown.Item href="#/action-4">DEF: Low to High</Dropdown.Item>
            <Dropdown.Item href="#/action-5">DEF: High to Low</Dropdown.Item>
            <Dropdown.Item href="#/action-5">Level: Low to High</Dropdown.Item>
            <Dropdown.Item href="#/action-5">Level: High to Low</Dropdown.Item>
          </DropdownButton>
        </div>
        <Container fluid="md">
          <Row >
            <label>Attribute &nbsp;</label>
            <select value={this.state.attribute} onChange={this.handleChange} name="attribute">
              <option value="">Choose...</option>
              <option value="DARK">Dark</option>
              <option value="DIVINE">Divine</option>
              <option value="EARTH">Earth</option>
              <option value="FIRE">Fire</option>
              <option value="LIGHT">Light</option>
              <option value="WATER">Water</option>
              <option value="WIND">Wind</option>
            </select>
            <label>&nbsp; Monster Type &nbsp;</label>
            <select value={this.state.type} name="type">
            </select>
            <label>&nbsp; Archetype &nbsp;</label>
            <select value={this.state.type} name="type">
            </select>
          </Row>
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