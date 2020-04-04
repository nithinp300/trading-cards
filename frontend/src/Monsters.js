import React, {Component} from 'react';
import MonsterCard from './MonsterCard'
import PaginationBar from './PaginationBar'

class Monsters extends Component{
  constructor(){
    super();
    this.state = [];
  }

  componentDidMount(){
    fetch("http://localhost:5000/monsters")
      .then(res => res.json())
      .then(data => console.log(data))
  }

  render(){
    return(
      <div>
        <div class="row">
          <div class="col-sm-3"><MonsterCard monster={{name: "Nithin", desc: "This is a description"}}></MonsterCard></div>
          <div class="col-sm-3"><MonsterCard monster={{name: "Nithin", desc: "This is a description"}}></MonsterCard></div>
          <div class="col-sm-3"><MonsterCard monster={{name: "Nithin", desc: "This is a description"}}></MonsterCard></div>
          <div class="col-sm-3"><MonsterCard monster={{name: "Nithin", desc: "This is a description"}}></MonsterCard></div>
        </div>
        <br></br>
        <div class="row">
            <div class="col-sm-3"><MonsterCard monster={{name: "Nithin", desc: "This is a description"}}></MonsterCard></div>
            <div class="col-sm-3"><MonsterCard monster={{name: "Nithin", desc: "This is a description"}}></MonsterCard></div>
            <div class="col-sm-3"><MonsterCard monster={{name: "Nithin", desc: "This is a description"}}></MonsterCard></div>
            <div class="col-sm-3"><MonsterCard monster={{name: "Nithin", desc: "This is a description"}}></MonsterCard></div>
        </div>
        <br></br>
        <div>
        <PaginationBar></PaginationBar>
        </div>
      </div>
    );
  }
}

export default Monsters;