import Nav from 'react-bootstrap/Nav'

import Button from 'react-bootstrap/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import {useDispatch} from 'react-redux';
import {setAuthModal} from '../../../store/actions/authActions';

const SignedOutLinks = () => {

    const dispatch = useDispatch();

    const openLoginModal = () => {
        dispatch(setAuthModal(true));
    }

    return (
        <Nav.Item as="li">
            <Button variant="link" onClick={openLoginModal}>
                <FontAwesomeIcon icon={faUser} />
            </Button>
        </Nav.Item>
    )
}

export default SignedOutLinks;
