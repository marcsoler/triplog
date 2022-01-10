import {FC, useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

import {signup, setError} from '../../store/actions/authActions';


import useAuthSelector from '../../hooks/useAuthSelector';
import {SubmitHandler, useForm} from 'react-hook-form';

interface IRegisterForm {
    registerFirstname: string;
    registerLastname: string;
    registerEmail: string;
    registerPassword: string;
    //registerPasswordConfirmation: string;
}

const SignUp: FC = () => {

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


    const onSubmit: SubmitHandler<IRegisterForm> = data => {
        setIsLoading(true);
        dispatch(signup({
            firstname: data.registerFirstname,
            lastname: data.registerLastname,
            email: data.registerEmail,
            password: data.registerPassword,
        }, 'Your account has been created!'));
    };

    const {
        register,
        formState: {errors},
        handleSubmit,
    } = useForm<IRegisterForm>();

    return (
        <>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            {!success && (
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3">
                        <FloatingLabel label="First name" controlId="registerFirstname">
                            <Form.Control type="registerFirstname" placeholder="First name"
                                          {...register('registerFirstname', {required: true})} />
                        </FloatingLabel>
                        {errors.registerFirstname && <p className="form-validation-failed">First name is required</p>}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <FloatingLabel label="Last name" controlId="registerLastname">
                            <Form.Control type="registerLastname" placeholder="Last name"
                                          {...register('registerLastname', {required: true})}/>
                        </FloatingLabel>
                        {errors.registerLastname && <p className="form-validation-failed">Last name is required</p>}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="registerEmail">
                        <FloatingLabel label="E-mail" controlId="registerEmail">
                            <Form.Control type="registerEmail" placeholder="E-email"
                                          {...register('registerEmail', {required: true})}/>
                        </FloatingLabel>
                        {errors.registerEmail && <p className="form-validation-failed">E-mail is required</p>}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="registerPassword">
                        <FloatingLabel label="Password" controlId="registerPassword">
                            <Form.Control type="password" placeholder="Password"
                                          {...register('registerPassword', {required: true})}/>
                            {errors.registerPassword && <p className="form-validation-failed">Password is required</p>}
                        </FloatingLabel>
                    </Form.Group>

                    <div className="d-grid">
                        <Button variant="primary" type="submit" size="lg"
                                disabled={isLoading}>{isLoading ? 'Loading...' : 'Sign up'}</Button>
                    </div>
                </Form>
            )}
        </>


    );
}

export default SignUp;
