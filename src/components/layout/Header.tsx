import {FC} from 'react';
import {useHistory, Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../store';
import {signout} from '../../store/actions/authActions';

import SingedInLinks from './navigation/SingedInLinks';
import SignedOutLinks from './navigation/SignedOutLinks';

const Header: FC = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const { authenticated } = useSelector((state: RootState) => state.auth);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand" to="/">Triplog</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className="collapse navbar-collapse" id="mainNavbar">
                    <ul className="navbar-nav me-auto">
                    </ul>
                    <ul className="navbar-nav">
                        {!authenticated ? <SignedOutLinks /> : <SingedInLinks /> }
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;
