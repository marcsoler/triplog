import NavDropdown from 'react-bootstrap/NavDropdown';

import {NavLink} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {signout} from '../../../store/actions/authActions';

const SingedInLinks = () => {

    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(signout());
    }


    return (
        <NavDropdown title="Yolo" id="yolo">
            <NavDropdown.Item as={NavLink} to="/dashboard/post/create">New Post</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
        </NavDropdown>
    )
}

export default SingedInLinks;
