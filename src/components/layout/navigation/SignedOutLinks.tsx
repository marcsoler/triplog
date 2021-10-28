import {NavLink} from 'react-router-dom';

const SignedOutLinks = () => {
    return (
        <>
            <li className="nav-item"><NavLink className="nav-link" to='/register'>Signup</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to='/login'>Login</NavLink></li>
        </>
    )
}

export default SignedOutLinks;
