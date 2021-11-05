import {FC, FormEvent, useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

//import Input from '../layout/elements/Input';


import {sendPasswordResetEmail, setError, setSuccess} from '../../store/actions/authActions';

import {RootState} from '../../store';
import Form from 'react-bootstrap/Form';


const ForgotPassword: FC = () => {

    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const {error, success} = useSelector((state: RootState) => state.auth);

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
        dispatch(sendPasswordResetEmail(email, 'E-mail sent!'));
    }

    return (
        <div className="row justify-content-center">
            <div className="col-sm-12 col-md-6 col-lg-4">

                <h3>Password recovery</h3>

                <form onSubmit={handleSubmit}>

                    {error && <Alert variant="danger">{error}</Alert>}
                    {success && <Alert variant="success">{success}</Alert>}


                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>E-Mail</Form.Label>
                        <Form.Control type="email" onChange={(e) => setEmail(e.currentTarget.value)}/>
                    </Form.Group>

                    <hr className="my-4"/>
                    <Button variant="primary" type="submit">{isLoading ? 'Loading...' : 'Reset password'}</Button>
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;
