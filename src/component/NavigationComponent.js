import React from "react";
// import '../styles/NavigationStyle.css'
import {Navbar, Container, Nav, NavDropdown, Image} from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    NavLink
} from "react-router-dom";

class NavigationComponent extends React.Component {
    render() {
        return (
            <div>
                <Navbar expand="lg" variant="dark" bg="dark">
                    <Container>
                        <Navbar.Brand href="/products">Mobile Mall
                            <NavLink className="notActive" activeClassName="activeLink" to="/products"/>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="/categorization">Categorize
                                    <NavLink className="notActive" activeClassName="activeLink" to="/categorization"/>
                                </Nav.Link>
                                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }

}

export default NavigationComponent