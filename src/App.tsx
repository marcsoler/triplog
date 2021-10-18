import React from 'react';
import {BrowserRouter} from 'react-router-dom';

import './App.scss';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Header/>
                <div className="container">
                    <h1>Triplog</h1>
                </div>
                <Footer/>
            </div>
        </BrowserRouter>
    );
}

export default App;
