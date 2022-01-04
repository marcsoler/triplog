import {CommentsAction, CommentsState, SET_COMMENTS} from '../types';

const initialState: CommentsState = {
    comments: [],
}

const postsReducer = (state = initialState, action: CommentsAction) => {
    switch (action.type) {
        case SET_COMMENTS:
            return {
                ...state,
                comments: action.payload,
            }
        default:
            return state;

    }
}

export default postsReducer;
