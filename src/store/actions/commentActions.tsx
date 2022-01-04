import firebaseApp from '../../firebase/firebaseApp';

import {
    arrayUnion,
    arrayRemove,
    getFirestore,
    addDoc,
    collection,
    Timestamp,
    query,
    getDocs,
    orderBy,
    where,
    doc,
    updateDoc, getDoc
} from 'firebase/firestore';
import {ThunkAction} from 'redux-thunk';
import {RootState} from '../index';
import {Comment, CommentAction, CommentsAction, Reaction, SET_COMMENTS, User} from '../types';


const db = getFirestore(firebaseApp);

const commentsRef = collection(db, 'comments');


export const storeComment = (comment: Comment): ThunkAction<void, RootState, null, CommentAction> => {
    return async dispatch => {
        await addDoc(commentsRef, {
            comment: comment.comment,
            user: comment.user,
            post_id: comment.post_id,
            reactions: [],
            created_at: Timestamp.now(),
            updated_at: Timestamp.now(),
        } as Comment).catch((error) => {
            console.error('commentsActions:storeComment()', error);
        });
    }
}

export const getCommentsByPostId = (postId: string): ThunkAction<void, RootState, null, CommentsAction> => {
    return async dispatch => {
        const q = query(commentsRef, where('post_id', '==', postId), orderBy('created_at', 'asc'));

        const querySnapshot = await getDocs(q);

        const commentsData: any = querySnapshot.docs.map((c) => {
            return {id: c.id, ...c.data()} as Comment;
        });

        dispatch({
            type: SET_COMMENTS,
            payload: commentsData,
        });

    }
}

export const addReaction = (comment: Comment, user: User, onVote: () => void, onAlreadyVoted: () => void): ThunkAction<void, RootState, null, CommentAction> => {
    return async dispatch => {
        const commentDocRef = doc(db, 'comments', comment.id!);

        const c = await getDoc(commentDocRef).then((c) => {
            return c.data() as Comment;
        });

        if (c.reactions.length) {
            if (c.reactions.find((r) => {
                return r.user_id === user.id
            })) {
                await updateDoc(commentDocRef, {
                    reactions: arrayRemove({
                        user_id: user.id
                    } as Reaction)
                }).then(() => {
                    console.log('invoke onAlreadyVoted()');
                    onAlreadyVoted();
                });
                return;
            }
        }
        await updateDoc(commentDocRef, {
            reactions: arrayUnion({
                user_id: user.id
            } as Reaction)
        }).then(() => {
            console.log('invoke onVote()');
            onVote();
        });

        return;
    }
}
