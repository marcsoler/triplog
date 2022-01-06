import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import './App.scss';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

import routes from './routes';
import PrivateRoute from './components/auth/PrivateRoute';
import PublicRoute from './components/auth/PublicRoute';
import PublicOnlyRoute from './components/auth/PublicOnlyRoute';

import firebaseApp from './firebase/firebaseApp';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {getUserById, setLoading, setNeedVerification} from './store/actions/authActions';
import NotFound from './components/misc/NotFound';
import useAuthSelector from './hooks/useAuthSelector';

const auth = getAuth(firebaseApp);

function App() {

    const dispatch = useDispatch();

    const {loading} = useAuthSelector();

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
    }, [dispatch]);

    return (
        <BrowserRouter>
            <div className="App">
                { !loading && <Header /> }
                <main>

                    <Switch>

                        {routes.map((route, key) => {
                            switch (route.routeType) {
                                case 'public':
                                    return <PublicRoute {...route.params} exact key={key} />
                                case 'publicOnly':
                                    return <PublicOnlyRoute {...route.params} exact key={key} />
                                case 'private':
                                    return <PrivateRoute {...route.params} exact key={key} />
                            }
                            return <></>;
                        })}
                        <Route component={NotFound} />
                    </Switch>
                </main>
                <Footer/>
            </div>
        </BrowserRouter>
    );
}

export default App;
