import {FC} from 'react';

import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';


import SignIn from './SignIn';
import SignUp from './SignUp';
import {setAuthModal} from '../../store/actions/authActions';
import {useDispatch} from 'react-redux';
import useAuthSelector from '../../hooks/useAuthSelector';
import ForgotPassword from './ForgotPassword';


const AuthModal:FC = () => {

    const dispatch = useDispatch();

    const {showModal} = useAuthSelector();

    const handleClose = () => {
        dispatch(setAuthModal(false));
    }

    return (
        <Modal show={showModal} onHide={handleClose} fullscreen="sm-down">
            <Modal.Body>
                <Tabs defaultActiveKey="login" id="auth-tabs" variant="pills">
                    <Tab eventKey="login" title="Sign in" className="tab-login mt-3">
                        <SignIn />
                    </Tab>
                    <Tab eventKey="register" title="Create account" className="tab-register mt-3">
                        <SignUp />
                    </Tab>
                    <Tab eventKey="recovery" title="Recover" className="tab-recovery mt-3">
                        <ForgotPassword />
                    </Tab>
                </Tabs>
            </Modal.Body>
        </Modal>
    )
}

export default AuthModal;
