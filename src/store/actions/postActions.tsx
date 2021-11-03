import {ThunkAction} from 'redux-thunk';
import { RootState } from '../index';
import firebase from '../../firebase/config';
import {PostAction, SET_POST, Post} from '../types';


// get latest post:
export const getLatestPost = (): ThunkAction<void, RootState, null, PostAction> => {
    return async dispatch => {
        try {
            const post = await firebase.firestore().collection('posts').get().then(querySnapshot => {
               return querySnapshot.docs[0];
            });
            if(post.exists) {
                const postData = post.data() as Post;
                dispatch({
                    type: SET_POST,
                    payload: postData,
                });

            }
        } catch (err) {
            console.error('Error on getLatestPost', err);
        }
    }
}

// get post by ID
export const getPostById = (id: string): ThunkAction<void, any, null, PostAction> => {
    return async dispatch => {
        try {
            const post = await firebase.firestore().collection('posts').doc(id).get();
            if(post.exists) {
                const postData = post.data() as Post;
                dispatch({
                    type: SET_POST,
                    payload: postData
                });
            } else {
                console.log('Post #' + id + ' not found... setError?');
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
