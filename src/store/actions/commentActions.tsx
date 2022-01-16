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
    updateDoc, getDoc, setDoc, deleteDoc
} from 'firebase/firestore';
import {ThunkAction} from 'redux-thunk';
import {RootState} from '../index';
import {
    Comment,
    CommentAction,
    CommentsAction,
    ICommentFormData,
    Reaction,
    SET_COMMENTS,
    User
} from '../types';


const db = getFirestore(firebaseApp);

const commentsRef = collection(db, 'comments');

const getAllComments = async (): Promise<Comment[]> => {
    const q = query(commentsRef, orderBy('created_at', 'asc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((c) => {
        return {id: c.id, ...c.data()} as Comment;
    });
}


export const storeComment = (data: ICommentFormData): ThunkAction<void, RootState, null, CommentsAction> => {
    return async dispatch => {

        await addDoc(commentsRef, {
            ...data,
            text: data.text,
            post_id: data.post_id,
            user: data.user ? data.user : null,
            reactions: [],
            approved_at: data.user ? Timestamp.now() : null,
            created_at: Timestamp.now(),
            updated_at: Timestamp.now(),
        }).catch((error) => {
            console.error('commentsActions:storeComment()', error); //todo
        });

        const commentsData = await getAllComments();

        dispatch({
            type: SET_COMMENTS,
            payload: commentsData,
        });


    }
}

// get trips
export const getComments = (): ThunkAction<void, RootState, null, CommentsAction> => {
    return async dispatch => {
        try {
            const commentsData = await getAllComments();
            dispatch({
                type: SET_COMMENTS,
                payload: commentsData,
            });
        } catch (e) {
            console.error('Some error happened here', 'commentAction:getComments()', e);
        }
    }
}

export const addReaction = (comment: Comment, user: User, onVote: () => void, onAlreadyVoted: () => void): ThunkAction<void, RootState, null, CommentAction> => {
    return async dispatch => {
        const commentDocRef = doc(db, 'comments', comment.id!);

        const c = await getDoc(commentDocRef).then((c) => {
            return c.data() as Comment;
        });

        if (c.reactions) {
            if (c.reactions.find((r) => {
                return r.user_id === user.id
            })) {
                await updateDoc(commentDocRef, {
                    reactions: arrayRemove({
                        user_id: user.id
                    } as Reaction)
                }).then(() => {
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
            onVote();
        });

        return;
    }
}


export const approveComment = (comment: Comment): ThunkAction<void, RootState, null, CommentsAction> => {
    return async dispatch => {
        const commentDocRef = doc(db, 'comments', comment.id!);
        await setDoc(commentDocRef, {
            approved_at: Timestamp.now()
        }, {merge: true}).then(async () => {

            const commentsData = await getAllComments();
            dispatch({
                type: SET_COMMENTS,
                payload: commentsData,
            });

        }).catch((error) => console.error('An error happened!'));
    }
}

export const deleteComment = (comment: Comment): ThunkAction<void, RootState, null, CommentsAction> => {
    return async dispatch => {
        const commentDocRef = doc(db, 'comments', comment.id!);

        await deleteDoc(commentDocRef).then(async () => {

            const commentsData = await getAllComments();

            dispatch({
                type: SET_COMMENTS,
                payload: commentsData,
            });
        })
    }
}
