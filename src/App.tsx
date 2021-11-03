import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {BrowserRouter, Switch} from 'react-router-dom';

import './App.scss';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

//Public
import Blog from './components/blog/Blog';

//Auth:
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import ForgotPassword from './components/auth/ForgotPassword';
import Dashboard from './components/blog/Dashboard';

import PrivateRoute from './components/auth/PrivateRoute';
import PublicRoute from './components/auth/PublicRoute';

import firebase from './firebase/config';
import {getUserById, setLoading, setNeedVerification} from './store/actions/authActions';
import {RootState} from './store';


function App() {

    const dispatch = useDispatch();
    const { loading } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        dispatch(setLoading(true));
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
    }, [dispatch]);

    return (
        <BrowserRouter>
            <div className="App">
                <Header/>
                <main>
                    <Switch>
                        <PublicRoute path="/" component={Blog} exact />
                        <PublicRoute path="/post/:id" component={Blog} exact />
                        <PublicRoute path="/register" component={SignUp} exact />
                        <PublicRoute path="/login" component={SignIn} exact />
                        <PublicRoute path="/recover" component={ForgotPassword} exact />
                        <PrivateRoute path="/dashboard" component={Dashboard} exact />
                    </Switch>
                </main>
                <Footer/>
            </div>
        </BrowserRouter>
    );
}

export default App;
