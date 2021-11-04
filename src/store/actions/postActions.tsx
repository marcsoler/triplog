import {ThunkAction} from 'redux-thunk';
import {RootState} from '../index';
import firebase from '../../firebase/config';
import {Post, PostAction, SET_POST, PostsAction, SET_POSTS} from '../types';


// get latest post:
export const getLatestPost = (): ThunkAction<void, RootState, null, PostAction> => {
    return async dispatch => {
        try {
            const post = await firebase.firestore().collection('posts').orderBy('created_at', 'desc').get().then(querySnapshot => {
                return querySnapshot.docs[0];
            });
            if (post.exists) {
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
export const getPostById = (id: string): ThunkAction<void, RootState, null, PostAction> => {
    return async dispatch => {
        try {
            const post = await firebase.firestore().collection('posts').doc(id).get();
            if (post.exists) {
                const postData = post.data() as Post;
                dispatch({
                    type: SET_POST,
                    payload: postData
                });
            } else {
                console.error('Post #' + id + ' not found... setError?');
            }
        } catch (err) {
            console.error('Error on getPostById', err);
        }
    }
}

// get posts
export const getPosts = (): ThunkAction<void, RootState, null, PostsAction> => {
    return async dispatch => {
        try {
            const posts = await firebase.firestore().collection('posts').orderBy('created_at', 'desc').get().then(querySnapshot => {
                return querySnapshot.docs.map((p) => {
                    return {id: p.id, ...p.data()};
                });
            });
            if (posts.length) {
                const postsData = posts as Array<Post>;
                dispatch({
                    type: SET_POSTS,
                    payload: postsData,
                });
            }
        } catch (err) {
            console.error('Error on getPosts', err);
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
