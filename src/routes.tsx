import Blog from './components/blog/Blog';
import SignUp from './components/auth/SignUp';
import SignIn from './components/auth/SignIn';
import ForgotPassword from './components/auth/ForgotPassword';
import Dashboard from './components/blog/Dashboard';
import CreatePost from './components/blog/CreatePost';

interface Route {
    routeType: 'public' | 'private' | 'publicOnly';
    params: {
        path: string;
        component: any;
    }
}


const routes: Route[] = [
    {
        routeType: 'public',
        params: {
            path: '/',
            component: Blog,
        }
    },
    {
        routeType: 'public',
        params: {
            path: '/post/:id',
            component: Blog,
        }
    },
    {
        routeType: 'publicOnly',
        params: {
            path: '/register',
            component: SignUp,
        }
    },
    {
        routeType: 'publicOnly',
        params: {
            path: '/login',
            component: SignIn,
        }
    },
    {
        routeType: 'publicOnly',
        params: {
            path: '/recover',
            component: ForgotPassword,
        }
    },
    {
        routeType: 'private',
        params: {
            path: '/dashboard',
            component: Dashboard,
        }
    },
    {
        routeType: 'private',
        params: {
            path: '/dashboard/post/create',
            component: CreatePost,
        }
    }
]
export default routes;
