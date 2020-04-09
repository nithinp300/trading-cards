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
    document.querySelectorAll('input[type=checkbox]').forEach( el => el.checked = false );
    const response = await fetch(`https://yugioh-data-service.herokuapp.com/monsters?limit=6&page=${pageNumber}`, {
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
            <Form className="checkboxes">
              <div key={`inline-checkbox`} className="mb-3">
                <Form.Label>Attributes: &nbsp;</Form.Label>
                <Form.Check inline label="Dark" type="checkbox" id={`inline-checkbox-1`} />
                <Form.Check inline label="Divine" type="checkbox" id={`inline-checkbox-2`} />
                <Form.Check inline label="Earth" type="checkbox" id={`inline-checkbox-3`} />
                <Form.Check inline label="Fire" type="checkbox" id={`inline-checkbox-4`} />
                <Form.Check inline label="Light" type="checkbox" id={`inline-checkbox-5`} />
                <Form.Check inline label="Water" type="checkbox" id={`inline-checkbox-6`} />
                <Form.Check inline label="Wind" type="checkbox" id={`inline-checkbox-7`} />
                <Button variant="primary">Filter</Button>
                <Button onClick={() => this.makeHttpRequestWithPage(1)} style={{marginLeft:"1rem"}} variant="secondary">Clear All</Button>
              </div>
            </Form>
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