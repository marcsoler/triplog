import {PostAction, PostState, SET_POST} from '../types';

const initialState: PostState = {
    post: undefined,
}

const postReducer = (state = initialState, action: PostAction) => {
    switch (action.type) {
        case SET_POST:
            return {
                ...state,
                post: action.payload,
            }
        default:
            return state;

    }
}

export default postReducer;
