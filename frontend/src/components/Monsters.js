import React, {Component} from 'react';
import PaginationBar from './PaginationBar'
import {Container, Row, Col, Spinner} from 'react-bootstrap'
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
      sortBy: "name",
      attribute: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handlePaginationClick = this.handlePaginationClick.bind(this);
  }

  componentDidMount(){
    this.makeHttpRequestWithPage(1, {})
  }

  makeHttpRequestWithPage = async (pageNumber, params) => {
    if(typeof params.attribute === "undefined"){
      params.attribute = this.state.attribute
    }
    if(typeof params.sortBy === "undefined"){
      params["sortBy"] = this.state.sortBy
    }
    const response = await fetch(`https://yugioh-data-service.herokuapp.com/monsters?page=${pageNumber}&sort=${params.sortBy}&attribute=${params.attribute}`, {
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

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value, isLoading: true})
    this.makeHttpRequestWithPage(1, {[event.target.name]: event.target.value})
  }

  handlePaginationClick(page) {
    this.setState({isLoading: true})
    this.makeHttpRequestWithPage(page, {})
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
          <label>Sort by &nbsp;</label>
          <select value={this.state.sortBy} onChange={this.handleChange} name="sortBy">
            <option value="name">Name: A to Z</option>
            <option value="-name">Name: Z to A</option>
            <option value="atk">ATK: Low to High</option>
            <option value="-atk">ATK: High to Low</option>
            <option value="def">DEF: Low to High</option>
            <option value="-def">DEF: High to Low</option>
            <option value="level">Level: Low to High</option>
            <option value="-level">Level: High to Low</option>
          </select>
        </div>
        <Container fluid="md">
          <Row >
            <label>Attribute: &nbsp;</label>
            <select value={this.state.attribute} onChange={this.handleChange} name="attribute">
              <option value="">Choose</option>
              <option value="DARK">Dark</option>
              <option value="DIVINE">Divine</option>
              <option value="EARTH">Earth</option>
              <option value="FIRE">Fire</option>
              <option value="LIGHT">Light</option>
              <option value="WATER">Water</option>
              <option value="WIND">Wind</option>
            </select>
            <label>&nbsp; Monster Type: &nbsp;</label>
            <select value={this.state.type} name="type">
            </select>
            <label>&nbsp; Archetype: &nbsp;</label>
            <select value={this.state.type} name="type">
            </select>
          </Row>
          <Row>
            {isLoaded}
          </Row>
          <Row>
            <div style={{margin:"auto"}}>
              <Pagination>
                <Pagination.First disabled={this.state.current_page === 1} 
                onClick={() => this.handlePaginationClick(1)}/>
                <Pagination.Prev disabled={this.state.current_page === 1}
                onClick={() => this.handlePaginationClick(this.state.current_page-1)}/>
                <Pagination.Item>{this.state.current_page}</Pagination.Item>
                <Pagination.Next disabled={this.state.current_page === this.state.last_page} 
                onClick={() => this.handlePaginationClick(this.state.current_page+1)}/>
                <Pagination.Last disabled={this.state.current_page === this.state.last_page} 
                onClick={() => this.handlePaginationClick(this.state.last_page)}/>
              </Pagination>
            </div>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Monsters;