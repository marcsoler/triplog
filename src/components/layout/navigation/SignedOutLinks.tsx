import Nav from 'react-bootstrap/Nav'
import {NavLink} from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

const SignedOutLinks = () => {
    return (
        <>
            <Nav.Item as="li">
                <Nav.Link as={NavLink} to="/login">
                    <FontAwesomeIcon icon={faUser} />
                </Nav.Link>
            </Nav.Item>
        </>
    )
}

export default SignedOutLinks;
