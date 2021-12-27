import {PostsAction, PostsState, SET_POSTS} from '../types';

const initialState: PostsState = {
    posts: [],
}

const postsReducer = (state = initialState, action: PostsAction) => {
    switch (action.type) {
        case SET_POSTS:
            return {
                ...state,
                posts: action.payload,
            }
        default:
            return state;

    }
}

export default postsReducer;
