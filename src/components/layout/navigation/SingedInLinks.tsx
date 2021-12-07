import NavDropdown from 'react-bootstrap/NavDropdown';

import {NavLink} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {signout} from '../../../store/actions/authActions';
import {RootState} from '../../../store';
import {AuthState} from '../../../store/types';

const SingedInLinks = () => {

    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(signout());
    }

    const auth: AuthState = useSelector((state: RootState) => state.auth);

    return (
        <NavDropdown title={auth.user?.firstname}>
            <NavDropdown.Item as={NavLink} to="/dashboard/post/create">New Post</NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to="/dashboard">Dashboard</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
        </NavDropdown>
    )
}

export default SingedInLinks;
