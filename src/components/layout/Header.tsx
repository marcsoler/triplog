import {Container, Navbar, Nav, NavDropdown} from 'react-bootstrap';

const Header = () => {
    return (
        <Navbar>
            <Container>
                <Navbar.Brand href="/">Triplog</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                </Nav>
                <Nav>
                    <NavDropdown title="Marc" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#">Logout</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default Header;
