import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';


import SignIn from './SignIn';
import SignUp from './SignUp';
import React, {useState} from 'react';
import {setAuthModal} from '../../store/actions/authActions';
import {useDispatch} from 'react-redux';
import useAuthSelector from '../../hooks/useAuthSelector';
import ForgotPassword from './ForgotPassword';


const AuthModal = () => {

    const dispatch = useDispatch();

    const [view, setView] = useState('login');

    const {showModal} = useAuthSelector();

    const handleClose = () => {
        dispatch(setAuthModal(false));
    }

    return (
        <Modal show={showModal} onHide={handleClose} fullscreen="sm-down">
            <Modal.Body>
                <Tabs defaultActiveKey="login" id="auth-tabs" variant="pills">
                    <Tab eventKey="login" title="Login">
                        <br/>
                        <SignIn />
                    </Tab>
                    <Tab eventKey="register" title="Create account">
                        <br/>
                        <SignUp />
                    </Tab>
                    <Tab eventKey="recovery" title="Recover">
                        <ForgotPassword />
                    </Tab>
                </Tabs>
            </Modal.Body>
        </Modal>
    )

}

export default AuthModal;
