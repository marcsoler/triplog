import {createStore, applyMiddleware, combineReducers} from 'redux';
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import authReducer from './reducers/authReducer';
import postReducer from './reducers/postReducer';
import postsReducer from './reducers/postsReducer';
import tripReducer from './reducers/tripReducer';
import tripsReducer from './reducers/tripsReducer';
import commentsReducer from './reducers/commentsReducer';

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    auth: authReducer,
    post: postReducer,
    posts: postsReducer,
    trip: tripReducer,
    trips: tripsReducer,
    comments: commentsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

//const store = createStore(
//    rootReducer,
//    composeWithDevTools(applyMiddleware(thunk)),
//);

export type RootState = ReturnType<typeof rootReducer>

//export default store;

// export default store = {
//     let store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)))
//     let persistor = persistStore(store)
//     return { store, persistor }
// }

export const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));

export const persistor = persistStore(store);

