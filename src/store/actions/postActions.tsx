import {ThunkAction} from 'redux-thunk';
import {RootState} from '../index';
import firebaseApp from '../../firebase/config';
import {Post, PostAction, SET_POST, PostsAction, SET_POSTS} from '../types';
import {getFirestore, collection, doc, getDoc} from 'firebase/firestore';

const db = getFirestore(firebaseApp);



// get latest post:
export const getLatestPost = (): ThunkAction<void, RootState, null, PostAction> => {
    return async dispatch => {
        try {
            const post = await firebase.firestore().collection('posts').orderBy('created_at', 'desc').get().then(querySnapshot => {
                return querySnapshot.docs[0];
            });
            if (post.exists) {
                const postData = { id: post.id, ...post.data() } as Post;
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

            const docRef = doc(db, 'posts', id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const postData = docSnap.data() as Post;
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
                return querySnapshot.docs.map((post) => {
                    return {id: post.id, ...post.data()};
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
