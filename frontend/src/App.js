import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Nav, Navbar, Form, FormControl, Button} from 'react-bootstrap';
import {
    BrowserRouter,
    Switch,
    Route
  } from 'react-router-dom';
import Monsters from './Monsters'

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
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-info">Search</Button>
        </Form>
      </Navbar>
      <BrowserRouter>
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
          <Route path="/Traps">
              <Traps />
          </Route>
          <Route path="/Spells">
              <Spells />
          </Route>
          <Route path="/Monsters">
              <Monsters />
          </Route>
          <Route path="/">
              <Home />
          </Route>
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