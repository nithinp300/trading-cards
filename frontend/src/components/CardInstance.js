import React, {Component} from 'react';
import {Link, useRouteMatch} from 'react-router-dom';

class TradingCard extends Component {
  constructor(){
    super();
    this.state = {
      cardData: {}
    }
  }

  componentDidMount(){
    fetch(`https://yugioh-data-service.herokuapp.com/monsters/${this.props.match.params.id}`)
    .then(res => res.json())
    .then((data) => {
      this.setState({ cardData: data })
    })
    .catch(console.log)
  }
    
  render(){
    console.log(this.state.cardData)
    if (!this.state.cardData.card_images) return null
    let cardSets = this.state.cardData.card_sets
    let sets = ""
    if(typeof cardSets === "undefined"){
      sets = <h5>None</h5>
    }
    else{
      sets = cardSets.map(set => {
        return(
          <h5>{set.set_name}</h5>
        )
      })
    }
    return(
      <div>
        <img src={this.state.cardData.card_images[0].image_url} alt="card img" height="500px" width="350px" align="left" style={{margin:"2rem"}}></img>
        <div style={{padding:"1.5rem"}}>
          <h1>{this.state.cardData.name}</h1>
          <h3>Level {this.state.cardData.level} {this.state.cardData.attribute} Monster</h3>
          <h3>{this.state.cardData.race}-Type {this.state.cardData.type}</h3>
          <h4>ATK/ {this.state.cardData.atk} &nbsp;&nbsp;&nbsp;DEF/ {this.state.cardData.def}</h4>
          <h5>{this.state.cardData.desc}</h5>
          <br></br>
          <h4>This card can be found in the following card sets:</h4>
          {sets}
        </div>
      </div>
    )
  }
}

export default TradingCard