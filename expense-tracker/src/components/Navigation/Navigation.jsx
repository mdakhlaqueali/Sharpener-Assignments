import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import {Link, useNavigate} from "react-router-dom";

const Navigation = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
    navigate('/login');
  }
    return(
        <Navbar bg="dark" data-bs-theme="dark">
        <Container>

          <Nav className="me-auto">
            <Nav.Link as={Link} to='/'>Home</Nav.Link>
            {isLoggedIn && <Nav.Link as={Link} to="/profile">Profile</Nav.Link>}
          </Nav>
          {isLoggedIn ? (
          <Nav>
            <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>
          </Nav>
        ) : (
          <Nav>
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
          </Nav>
        )}  
        </Container>
      </Navbar>
    )
}
export default Navigation;