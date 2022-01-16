import Blog from './components/blog/Blog';
import Home from './components/Home';
import Dashboard from './components/admin/Dashboard';
import CreatePost from './components/admin/CreatePost';
import EditPost from './components/admin/EditPost';
import TripPlanner from './components/trip/TripPlanner';

interface Route {
    routeType: 'public' | 'private' | 'publicOnly';
    params: {
        path: string;
        component: any;
    }
    adminOnly?: boolean;
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
            path: '/trip/:id',
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
        routeType: 'private',
        params: {
            path: '/dashboard',
            component: Dashboard,
        },
        adminOnly: true,
    },
    {
        routeType: 'private',
        params: {
            path: '/dashboard/post/edit/:slug',
            component: EditPost,
        },
        adminOnly: true,
    },
    {
        routeType: 'private',
        params: {
            path: '/dashboard/post/create',
            component: CreatePost,
        },
        adminOnly: true,
    },
    {
        routeType: 'private',
        params: {
            path: '/dashboard/trip/create',
            component: TripPlanner
        },
        adminOnly: true,
    }
]
export default routes;
