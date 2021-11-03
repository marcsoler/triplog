import {ThunkAction} from 'redux-thunk';
import { RootState } from '../index';
import firebase from '../../firebase/config';
import {PostAction, SET_POST, Post, SET_USER} from '../types';


// get latest post:
export const getLatestPost = (): ThunkAction<void, RootState, null, PostAction> => {
    return async dispatch => {
        try {
            const post = await firebase.firestore().collection('posts').orderBy('created_at').limit(1).get();
            if(post) {
                console.log('getLatestPost success', post);
                //dispatch({
                //    type: SET_POST,
                //    payload: post.data;
                //});

            }
        } catch (err) {
            console.error('Error on getLatestPost', err);
        }
    }
}

// get post by ID
export const getPostById = (id: string): ThunkAction<void, any, null, PostAction> => {
    console.log('postAction:getPostById')
    return async dispatch => {
        try {
            const post = await firebase.firestore().collection('posts').doc(id).get().then((snapshot) => {
                return snapshot;
            });
            if(post.exists) {
                const postData = post.data() as Post;
                dispatch({
                    type: SET_POST,
                    payload: postData
                });
            }
        } catch (err) {
            console.error('Error on getPostById', err);
        }
    }
}



//export const createPost = (post: any) => {
//    return (dispatch: any, getState: any) => {
//        //make async call to db
//        dispatch({type: 'CREATE_POST', post});
//    }
//}
//
