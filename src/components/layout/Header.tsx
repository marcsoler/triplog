import {FC} from 'react';
import {Link} from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import SingedInLinks from './navigation/SingedInLinks';
import SignedOutLinks from './navigation/SignedOutLinks';
import useAuthSelector from '../../hooks/useAuthSelector';

const Header: FC = () => {

    const auth = useAuthSelector();

    return (
        <Navbar expand="lg" fixed="top">
            <Container>
                <Link className="navbar-brand" to="/">Triplog</Link>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse className="justify-content-end" id="navbar-nav">
                    <Nav>
                        {auth.user ? <SingedInLinks/> : <SignedOutLinks/>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
