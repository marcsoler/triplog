import {NavLink} from 'react-router-dom';

const SingedInLinks = () => {
    return (
        <li className="nav-item dropdown">
            <NavLink to="/" className="nav-link dropdown-toggle" id="offCanvasNavbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Marc
            </NavLink>
            <ul className="dropdown-menu" aria-labelledby="offcanvasNavbarDropdown">
                <li><NavLink className="dropdown-item" to='/create'>New Article</NavLink></li>
                <hr className="dropdown-divider" />
                <li><NavLink className="dropdown-item" to='/' aira-current="page">Logout</NavLink></li>
            </ul>

        </li>
    )
}

export default SingedInLinks;
