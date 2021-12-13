import {FC} from 'react';
import {Redirect, Route, RouteProps} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';


interface Props extends RouteProps {
    component: any;
}

const PublicOnlyRoute: FC<Props> = ({ component: Component, ...rest}) => {

    const fallBackUrl = '/';

    const { authenticated } = useSelector((state: RootState) => state.auth);

    return(
        <Route {...rest} render={props => !authenticated ? <Component {...props} /> : <Redirect to={fallBackUrl}  /> } />
    )

}

export default PublicOnlyRoute;
