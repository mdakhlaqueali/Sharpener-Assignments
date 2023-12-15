import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import "../App.css";
import Cart from "./Cart";
import {NavLink} from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../store/auth-context";

const MyNavbar = () => {

  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
  }

  return (
    <Navbar className="sticky-top navbar navbar-expand-lg navbar-dark bg-dark">
        <Container>
          <Nav className="me-auto">
           {isLoggedIn? ( <>
            <NavLink to="/" className="nav-link">Home</NavLink>
            <NavLink to="/store" className="nav-link">Store</NavLink>
            <NavLink to="/about" className="nav-link">About</NavLink>
            <NavLink to="/contact" className="nav-link">Contact</NavLink>
            </>
            ):(
            <NavLink to="/auth" className="nav-link">Login</NavLink>
            )}
          </Nav>
          
          {isLoggedIn && <Cart/>}
          {authCtx.isLoggedIn && <Button onClick={logoutHandler} variant="danger">Logout</Button>}
        </Container>
    </Navbar>
  );
};

export default MyNavbar;