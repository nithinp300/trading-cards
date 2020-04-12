import React, {Component} from 'react';
import PaginationBar from './PaginationBar'
import {Container, Row, Col, Spinner} from 'react-bootstrap'
import TradingCard from './TradingCard'
import MonstersData from './monsters_data'
import FilterSort from './FilterSort'

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
      attribute: "",
      monsterType: "",
      type: ""
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
    if(typeof params.monsterType === "undefined"){
      params["monsterType"] = this.state.monsterType
    }
    if(typeof params.type === "undefined"){
      params["type"] = this.state.type
    }
    const response = await fetch(`https://yugioh-data-service.herokuapp.com/monsters?page=${pageNumber}&sort=${params.sortBy}&attribute=${params.attribute}&type=${params.monsterType}&race=${params.type}`, {
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
        <FilterSort
          handleChange={this.handleChange}
          {...this.state}>
        </FilterSort>
        <Container fluid="md">
          <Row>
            <p>&nbsp;</p>
          </Row>
          <Row>
            {isLoaded}
          </Row>
          <Row>
            <PaginationBar
              handlePaginationClick={this.handlePaginationClick}
              {...this.state}>
            </PaginationBar>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Monsters;