import {FC, useState, useEffect} from 'react';
import {Link, useLocation} from 'react-router-dom';

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
    const location = useLocation();

    const [offset, setOffset] = useState(0);
    const [currentLocation, setCurrentLocation] = useState<string>('');


    useEffect(() => {
        setCurrentLocation(location.pathname);
        const onScroll = () => setOffset(window.scrollY);
        onScroll();
        window.removeEventListener('scroll', onScroll);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', onScroll)
        };
    }, [location]);



    return (
        <Navbar variant="dark" fixed="top" className={(offset > 0 || currentLocation !== '/') ? 'navbar-bg' : ''}>
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
