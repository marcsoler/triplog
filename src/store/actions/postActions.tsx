import {ThunkAction} from 'redux-thunk';
import {RootState} from '../index';
import firebaseApp from '../../firebase/firebaseApp';
import {Post, PostAction, SET_POST, PostsAction, SET_POSTS} from '../types';
import {getFirestore, collection, doc, getDoc, setDoc, getDocs, query, orderBy, limit, Timestamp, deleteDoc} from 'firebase/firestore';
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

        if (post) {
            const postData = {id: post.id, ...post.data()} as Post;
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
                const postData = {id: id, ...docSnap.data()} as Post;
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

        const q = query(collection(db, 'posts'), orderBy('created_at', 'desc'));

        try {
            const querySnapshot = await getDocs(q);
            const postsData: Array<Post> = querySnapshot.docs.map((p) => {
                return {id: p.id, ...p.data()} as Post;
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


export const createPost = (post: any, onError: () => void): ThunkAction<void, RootState, null, PostAction> => {

    return async dispatch => {
        // Add a new document in collection "cities"
        await setDoc(doc(db, 'posts', post.slug), {
            title: post.title,
            subtitle: post.subtitle,
            content: post.content,
            status: post.status,
            created_at: Timestamp.now()
        }).catch((error) => {
            console.error('Some error happened here', 'postActions:createPost()');
        });
    }


    /*
    return (dispatch: any, getState: any) => {
        //make async call to db
        dispatch({type: 'CREATE_POST', post});
    }
     */
}

export const deletePost = (postId: string): ThunkAction<void, RootState, null, PostAction> => {
    return async dispatch => {
        const docRef = doc(db, 'posts', postId);
        deleteDoc(docRef).catch((error) => {
            console.error('Some error happened here', 'postActions:deletePost()');
        });
    }
}

// Create user
/*
export const signup = (data: SignUpData, onError: () => void): ThunkAction<void, RootState, null, AuthAction> => {
    return async dispatch => {
        await createUserWithEmailAndPassword(auth, data.email, data.password).catch((error) => {
            dispatch(setError(`${error.code}: ${error.message}`));
        });
    }
}
*/
