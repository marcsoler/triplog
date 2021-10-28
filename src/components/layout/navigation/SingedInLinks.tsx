import {NavLink} from 'react-router-dom';

const SingedInLinks = () => {
    return (
        <li className="nav-item dropdown">
            <NavLink to="/" className="nav-link dropdown-toggle" id="offCanvasNavbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Marc
            </NavLink>
            <ul className="dropdown-menu" aria-labelledby="offcanvasNavbarDropdown">
                <li><NavLink className="dropdown-item" to='/dashboard/create'>New Post</NavLink></li>
                <hr className="dropdown-divider" />
                <li><NavLink className="dropdown-item" to='/logout' aira-current="page">Logout</NavLink></li>
            </ul>

        </li>
    )
}

export default SingedInLinks;
