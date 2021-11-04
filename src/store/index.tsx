import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import authReducer from './reducers/authReducer';
import postReducer from './reducers/postReducer';
import postsReducer from './reducers/postsReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    post: postReducer,
    posts: postsReducer,
});

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

export type RootState = ReturnType<typeof rootReducer>

export default store;
