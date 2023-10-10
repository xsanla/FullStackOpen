import { Link } from "react-router-dom";
import { logout } from "../reducers/userReducer";
import { useDispatch } from "react-redux";
import { Nav, Navbar } from "react-bootstrap";
const Menu = () => {
  const dispatch = useDispatch();
  const padding = {
    paddingRight: 5,
  };
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/">blogs</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/users">users</Link>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Menu;
