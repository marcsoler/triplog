import Modal from 'react-bootstrap/Modal';
import SignIn from './SignIn';
import React from 'react';
import {setAuthModal} from '../../store/actions/authActions';
import {useDispatch} from 'react-redux';
import useAuthSelector from '../../hooks/useAuthSelector';

const AuthModal = () => {

    const dispatch = useDispatch();

    const {showModal} = useAuthSelector();

    const handleClose = () => {
        dispatch(setAuthModal(false));
    }

    return (
        <Modal show={showModal} onHide={handleClose} fullscreen="sm-down">
            <Modal.Header>Login</Modal.Header>
            <Modal.Body>
                <SignIn />
            </Modal.Body>
        </Modal>
    )

}

export default AuthModal;
