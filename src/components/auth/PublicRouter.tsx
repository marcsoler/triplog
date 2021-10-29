import {FC} from 'react';
import {useSelector} from 'react-redux';
import {Route, Redirect, RouteProps} from 'react-router-dom';

import {RootState} from '../../store';

interface Props extends RouteProps {
    component: any;
}

const PublicRouter: FC<any> = ({ component: Component, ...rest}) => {
  const { authenticated } = useSelector((state: RootState) => state.auth);

  return(
      <Route {...rest} render={props => !authenticated ? <Component {...props} /> : <Redirect to='/'  /> } />
  )

}

export default PublicRouter;
