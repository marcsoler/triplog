import {FC} from 'react';
import {Route, RouteProps} from 'react-router-dom';


interface Props extends RouteProps {
    component: any;
}

const PublicRoute: FC<Props> = ({ component: Component, ...rest}) => {

  return(
      <Route {...rest} render={props => <Component {...props} /> } />
  )

}

export default PublicRoute;
