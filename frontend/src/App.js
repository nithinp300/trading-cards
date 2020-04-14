import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Nav, Navbar, Form, FormControl, Button} from 'react-bootstrap';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Monsters from './components/Monsters'
import Error from './components/Error'
import CardInstance from './components/CardInstance'

export default function App(){
  return(
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Yu-Gi-Oh! Deck</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/monsters">Monsters</Nav.Link>
          <Nav.Link href="/spells">Spells</Nav.Link>
          <Nav.Link href="/traps">Traps</Nav.Link>
        </Nav>
      </Navbar>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/Traps" component={Traps}/>
          <Route path="/Spells" component={Spells}/>
          <Route path="/Monsters" exact component={Monsters}/>
          <Route path="/Monsters/:id" component={CardInstance}/>
          <Route component={Error}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

function Home() {
    return <h2>Home</h2>;
  }

function Spells() {
  return <h2>Spells</h2>;
}

function Traps() {
  return <h2>Traps</h2>;
}