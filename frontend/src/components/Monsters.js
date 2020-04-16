import React, {Component} from 'react';
import PaginationBar from './PaginationBar'
import {Container, Row, Col, Spinner} from 'react-bootstrap'
import TradingCard from './TradingCard'
import MonstersData from './monsters_data'
import SortFilterSearch from './SortFilterSearch'
import queryString from 'query-string'

class Monsters extends Component {
  constructor(){
    super();
    this.state = {
      isLoading: true,
      monsters: MonstersData.data,
      total: MonstersData.total,
      per_page: MonstersData.per_page,
      currentPage: MonstersData.page,
      lastPage: MonstersData.total_pages,
      sort: "name",
      attribute: "",
      class: "",
      type: "",
      query: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handlePaginationClick = this.handlePaginationClick.bind(this);
  }

  componentDidMount(){
    console.log(this.props)
    console.log(queryString.stringify({q:"magician", sort:"-name"}))
    let params = queryString.parse(this.props.location.search)
    console.log(params)
    if(typeof params.query !== "undefined"){
      this.makeSearchRequest(params)
    }
    else{
      this.makePaginationRequest(params)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.props.history.push({
        pathname: '/monsters',
        search: "?" + queryString.stringify({query:this.state.query})
      })
      this.makeSearchRequest({})
    }
    if(prevState.currentPage !== this.state.currentPage){
      this.makePaginationRequest({})
    }
  }

  makePaginationRequest = async (params) => {
    if(typeof params["page"] === "undefined"){
      params["page"] = this.state.currentPage
    }
    if(typeof params.attribute === "undefined"){
      params["attribute"] = this.state.attribute
    }
    if(typeof params.sort === "undefined"){
      params["sort"] = this.state.sort
    }
    if(typeof params.class === "undefined"){
      params["class"] = this.state.class
    }
    if(typeof params.type === "undefined"){
      params["type"] = this.state.type
    }
    const response = await fetch(`https://yugioh-data-service.herokuapp.com/monsters?page=${params.page}&sort=${params.sort}&attribute=${params.attribute}&type=${params.class}&race=${params.type}`, {
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
      currentPage: data.page,
      lastPage: data.total_pages,
      attribute: params.attribute,
      class: params.class,
      type: params.type,
      sort: params.sort
    });
  }

  makeSearchRequest = async params => {
    if(typeof params.query === "undefined"){
      params.query = this.state.query
    }
    if(params.query === ""){
      this.makePaginationRequest({})
    }
    else{
      fetch(`https://yugioh-data-service.herokuapp.com/monsters?q=${params.query}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          isLoading: false,
          monsters: data,
          total: data.length,
          per_page: data.length,
          currentPage: 1,
          lastPage: 1,
          query: params.query
        })
      })
    }
  }

  handleClearClick(){
    document.querySelectorAll('input[type=checkbox]').forEach( el => el.checked = false );
    this.makePaginationRequest(1)
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value, isLoading: true, currentPage: 1})
    if(event.target.name !== "query") {
      this.makePaginationRequest({[event.target.name]: event.target.value, page: 1})
    }
  }

  handlePaginationClick(page) {
    this.setState({currentPage: page, isLoading: true})
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
        <SortFilterSearch
          handleChange={this.handleChange}
          {...this.state}>
        </SortFilterSearch>
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