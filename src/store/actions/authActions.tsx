import {ThunkAction} from 'redux-thunk';

import {
    SignUpData,
    AuthAction,
    SET_USER,
    User,
    SET_LOADING,
    SIGN_OUT,
    SignInData,
    SET_ERROR,
    NEED_VERIFICATION,
    SET_SUCCESS,
    SET_MODAL
} from '../types';

import {RootState} from '../index';

import firebaseApp from '../../firebase/firebaseApp';
import {getAuth, createUserWithEmailAndPassword, signOut, sendPasswordResetEmail, signInWithEmailAndPassword} from 'firebase/auth';
import {getFirestore, doc, getDoc, Timestamp, setDoc} from 'firebase/firestore';

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);


// Create user
export const signup = (data: SignUpData, successMsg: string): ThunkAction<void, RootState, null, AuthAction> => {
    return async dispatch => {
        await createUserWithEmailAndPassword(auth, data.email, data.password).then((credential) => {
            setDoc(doc(db, 'users', credential.user.uid), {
                firstname: data.firstname,
                lastname: data.lastname,
                email: data.email,
                admin: false,
                created_at: Timestamp.now(),
                updated_at: Timestamp.now(),
            });
            dispatch(setSuccess(successMsg));
        }).catch((error) => {
            dispatch(setError(`${error.code}: ${error.message}`));
        });
    }
}


// Get user by ID
export const getUserById = (id: string): ThunkAction<void, RootState, null, AuthAction> => {
    return async dispatch => {
        try {

            const docRef = doc(db, 'users', id);
            const docSnap = await getDoc(docRef);

            if(docSnap.exists()) {
                const userData = {id: docSnap.id, ...docSnap.data()} as User;
                dispatch({
                    type: SET_USER,
                    payload: userData,
                });
            }
        } catch (err) {
            console.error(err);
        }
    }
}

export const setLoading = (value: boolean): ThunkAction<void, RootState, null, AuthAction> => {
    return dispatch => {
        dispatch({
            type: SET_LOADING,
            payload: value
        });
    }
}

// Login in
export const signin = (data: SignInData, onError: () => void): ThunkAction<void, RootState, null, AuthAction> => {
    return async dispatch => {
        await signInWithEmailAndPassword(auth, data.email, data.password).then(() => {
            dispatch(setAuthModal(false));
        }).catch((error) => {
            onError();
            let msg;
            switch (error.code) {
                case 'auth/wrong-password':
                case 'auth/user-not-found':
                    msg = 'The e-mail address or password you have entered is invalid.'
                    break;
                case 'auth/too-many-requests':
                    msg = 'Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.';
                    break;
                default:
                    msg = `${error.code}: ${error.message}`
                    break;
            }
            dispatch(setError(msg));
        });
    }
}

export const signout = (): ThunkAction<void, RootState, null, AuthAction> => {
    return async dispatch => {
        dispatch(setLoading(true));
        await signOut(auth).then(() => {
            dispatch({
                type: SIGN_OUT
            });
        }).catch((error) => {
            setError(`${error.code}: ${error.message}`);
        })
    }
}

// Set error
export const setError = (msg: string): ThunkAction<void, RootState, null, AuthAction> => {
    return dispatch => {
        dispatch({
            type: SET_ERROR,
            payload: msg
        })
    }
}

// Set verification
export const setNeedVerification = (): ThunkAction<void, RootState, null, AuthAction> => {
    return dispatch => {
        dispatch({
            type: NEED_VERIFICATION
        });
    }
}

// Set success
export const setSuccess = (msg: string): ThunkAction<void, RootState, null, AuthAction> => {
    return dispatch => {
        dispatch({
            type: SET_SUCCESS,
            payload: msg
        });
    }

}

// Password recovery
export const sendResetEmail = (email: string, successMsg: string): ThunkAction<void, RootState, null, AuthAction> => {
    return async dispatch => {
        await sendPasswordResetEmail(auth, email).then(() => {
            dispatch(setSuccess(successMsg));
        }).catch((error) => {
            dispatch(setError(`${error.code}: ${error.message}`));
        });
    }
}

export const setAuthModal = (show: boolean): ThunkAction<void, RootState, null, AuthAction> => {
    return dispatch => {
        dispatch({
            type: SET_MODAL,
            payload: show,
        });
    }
}
