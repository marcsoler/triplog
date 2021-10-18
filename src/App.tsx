import React from 'react';
import {BrowserRouter} from 'react-router-dom';

import './App.scss';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Container from 'react-bootstrap/Container';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Header />
                <Container>
                    <h1>Triplog</h1>
                </Container>
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
