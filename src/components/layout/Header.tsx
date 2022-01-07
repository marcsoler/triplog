import {FC, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faRoute} from '@fortawesome/free-solid-svg-icons'

import SingedInLinks from './navigation/SingedInLinks';
import SignedOutLinks from './navigation/SignedOutLinks';
import useAuthSelector from '../../hooks/useAuthSelector';

const Header: FC = () => {

    const auth = useAuthSelector();

    const [offset, setOffset] = useState(0);


    useEffect(() => {
        window.onscroll = () => {
            setOffset(window.scrollY);
        }
    }, []);



    return (
        <Navbar expand="lg" variant="dark" fixed="top" className={offset > 0 ? 'navbar-bg' : ''}>
            <Container>
                <Link className="navbar-brand" to="/">
                    <FontAwesomeIcon icon={faRoute} size="2x" /> Triplog</Link>
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
