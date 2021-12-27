export const SET_USER = 'SET_USER';
export const SIGN_OUT = 'SIGN_OUT';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';
export const NEED_VERIFICATION = 'NEED_VERIFICATION';
export const SET_SUCCESS = 'SET_SUCCESS';

export interface User {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    createdAt: any;
}

export interface AuthState {
    user?: User;
    authenticated: boolean;
    loading: boolean;
    error: string;
    needVerification: boolean;
    success: string;
}

export interface SignUpData {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}

export interface SignInData {
    email: string;
    password: string;
}

// Actions:

interface SetUserAction {
    type: typeof SET_USER;
    payload: User;
}

interface SetLoadingAction {
    type: typeof SET_LOADING;
    payload: boolean;
}

interface SignOutAction {
    type: typeof SIGN_OUT;
}

interface SetErrorAction {
    type: typeof SET_ERROR;
    payload: string;
}

interface NeedVerificationAction {
    type: typeof NEED_VERIFICATION;
}

interface SetSuccessAction {
    type: typeof SET_SUCCESS;
    payload: string;
}

export type AuthAction =
    SetUserAction
    | SetLoadingAction
    | SignOutAction
    | SetErrorAction
    | NeedVerificationAction
    | SetSuccessAction;


export const SET_POST = 'SET_POST';
export const SET_POSTS = 'SET_POSTS';

export interface Post {
    id: string;
    title: string;
    subtitle: string;
    content: string;
    route: string;
    published: boolean;
    created_at: {
        seconds: number,
        nanoseconds: number,
    };
    updated_at: {
        seconds: number,
        nanoseconds: number,
    };
}

export interface PostState {
    post?: Post;
}

interface SetPostAction {
    type: typeof SET_POST;
    payload: Post;
}

export interface PostsState {
    posts?: Array<Post>;
}

interface SetPostsAction {
    type: typeof SET_POSTS;
    payload: Array<Post>;
}

export type PostAction = SetPostAction;
export type PostsAction = SetPostsAction;
