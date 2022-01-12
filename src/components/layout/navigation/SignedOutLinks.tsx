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
        <Button as="li" variant="link" onClick={openLoginModal} aria-label="Authentication modal trigger">
            <FontAwesomeIcon icon={faUser} />
        </Button>
    )
}

export default SignedOutLinks;
