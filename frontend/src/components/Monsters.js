import React, {Component} from 'react';
import PaginationBar from './PaginationBar'
import {Container, Row, Col, Spinner} from 'react-bootstrap'
import TradingCard from './TradingCard'
import MonstersData from './monsters_data'
import FilterSort from './FilterSort'
import {Link, useRouteMatch} from 'react-router-dom';
import queryString from 'query-string'

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
      type: "",
      searchQuery: "",
      params: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handlePaginationClick = this.handlePaginationClick.bind(this);
  }

  componentDidMount(){
    console.log(this.props)
    console.log(queryString.stringify({q:"magician", sort:"-name"}))
    let params = queryString.parse(this.props.location.search)
    this.makeHttpRequestWithPage(params)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.makeSearchRequest()
    }
  }

  makeHttpRequestWithPage = async (params) => {
    if(typeof params["page"] === "undefined"){
      params["page"] = this.state.current_page
    }
    if(typeof params.attribute === "undefined"){
      params["attribute"] = this.state.attribute
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
    const response = await fetch(`https://yugioh-data-service.herokuapp.com/monsters?page=${params.page}&sort=${params.sortBy}&attribute=${params.attribute}&type=${params.monsterType}&race=${params.type}`, {
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

  makeSearchRequest = async => {
    if(this.state.searchQuery === ""){
      this.makeHttpRequestWithPage({})
    }
    else{
      fetch(`https://yugioh-data-service.herokuapp.com/monsters?q=${this.state.searchQuery}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          isLoading: false,
          monsters: data,
          total: data.length,
          per_page: data.length,
          current_page: 1,
          last_page: 1
        })
      })
    }
  }

  handleClearClick(){
    document.querySelectorAll('input[type=checkbox]').forEach( el => el.checked = false );
    this.makeHttpRequestWithPage(1)
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value, isLoading: true, current_page: 1})
    // this.props.history.push({
    //   pathname: '/monsters',
    //   search: "?" + queryString.stringify({})
    // })
    if(event.target.name !== "searchQuery") {
      this.makeHttpRequestWithPage({[event.target.name]: event.target.value, page: 1})
    }
  }

  handlePaginationClick(page) {
    this.setState({current_page: page, isLoading: true})
    this.makeHttpRequestWithPage({page: page})
  }

  render(){
    let url = "/monsters"
    let monsterCards = this.state.monsters.map(monster => {
      return(
        <Col md="4">
          <TradingCard monster={monster} url={url}></TradingCard>
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