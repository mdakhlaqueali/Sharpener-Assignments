import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Container } from "react-bootstrap";
import "../App.css";
import Cart from "./Cart";

const MyNavbar = () => {
  return (
    <Navbar bg="dark" data-bs-theme="dark" fixed="top">
        <Container>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Store</Nav.Link>
            <Nav.Link href="#pricing">About</Nav.Link>
          </Nav>
          <Cart/>
        </Container>
    </Navbar>
  );
};

export default MyNavbar;