import {Link} from 'react-router-dom';
import SingedInLinks from './navigation/SingedInLinks';
import SignedOutLinks from './navigation/SignedOutLinks';

const Header = () => {

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <a className="navbar-brand">Triplog</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="mainNavbar">
                    <ul className="navbar-nav me-auto">
                    </ul>
                    <ul className="navbar-nav">
                        <SingedInLinks />
                        <SignedOutLinks />
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;
