import {FC} from 'react';
import {Redirect, Route, RouteProps} from 'react-router-dom';
import useAuthSelector from '../../hooks/useAuthSelector';


interface Props extends RouteProps {
    component: any;
}

const PublicOnlyRoute: FC<Props> = ({ component: Component, ...rest}) => {

    const fallBackUrl = '/';

    const {authenticated} = useAuthSelector();

    return(
        <Route {...rest} render={props => !authenticated ? <Component {...props} /> : <Redirect to={fallBackUrl}  /> } />
    )

}

export default PublicOnlyRoute;
