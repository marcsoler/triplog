import {
    AuthAction,
    AuthState,
    NEED_VERIFICATION,
    SET_ERROR,
    SET_LOADING,
    SET_SUCCESS,
    SET_USER,
    SIGN_OUT
} from '../types';

const initialState: AuthState = {
    user: undefined,
    authenticated: false,
    loading: true,
    error: '',
    needVerification: false,
    success: ''
}

const authReducer = (state = initialState, action: AuthAction) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.payload,
                authenticated: true
            }
        case SET_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case SIGN_OUT:
            return {
                ...state,
                user: null,
                authenticated: false,
                loading: false,
            }
        case SET_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case NEED_VERIFICATION:
            return {
                ...state,
                needVerification: true
            }
        case SET_SUCCESS:
            return {
                ...state,
                success: action.payload
            }
        default:
            return state;
    }
}

export default authReducer;
