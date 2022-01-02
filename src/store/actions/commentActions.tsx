import firebaseApp from '../../firebase/firebaseApp';

import {
    arrayUnion,
    getFirestore,
    addDoc,
    collection,
    Timestamp,
    query,
    getDocs,
    orderBy,
    where,
    doc,
    setDoc, updateDoc
} from 'firebase/firestore';
import {ThunkAction} from 'redux-thunk';
import {RootState} from '../index';
import {Comment, CommentAction, Comments, CommentsAction, SET_COMMENTS, User} from '../types';


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

export const addReaction = (comment: Comment, user: User): ThunkAction<void, RootState, null, CommentAction> => {
    return async dispatch => {


        // @ts-ignore
        const commentDocRef = doc(db, 'comments', comment.id);

        await updateDoc(commentDocRef, {
            reactions: arrayUnion({
                user_id: user.id,
                created_at: Timestamp.now(),
            })
        });

    }
}


/*
export const updatePost = (post: any): ThunkAction<void, RootState, null, PostAction> => {
    return async dispatch => {

        const docRef = doc(db, 'posts', post.slug);
        await updateDoc(docRef, post).catch((error) => {
            console.error('Some error happened here', 'postActions:updatePost()');
        });

    }
}
 */
