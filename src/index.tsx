import React from 'react';
import ReactDOM from 'react-dom';
import { Provider  } from 'react-redux';

import '@popperjs/core';
import 'bootstrap/dist/js/bootstrap.bundle';

import App from './App';
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
