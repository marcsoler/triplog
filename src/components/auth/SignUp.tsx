import {FC, FormEvent, useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

//import Input from '../layout/elements/Input';


import {signup, setError} from '../../store/actions/authActions';

import {RootState} from '../../store';
import {Redirect} from 'react-router-dom';
import Form from 'react-bootstrap/Form';


const SignUp: FC = () => {

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const {error} = useSelector((state: RootState) => state.auth);

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

    const {authenticated} = useSelector((state: RootState) => state.auth);

    if (authenticated) {
        return (<Redirect to={'/'}/>);
    }

    return (
        <div className="row justify-content-center">
            <div className="col-sm-12 col-md-6 col-lg-4">

                <h3>Signup</h3>

                <Form onSubmit={handleSubmit}>

                    {error && <Alert variant="danger">{error}</Alert>}

                    <Form.Group className="mb-3">
                        <Form.Label>First name</Form.Label>
                        <Form.Control type="firstname" onChange={(e) => setFirstname(e.currentTarget.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control type="lastname" onChange={(e) => setLastname(e.currentTarget.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>E-Mail</Form.Label>
                        <Form.Control type="email" onChange={(e) => setEmail(e.currentTarget.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" onChange={(e) => setPassword(e.currentTarget.value)}/>
                    </Form.Group>
                    <hr className="my-4"/>
                    <Button type="submit" disabled={isLoading}>{isLoading ? 'Loading...' : 'Sign Up'}</Button>
                </Form>
            </div>
        </div>
    );
}

export default SignUp;
