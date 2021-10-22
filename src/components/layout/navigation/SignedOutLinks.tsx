import {NavLink} from 'react-router-dom';

const SignedOutLinks = () => {
    return (
        <>
            <li className="nav-item"><NavLink className="nav-link" to='/'>Signup</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to='/'>Login</NavLink></li>
        </>
    )
}

export default SignedOutLinks;
