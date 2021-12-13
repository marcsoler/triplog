import {FC} from 'react';
import {useSelector} from 'react-redux';
import {Route, Redirect, RouteProps} from 'react-router-dom';

import {RootState} from '../../store';
import Loading from '../Loading';

interface Props extends RouteProps {
    component: any;
}

const PrivateRoute: FC<Props> = ({component: Component, ...rest}) => {

    const fallBackUrl = '/login';
    const {authenticated, loading} = useSelector((state: RootState) => state.auth);

    return (
        <Route {...rest} render={props => loading ? (<Loading />) : authenticated ? <Component {...props}/> : <Redirect to={fallBackUrl} /> } />
        //<Route {...rest} render={props => authenticated ? <Component {...props} /> : <Redirect to={fallBackUrl} />}/>
    )

}

export default PrivateRoute;
