import {ThunkAction} from 'redux-thunk';
import {RootState} from '../index';
import firebaseApp from '../../firebase/firebaseApp';
import {Post, PostAction, SET_POST, PostsAction, SET_POSTS} from '../types';
import {getFirestore, collection, doc, getDoc, getDocs, query, orderBy, limit} from 'firebase/firestore';
import {setError} from './authActions';

const db = getFirestore(firebaseApp);



// get latest post:
export const getLatestPost = (): ThunkAction<void, RootState, null, PostAction> => {
    return async dispatch => {

        const postsRef = collection(db, 'posts');

        const post = await getDocs(query(postsRef, orderBy('created_at', 'desc'), limit(1))).then((querySnapshot) => {
            return querySnapshot.docs[0];
        }).catch((error) => {
            dispatch(setError(`${error.code}: ${error.message}`));
        });

        if(post) {
            const postData = { id: post.id, ...post.data() } as Post;
            dispatch({
                type: SET_POST,
                payload: postData,
            })
        }
    }
}

// get post by ID
export const getPostById = (id: string): ThunkAction<void, RootState, null, PostAction> => {
    return async dispatch => {
        try {

            const postRef = doc(db, 'posts', id);
            const docSnap = await getDoc(postRef);

            if (docSnap.exists()) {
                const postData = { id: id, ...docSnap.data() } as Post;
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

        const q = query(collection(db, 'posts'));

        try {
            const querySnapshot = await getDocs(q);
            const postsData: Array<Post> = querySnapshot.docs.map((p) => {
                return { id: p.id, ...p.data() } as Post;
            });

            dispatch({
                type: SET_POSTS,
                payload: postsData,
            });


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
