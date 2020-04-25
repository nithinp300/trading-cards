import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Router, Switch, Route} from 'react-router-dom';
import Monsters from './components/Monsters'
import Error from './components/Error'
import CardInstance from './components/CardInstance'
import NavBar from "./components/NavBar";
import Profile from "./components/Profile";
import history from "./utils/history";
import { useAuth0 } from "./react-auth0-spa";
import PrivateRoute from "./components/PrivateRoute";

export default function App(){
  const { loading } = useAuth0();

  if (loading) {
    return <div>Loading...</div>;
  }

  return(
    <div>
      <NavBar />
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/traps" component={Traps}/>
          <Route path="/spells" component={Spells}/>
          <Route path="/monsters" exact component={Monsters}/>
          <Route path="/monsters/:id" component={CardInstance}/>
          <PrivateRoute path="/profile" component={Profile} />
          <Route component={Error}/>
        </Switch>
      </Router>
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