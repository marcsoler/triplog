import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import './App.scss';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

import Blog from './components/Blog';


function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Header/>
                <main>
                    <Switch>
                        <Route exact path='/' component={Blog} />
                    </Switch>
                </main>
                <Footer/>
            </div>
        </BrowserRouter>
    );
}

export default App;
