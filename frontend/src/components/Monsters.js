import React, {Component} from 'react';
import PaginationBar from './PaginationBar'
import {Container, Row, Col, Dropdown, DropdownButton, Form, Button} from 'react-bootstrap'
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
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    this.makeHttpRequestWithPage(1,"")
  }

  makeHttpRequestWithPage = async (pageNumber) => {
    document.querySelectorAll('input[type=checkbox]').forEach( el => el.checked = false );
    const response = await fetch(`https://yugioh-data-service.herokuapp.com/monsters?limit=6&page=${pageNumber}&attribute=${this.state.attribute}`, {
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
    this.setState({attribute: event.target.value})
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.attribute);
  }

  render(){
    let monsterCards = this.state.monsters.map(monster => {
      return(
        <Col md="4">
          <TradingCard monster={monster}></TradingCard>
        </Col>
      )
    })
    let isLoaded = this.state.isLoading ? "Loading..." : monsterCards
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
            <h2>{this.state.attribute}</h2>
            {/* <Form onSubmit={this.handleSubmit}>
              <Form.Label>Attributes: &nbsp;</Form.Label>
              <Form.Control as="select" value="Attribute">
                <option>Dark</option>
                <option>Divine</option>
              </Form.Control>
              <Form.Check inline name="attribute" value="DARK" label="Dark" type="radio" id={`inline-radio-1`} />
              <Form.Check inline name="attribute" value="DIVINE" label="Divine" type="radio" id={`inline-radio-2`} />
              <Form.Check inline name="attribute" value="EARTH" label="Earth" type="radio" id={`inline-radio-3`} />
              <Form.Check inline name="attribute" value="FIRE" label="Fire" type="radio" id={`inline-radio-4`} />
              <Form.Check inline name="attribute" value="LIGHT" label="Light" type="radio" id={`inline-radio-5`} />
              <Form.Check inline name="attribute" value="WATER" label="Water" type="radio" id={`inline-radio-6`} />
              <Form.Check inline name="attribute" value="WIND" label="Wind" type="radio" id={`inline-radio-7`} />
              <Button variant="primary" type="submit">Filter</Button>
              <Button onClick={() => this.handleClearAllClick()} style={{marginLeft:"1rem"}} variant="secondary">Clear</Button>
            </Form> */}
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