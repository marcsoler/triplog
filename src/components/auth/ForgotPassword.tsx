import {FC, useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

import {sendResetEmail, setError, setSuccess, signin} from '../../store/actions/authActions';

import useAuthSelector from '../../hooks/useAuthSelector';
import {SubmitHandler, useForm} from 'react-hook-form';

interface IRecoveryForm {
    recoveryEmail: string;
}

const ForgotPassword: FC = () => {

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


    const onSubmit: SubmitHandler<IRecoveryForm> = data => {
        setIsLoading(true);
        dispatch(sendResetEmail(data.recoveryEmail,'Success! Follow the instruction on your E-mail'));
        setIsLoading(false);
    };

    const {
        register,
        formState: {errors},
        handleSubmit,
    } = useForm<IRecoveryForm>();

    if(success) {
        return <Alert variant="success">{success}</Alert>
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form.Group className="mb-3" controlId="email">
                <FloatingLabel label="E-mail" controlId="recoveryEmail">
                    <Form.Control type="recoveryEmail" placeholder="E-email"
                                  {...register('recoveryEmail', {required: true})}/>
                </FloatingLabel>
                {errors.recoveryEmail && <p className="form-validation-failed">E-mail is required</p>}
            </Form.Group>

            <div className="d-grid">
                <Button variant="primary" type="submit" size="lg"
                        disabled={isLoading}>{isLoading ? 'Loading...' : 'Reset Password'}</Button>
            </div>
        </Form>
    );
}

export default ForgotPassword;
