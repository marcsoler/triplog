import {FC, FormEvent, useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

import Input from '../layout/elements/Input';
import Button from '../layout/elements/Button';

import {signin, setError} from '../../store/actions/authActions';

import {RootState} from '../../store';
import Alert from '../layout/elements/Alert';


const SignIn: FC = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
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
        setLoading(true);
        dispatch(signin({email, password}, () => setLoading(false)));
        console.log('yep...');
    }

    return (
        <div className="row justify-content-center">
            <div className="col-sm-12 col-md-6 col-lg-4">

                <h3>Login</h3>

                <form onSubmit={handleSubmit}>

                    {error && <Alert message={error} type={'danger'}/>}

                    <div className="row row-cols-1">
                        <Input label="E-Mail" name="email" type="email"
                               onChange={(e) => setEmail(e.currentTarget.value)}/>
                    </div>
                    <div className="row row-cols-1">
                        <Input label="Password" name="password" type="password"
                               onChange={(e) => setPassword(e.currentTarget.value)}/>
                    </div>
                    <hr className="my-4"/>
                    <Button text={loading ? 'Loading...' : 'Login'} className="btn-primary w-100" disabled={loading}/>
                    <p><Link to="/recover">Forgot something?</Link></p>
                </form>
            </div>
        </div>
    );
}

export default SignIn;
