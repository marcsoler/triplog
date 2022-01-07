import Blog from './components/blog/Blog';
import Home from './components/Home';
import SignUp from './components/auth/SignUp';
import SignIn from './components/auth/SignIn';
import ForgotPassword from './components/auth/ForgotPassword';
import Dashboard from './components/blog/Dashboard';
import CreatePost from './components/blog/CreatePost';
import EditPost from './components/blog/EditPost';
import CreateTrip from './components/trip/CreateTrip';

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
            component: Home,
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
            path: '/dashboard/post/edit/:id',
            component: EditPost,
        }
    },
    {
        routeType: 'private',
        params: {
            path: '/dashboard/post/create',
            component: CreatePost,
        }
    },
    {
        routeType: 'private',
        params: {
            path: '/dashboard/trip/create',
            component: CreateTrip
        }
    }
]
export default routes;
