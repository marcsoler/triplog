import {Link} from 'react-router-dom';

const Header = () => {

    const signedIn = true;

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <a className="navbar-brand" href="#">Triplog</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="mainNavbar">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link to="/" className="nav-link" aria-current="page">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/" className="nav-link" aria-current="page">Blog</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="offcanvasNavbarDropdown" role="button"
                               data-bs-toggle="dropdown" aria-expanded="false">
                                Marc
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="offcanvasNavbarDropdown">
                                <li><Link to='/' className="dropdown-item" aira-current="page">Logout</Link></li>
                            </ul>

                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;
