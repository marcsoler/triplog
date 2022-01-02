import firebaseApp from '../../firebase/firebaseApp';

import {getFirestore, addDoc, collection, Timestamp, query, getDocs, orderBy, where} from 'firebase/firestore';
import {ThunkAction} from 'redux-thunk';
import {RootState} from '../index';
import {Comment, CommentAction, Comments, CommentsAction, SET_COMMENTS} from '../types';


const db = getFirestore(firebaseApp);

const commentsRef = collection(db, 'comments');


export const storeComment = (comment: Comment): ThunkAction<void, RootState, null, CommentAction> => {
    return async dispatch => {
        await addDoc(commentsRef, {
            comment: comment.comment,
            user_id: comment.user_id,
            post_id: comment.post_id,
            created_at: Timestamp.now(),
            updated_at: Timestamp.now(),
        }).catch((error) => {
            console.error('commentsActions:storeComment()', error);
        });
    }
}

export const getCommentsByPostId = (postId: string): ThunkAction<void, RootState, null, CommentsAction> => {
    return async dispatch => {
        const q = query(commentsRef, where('post_id', '==', postId), orderBy('created_at', 'desc'));

        const querySnapshot = await getDocs(q);

        const commentsData: any = querySnapshot.docs.map((c) => {
            return { id: c.id, ...c.data() } as Comment;
        });

        dispatch({
            type: SET_COMMENTS,
            payload: commentsData,
        });

    }
}

/*
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
 */
