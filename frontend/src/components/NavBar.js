import React from "react";
import {Nav, Navbar} from 'react-bootstrap';
import { useAuth0 } from "../react-auth0-spa";

const NavBar = () => {
  console.log(useAuth0().isAuthenticated);
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Yu-Gi-Oh! Deck</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/monsters">Monsters</Nav.Link>
          <Nav.Link href="/spells">Spells</Nav.Link>
          <Nav.Link href="/traps">Traps</Nav.Link>
          {!isAuthenticated && 
          (<Nav.Link onClick={() => loginWithRedirect({})}>Log in</Nav.Link>)
          }
          {isAuthenticated && <Nav.Link onClick={() => logout()}>Log out</Nav.Link>}
          {isAuthenticated && <Nav.Link href="/profile">Profile</Nav.Link>}
        </Nav>
      </Navbar>
    </div>
  );
};

export default NavBar;