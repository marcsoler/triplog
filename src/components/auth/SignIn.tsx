import {FC, FormEvent, useState, useEffect, useRef} from 'react';
import {useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import {signin, setError} from '../../store/actions/authActions';

import useAuthSelector from '../../hooks/useAuthSelector';


const SignIn: FC = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const {error} = useAuthSelector();

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
        dispatch(signin({email, password}, () => setIsLoading(false)));
    }


    return (
        <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3" controlId="email">
                <FloatingLabel label="E-mail" controlId="email">
                    <Form.Control type="email" placeholder="E-email"
                                  onChange={(e) => setEmail(e.currentTarget.value)}/>
                </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
                <FloatingLabel label="Password" controlId="password">
                    <Form.Control type="password" placeholder="Password"
                                  onChange={(e) => setPassword(e.currentTarget.value)}/>
                </FloatingLabel>
            </Form.Group>

            <Row>
                <Col>
                    <p><Link to="/recover">Forgot something?</Link></p>
                </Col>
                <Col>
                    <Button variant="primary" type="submit"
                            disabled={isLoading}>{isLoading ? 'Loading...' : 'Login'}</Button>
                </Col>
            </Row>

            {error && <Alert variant="danger">{error}</Alert>}

        </Form>

    );
}

export default SignIn;
