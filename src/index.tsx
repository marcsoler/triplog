import React from 'react';
import ReactDOM from 'react-dom';
import { Provider  } from 'react-redux';

import '@popperjs/core';
import 'bootstrap/dist/js/bootstrap.bundle';

import App from './App';
//import reportWebVitals from './reportWebVitals';
//import {createStore, applyMiddleware} from 'redux';
//import rootReducer from './store/reducers/rootReducer';


//const store = createStore(rootReducer, applyMiddleware(thunk));
import {store, persistor} from './store';
import {PersistGate} from 'redux-persist/integration/react';
import Loading from './components/misc/Loading';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={<Loading />} persistor={persistor}>
                <App/>
            </PersistGate>
        </Provider>
    </React.StrictMode>,
    document.querySelector('#root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
