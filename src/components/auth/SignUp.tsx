import {FC, useState, useEffect, useRef} from 'react';
import {useDispatch} from 'react-redux';

import {Alert, Button, FloatingLabel, Form} from 'react-bootstrap';


import {signup, setError} from '../../store/actions/authActions';


import useAuthSelector from '../../hooks/useAuthSelector';
import {SubmitHandler, useForm} from 'react-hook-form';

interface IRegisterForm {
    registerFirstname: string;
    registerLastname: string;
    registerEmail: string;
    registerPassword: string;
    registerPasswordConfirmation: string;
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
        watch
    } = useForm<IRegisterForm>();

    const pw = useRef({});
    pw.current = watch('registerPassword')

    return (
        <>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            {!success && (
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3">
                        <FloatingLabel label="First name" controlId="registerFirstname">
                            <Form.Control type="registerFirstname" placeholder="First name"
                                          {...register('registerFirstname', {required: "First name is required"})} />
                        </FloatingLabel>
                        {errors.registerFirstname && <p className="form-validation-failed">{errors.registerFirstname.message}</p>}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <FloatingLabel label="Last name" controlId="registerLastname">
                            <Form.Control type="registerLastname" placeholder="Last name"
                                          {...register('registerLastname', {required: "Last name is required"})}/>
                        </FloatingLabel>
                        {errors.registerLastname && <p className="form-validation-failed">{errors.registerLastname.message}</p>}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="registerEmail">
                        <FloatingLabel label="E-mail" controlId="registerEmail">
                            <Form.Control type="registerEmail" placeholder="E-email"
                                          {...register('registerEmail', {required: "E-mail is required"})}/>
                        </FloatingLabel>
                        {errors.registerEmail && <p className="form-validation-failed">{errors.registerEmail.message}</p>}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="registerPassword">
                        <FloatingLabel label="Password" controlId="registerPassword">
                            <Form.Control type="password" placeholder="Password"
                                          {...register('registerPassword', {required: "Password is required"})}/>
                            {errors.registerPassword && <p className="form-validation-failed">{errors.registerPassword.message}</p>}
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="registerPasswordConfirmation">
                        <FloatingLabel label="Password" controlId="registerPasswordConfirmation">
                            <Form.Control type="password" placeholder="Password"
                                          {...register('registerPasswordConfirmation', {
                                              validate: value => value === pw.current || "Those passwords didn’t match. Try again."
                                          })}/>
                            {errors.registerPasswordConfirmation && <p className="form-validation-failed">{errors.registerPasswordConfirmation.message}</p>}
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
