import {FC, useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

import {signin, setError} from '../../store/actions/authActions';

import useAuthSelector from '../../hooks/useAuthSelector';
import {SubmitHandler, useForm} from 'react-hook-form';

interface ILoginForm {
    loginEmail: string;
    loginPassword: string;
}


const SignIn: FC = () => {


    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const {error} = useAuthSelector();

    //Todo: What have I've meant here?
    useEffect(() => {
        return () => {
            if (error) {
                dispatch(setError(''));
            }
        }
    }, [error, dispatch])

    const onSubmit: SubmitHandler<ILoginForm> = data => {
        setIsLoading(true);
        dispatch(signin({
            email: data.loginEmail,
            password: data.loginPassword,
        }, () => {
            setIsLoading(false);
        }));
    };

    const {
        register,
        formState: {errors},
        handleSubmit,
    } = useForm<ILoginForm>();


    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form.Group className="mb-3" controlId="loginEmail">
                <FloatingLabel label="E-mail" controlId="loginEmail">
                    <Form.Control type="loginEmail" placeholder="E-email"
                                  {...register('loginEmail', {required: true})}/>
                </FloatingLabel>
                {errors.loginEmail && <p className="form-validation-failed">E-mail is required</p>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="loginPassword">
                <FloatingLabel label="Password" controlId="loginPassword">
                    <Form.Control type="password" placeholder="Password"
                                  {...register('loginPassword', {required: true})}/>
                    {errors.loginPassword && <p className="form-validation-failed">The password is required</p>}
                </FloatingLabel>
            </Form.Group>

            <div className="d-grid">
                <Button variant="primary" type="submit" size="lg"
                        disabled={isLoading}>{isLoading ? 'Loading...' : 'Login'}</Button>
            </div>

        </Form>

    );
}

export default SignIn;
