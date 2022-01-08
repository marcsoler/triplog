import NavDropdown from 'react-bootstrap/NavDropdown';

import {NavLink} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {signout} from '../../../store/actions/authActions';
import useAuthSelector from '../../../hooks/useAuthSelector';

const SingedInLinks = () => {

    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(signout());
    }

    const {user} = useAuthSelector();

    if(user && user.admin) {
        return (

            <NavDropdown title={user!.firstname}>
                <NavDropdown.Item as={NavLink} to="/dashboard/post/create">New Post</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/dashboard/trip/create">New Trip</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/dashboard">Dashboard</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
            </NavDropdown>
        )
    }

    return (
        <NavDropdown title={user!.firstname}>
            <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
        </NavDropdown>
    )


}

export default SingedInLinks;
