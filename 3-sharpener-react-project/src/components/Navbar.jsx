import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import "./Navbar.css";
import { Link } from "react-router-dom";
import CartComp from "./CartComp";

function ShoeNavbar() {
  return (
    <Navbar expand="lg" className="navbar-custom">
      <Container>
        <Nav.Link className="navbar-brand" as={Link} to="/addproduct">
          Sharpener Assignment
        </Nav.Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/a">
              Add Product
            </Nav.Link>
            <Nav.Link as={Link} to="/productpage">
              Product Page
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        {/* <Nav.Link className="cart" as={Link} to="/cart">
              Cart 0
            </Nav.Link> */}
        <CartComp />
      </Container>
      {/* <Navbar.Collapse>
        <p className="cart">Cart 0</p>
      </Navbar.Collapse> */}
    </Navbar>
  );
}

export default ShoeNavbar;
