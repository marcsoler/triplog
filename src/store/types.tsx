import {Variant as ReactBootstrapAlertVariant} from 'react-bootstrap/types';

export const SET_USER = 'SET_USER';
export const SIGN_OUT = 'SIGN_OUT';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';
export const NEED_VERIFICATION = 'NEED_VERIFICATION';
export const SET_SUCCESS = 'SET_SUCCESS';
export const SET_MODAL = 'SET_MODAL';

/***
 * User/Auth:
 */

export interface User {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    admin: boolean;
    created_at: {
        seconds: number,
        nanoseconds: number,
    };
}

export interface AuthState {
    user?: User;
    authenticated: boolean;
    loading: boolean;
    error: string;
    needVerification: boolean;
    success: string;
    showModal: boolean;
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

interface SetModalAction {
    type: typeof SET_MODAL;
    payload: boolean;
}


export type AuthAction =
    SetUserAction
    | SetLoadingAction
    | SignOutAction
    | SetErrorAction
    | NeedVerificationAction
    | SetSuccessAction
    | SetModalAction;


/***
 * Posts
 */

export const SET_POST = 'SET_POST';
export const SET_POSTS = 'SET_POSTS';

export interface Post {
    id?: string;
    title: string;
    subtitle: string;
    content: string;
    trip: string;
    //progress: string | number,
    position: any; //google.maps.LatLng;
    draft: boolean;
    created_at?: {
        seconds: number,
        nanoseconds: number,
    };
    updated_at?: {
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


/***
 * Trip / Routes:
 */

export const SET_TRIPS = 'SET_TRIPS';
export const SET_TRIP_MODAL = 'SET_TRIP_MODAL';
//export const SET_TRIP_SUCCESS = 'SET_TRIP_SUCCESS';
//export const SET_TRIP_ALERT = 'SET_TRIP_ALERT';

export interface Trip {
    id?: string;
    name: string;
    mode: string;
    imageUrl: string;
    waypoints: Array<google.maps.LatLng>
    polyline: string,
    created_at?: {
        seconds: number,
        nanoseconds: number,
    };
    updated_at?: {
        seconds: number,
        nanoseconds: number,
    }
}

export interface TripModal {
    show: boolean,
    variant: ReactBootstrapAlertVariant,
    message: string,
    redirect?: string,
}

export interface TripState {
    trip?: Trip;
    tripModal: TripModal;
}

export interface TripsState {
    trips?: Array<Trip>;
}

export const SET_TRIP = 'SET_TRIP';

interface SetTripAction {
    type: typeof SET_TRIP;
    payload: Trip;
}

interface SetTripModalAction {
    type: typeof SET_TRIP_MODAL;
    payload: TripModal;
}


export type TripAction = SetTripAction | SetTripModalAction;


interface SetTripsAction {
    type: typeof SET_TRIPS;
    payload: Array<Trip>;
}

export type TripsAction = SetTripsAction;

/***
 * Comments:
 */

export interface Comment {
    id?: string;
    text: string;
    user?: User;
    post_id: string;
    reactions: Array<Reaction>;
    approved_at?: {
        seconds: number,
        nanoseconds: number,
    };
    created_at?: {
        seconds: number,
        nanoseconds: number,
    };
    updated_at?: {
        seconds: number,
        nanoseconds: number,
    }
}

export interface Reaction {
    user_id: string;
}

export interface Comments {
    comments?: Array<Comment>;
}

export interface CommentState {
    comment?: Comment;
}

export interface CommentsState {
    comments?: Array<Comment>;
}

export const SET_COMMENT = 'SET_COMMENT';
export const SET_COMMENTS = 'SET_COMMENTS';

interface SetCommentAction {
    type: typeof SET_COMMENT;
    payload: Comment;
}

export type CommentAction = SetCommentAction;

interface SetCommentsAction {
    type: typeof SET_COMMENTS;
    payload: Array<Comment>
}

export type CommentsAction = SetCommentsAction;

//Todo:
// type Trip & type TripData (submissions)
// see example User, SignUpData...
