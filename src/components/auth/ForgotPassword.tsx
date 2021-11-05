import {FC, FormEvent, useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Alert from 'react-bootstrap/Alert';

import Input from '../layout/elements/Input';
import Button from '../layout/elements/Button';

import {sendPasswordResetEmail, setError, setSuccess} from '../../store/actions/authActions';

import {RootState} from '../../store';


const ForgotPassword: FC = () => {

    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
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
        setLoading(true);
        dispatch(sendPasswordResetEmail(email, 'E-mail sent!'));
    }

    return (
        <div className="row justify-content-center">
            <div className="col-sm-12 col-md-6 col-lg-4">

                <h3>Password recovery</h3>

                <form onSubmit={handleSubmit}>

                    {error && <Alert variant="danger">{error}</Alert>}
                    {success && <Alert variant="success">{success}</Alert>}

                    <div className="row row-cols-1">
                        <Input label="E-Mail" name="email" type="email"
                               onChange={(e) => setEmail(e.currentTarget.value)}/>
                    </div>
                    <hr className="my-4"/>
                    <Button text={loading ? 'Loading...' : 'Reset password'} className="btn-primary w-100"
                            disabled={loading}/>
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;
