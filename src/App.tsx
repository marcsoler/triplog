import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import './App.scss';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

//Public
import Blog from './components/blog/Blog';

//Auth:
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';

//Secured:
import CreatePost from './components/blog/CreatePost';


function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Header/>
                <main>
                    <Switch>
                        <Route exact path='/' component={Blog} />
                        <Route path='/post/:id' component={Blog} />
                        <Route path='/login' component={SignIn} />
                        <Route path='/register' component={SignUp} />

                        <Route path='/dashboard/create' component={CreatePost} />
                    </Switch>
                </main>
                <Footer/>
            </div>
        </BrowserRouter>
    );
}

export default App;
