import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {BrowserRouter, Switch} from 'react-router-dom';

import './App.scss';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';


import Blog from './components/blog/Blog';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import ForgotPassword from './components/auth/ForgotPassword';
import Dashboard from './components/blog/Dashboard';
import CreatePost from './components/blog/CreatePost';
import PrivateRoute from './components/auth/PrivateRoute';
import PublicRoute from './components/auth/PublicRoute';
import PublicOnlyRoute from './components/auth/PublicOnlyRoute';

import firebaseApp from './firebase/firebaseApp';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {getUserById, setLoading, setNeedVerification} from './store/actions/authActions';

const auth = getAuth(firebaseApp);


function App() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setLoading(true));

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if(user) {
                dispatch(setLoading(true));
                await dispatch(getUserById(user.uid));
                if(!user.emailVerified) {
                    dispatch(setNeedVerification());
                }
            }
            dispatch(setLoading(false));
        })
        return () => {
            unsubscribe();
        }
        /*
        const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
            if(user) {
                dispatch(setLoading(true));
                await dispatch(getUserById(user.uid));
                if(!user.emailVerified) {
                    dispatch(setNeedVerification());
                }
            }
            dispatch(setLoading(false));
        });
        return () => {
            unsubscribe();
        }

         */
    }, [dispatch]);

    return (
        <BrowserRouter>
            <div className="App">
                <Header/>
                <main>

                    <Switch>
                        <PublicRoute path="/" component={Blog} exact />
                        <PublicRoute path="/post/:id" component={Blog} exact />
                        <PublicOnlyRoute path="/register" component={SignUp} exact />
                        <PublicOnlyRoute path="/login" component={SignIn} exact />
                        <PublicOnlyRoute path="/recover" component={ForgotPassword} exact />
                        <PrivateRoute path="/dashboard" component={Dashboard} exact />
                        <PrivateRoute path="/dashboard/post/create" component={CreatePost} exact />
                    </Switch>
                </main>
                <Footer/>
            </div>
        </BrowserRouter>
    );
}

export default App;
