import {FC, FormEvent, useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Input from '../layout/elements/Input';
import Button from '../layout/elements/Button';

import {sendPasswordResetEmail, setError, setSuccess} from '../../store/actions/authActions';

import {RootState} from '../../store';
import Alert from '../layout/elements/Alert';


const ForgotPassword: FC = () => {

    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { error, success } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        return () => {
            if(error) {
                dispatch(setError(''));
            }
            if(success) {
                dispatch(setSuccess(''));
            }
        }
    }, [error, success, dispatch])


    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        dispatch(sendPasswordResetEmail( email , 'E-mail sent!'));
    }

    return (
        <div className="row justify-content-center">
            <div className="col-sm-12 col-md-6 col-lg-4">

                <h3>Password recovery</h3>

                <form onSubmit={handleSubmit}>

                    {error && <Alert message={error} type={'danger'} />}
                    {success && <Alert message={success} type={'success'} />}

                    <div className="row row-cols-1">
                        <Input label="E-Mail" name="email" type="email" onChange={(e) => setEmail(e.currentTarget.value)} />
                    </div>
                    <hr className="my-4"/>
                    <Button text={loading ? "Loading..." : "Reset password"} className="btn-primary w-100" disabled={loading} />
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;
