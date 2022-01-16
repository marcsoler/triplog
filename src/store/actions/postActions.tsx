import {ThunkAction} from 'redux-thunk';
import {RootState} from '../index';
import firebaseApp from '../../firebase/firebaseApp';
import {Post, PostAction, SET_POST, PostsAction, SET_POSTS, TripAction, SET_TRIP_MODAL, IPostFormData} from '../types';
import {
    getFirestore,
    collection,
    doc,
    getDoc,
    setDoc,
    getDocs,
    query,
    orderBy,
    Timestamp,
    GeoPoint,
    deleteDoc,
    updateDoc
} from 'firebase/firestore';

const db = getFirestore(firebaseApp);


const getAllPosts = async (): Promise<Post[]> => {

    const q = query(collection(db, 'posts'), orderBy('created_at', 'asc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((p) => {
        return {slug: p.id, ...p.data()} as Post;
    });

}


// get latest post:
export const getLatestPost = (): ThunkAction<void, RootState, null, PostAction> => {
    return async dispatch => {
        const postsData = await getAllPosts();
        const latestPost = postsData[postsData.length - 1];
        if (latestPost) {
            dispatch({
                type: SET_POST,
                payload: latestPost,
            })
        }
    }
}

// get post by ID
export const getPostBySlug = (slug: string): ThunkAction<void, RootState, null, PostAction> => {
    return async dispatch => {
        try {

            const postRef = doc(db, 'posts', slug);
            const docSnap = await getDoc(postRef);

            if (docSnap.exists()) {
                const postData = {slug: slug, ...docSnap.data()} as Post;
                console.log('SET_POST');
                dispatch({
                    type: SET_POST,
                    payload: postData
                });
            } else {
                console.error('Post #' + slug + ' not found... setError?');
            }
        } catch (err) {
            console.error('Error on getPostById', err);
        }
    }
}

// get posts
export const getPosts = (): ThunkAction<void, RootState, null, PostsAction> => {
    return async dispatch => {

        const postsData = await getAllPosts();

        dispatch({
            type: SET_POSTS,
            payload: postsData,
        });
    }
}


export const createPost = (postData: IPostFormData): ThunkAction<void, RootState, null, TripAction> => {
    return async dispatch => {
        await setDoc(doc(db, 'posts', postData.slug), {
            title: postData.title,
            subtitle: postData.subtitle,
            content: postData.content,
            trip: postData.trip,
            position: new GeoPoint(postData.position.lat(), postData.position.lng()),
            draft: postData.draft,
            created_at: Timestamp.now(),
            updated_at: Timestamp.now(),
        }).catch((error) => {
            dispatch({
                type: SET_TRIP_MODAL,
                payload: {
                    show: true,
                    variant: 'danger',
                    message: `An error happened: ${error.constructor} ${error.message}`
                }
            })
        });
        dispatch({
            type: SET_TRIP_MODAL,
            payload: {
                show: true,
                variant: 'success',
                message: `Post successfully ${postData.draft ? 'saved as draft' : ' published'}.`,
                redirect: '/dashboard',
            },
        });
    }
}

export const updatePost = (postData: IPostFormData): ThunkAction<void, RootState, null, PostAction> => {
    return async dispatch => {
        const docRef = doc(db, 'posts', postData.slug);
        await updateDoc(docRef, {
            title: postData.title,
            subtitle: postData.subtitle,
            content: postData.content,
            trip: postData.trip,
            position: new GeoPoint(postData.position.lat(), postData.position.lng()),
            draft: postData.draft,
            updated_at: Timestamp.now(),
        }).catch((error) => {
            console.error('Some error happened here', 'postActions:updatePost()');
        });

    }
}

export const deletePost = (post: Post): ThunkAction<void, RootState, null, PostsAction> => {
    return async dispatch => {
        const docRef = doc(db, 'posts', post.slug);
        await deleteDoc(docRef).catch((error) => {
            console.error('Some error happened here', 'postActions:deletePostById()');
        });
        const postsData = await getAllPosts();
        dispatch({
            type: SET_POSTS,
            payload: postsData,
        });
    }
}
