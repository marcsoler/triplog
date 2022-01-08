import {FC, FormEvent, useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import {signin, setError} from '../../store/actions/authActions';

import useAuthSelector from '../../hooks/useAuthSelector';


const SignIn: FC = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const {error, success} = useAuthSelector();

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
        <>



            <Form onSubmit={handleSubmit}>

                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>E-mail</Form.Label>
                    <Form.Control type="email" onChange={(e) => setEmail(e.currentTarget.value)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" onChange={(e) => setPassword(e.currentTarget.value)}/>
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
                {success && <Alert variant="success">Success!</Alert>}



            </Form>
        </>

    );
}

export default SignIn;
