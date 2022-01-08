import {FC, FormEvent, useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import {sendResetEmail, setError, setSuccess} from '../../store/actions/authActions';

import useAuthSelector from '../../hooks/useAuthSelector';


const ForgotPassword: FC = () => {

    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const {error, success} = useAuthSelector();

    useEffect(() => {
        return () => {
            if (error) {
                dispatch(setError(''));
            }
            if (success) {
                dispatch(setSuccess(''));
            }
        }
    }, [error, success, dispatch])


    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        dispatch(sendResetEmail(email, 'E-mail sent!'));
    }

    return (
        <Row className="justify-content-center">
            <Col sm={12} md={6} lg={4}>

                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}

                <h3>Password recovery</h3>
                <Form onSubmit={handleSubmit}>

                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control type="email" onChange={(e) => setEmail(e.currentTarget.value)}/>
                    </Form.Group>

                    <hr className="my-4"/>
                    <Button variant="primary" type="submit">{isLoading ? 'Loading...' : 'Reset password'}</Button>
                </Form>
            </Col>
        </Row>
    );
}

export default ForgotPassword;
