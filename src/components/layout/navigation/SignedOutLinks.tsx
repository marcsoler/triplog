import Nav from 'react-bootstrap/Nav'
import {NavLink} from 'react-router-dom';

const SignedOutLinks = () => {
    return (
        <>
            <Nav.Item as="li">
                <Nav.Link as={NavLink} to="/register">Register</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
                <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
            </Nav.Item>
        </>
    )
}

export default SignedOutLinks;
