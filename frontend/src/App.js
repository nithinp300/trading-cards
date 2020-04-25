import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Monsters from './components/Monsters'
import Error from './components/Error'
import CardInstance from './components/CardInstance'
import NavBar from "./components/NavBar";
import { useAuth0 } from "./react-auth0-spa";

export default function App(){
  const { loading } = useAuth0();

  if (loading) {
    return <div>Loading...</div>;
  }

  return(
    <div>
      <NavBar />
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