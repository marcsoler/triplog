import {FC, FormEvent, useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {signup, setError} from '../../store/actions/authActions';

import {Redirect} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import useAuthSelector from '../../hooks/useAuthSelector';

const SignUp: FC = () => {

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const {authenticated, error} = useAuthSelector();

    useEffect(() => {
        return () => {
            if (error) {
                dispatch(setError(''));
            }
        }
    }, [error, dispatch])


    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        dispatch(signup({firstname, lastname, email, password}, () => setIsLoading(false)));
    }

    if (authenticated) {
        return (<Redirect to={'/'}/>);
    }

    return (
        <Row className="justify-content-center">
            <Col sm={12} md={6} lg={4}>

                {error && <Alert variant="danger">{error}</Alert>}

                <h3>Signup</h3>

                <Form onSubmit={handleSubmit}>

                    <Form.Group className="mb-3">
                        <Form.Label>First name</Form.Label>
                        <Form.Control type="firstname" onChange={(e) => setFirstname(e.currentTarget.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control type="lastname" onChange={(e) => setLastname(e.currentTarget.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control type="email" onChange={(e) => setEmail(e.currentTarget.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" onChange={(e) => setPassword(e.currentTarget.value)}/>
                    </Form.Group>
                    <hr className="my-4"/>
                    <Button type="submit" disabled={isLoading}>{isLoading ? 'Loading...' : 'Sign Up'}</Button>
                </Form>
            </Col>
        </Row>
    );
}

export default SignUp;
