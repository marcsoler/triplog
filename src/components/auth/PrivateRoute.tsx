import {FC} from 'react';
import {Route, Redirect, RouteProps} from 'react-router-dom';

import Loading from '../misc/Loading';
import useAuthSelector from '../../hooks/useAuthSelector';

interface Props extends RouteProps {
    component: any;
}

const PrivateRoute: FC<Props> = ({component: Component, ...rest}) => {

    const fallBackUrl = '/login';
    const {authenticated, loading} = useAuthSelector();

    return (
        <Route {...rest} render={props => loading ? (<Loading />) : authenticated ? <Component {...props}/> : <Redirect to={fallBackUrl} /> } />
    )

}

export default PrivateRoute;
