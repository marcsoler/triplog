import firebaseApp from '../../firebase/firebaseApp';
import {
    ITripFormData,
    Post,
    SET_TRIP,
    SET_TRIP_MODAL,
    SET_TRIPS,
    Trip,
    TripAction, TripModal,
    TripsAction
} from '../types';

import {
    getFirestore,
    addDoc,
    collection,
    Timestamp,
    GeoPoint,
    query,
    getDocs,
    orderBy, getDoc, doc, deleteDoc,
} from 'firebase/firestore';
import {ThunkAction} from 'redux-thunk';
import {RootState} from '../index';


const db = getFirestore(firebaseApp);

const tripsRef = collection(db, 'trips');

const getAllTrips = async (): Promise<Trip[]>=> {
    const q = query(collection(db, 'trips'), orderBy('created_at', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((t) => {
        return {id: t.id, ...t.data()} as Trip;
    });
}

// get trips
export const getTrips = (): ThunkAction<void, RootState, null, TripsAction> => {
    return async dispatch => {
        try {
            const querySnapshot = await getDocs(query(tripsRef, orderBy('created_at', 'desc')));

            const tripsData: Array<Trip> = querySnapshot.docs.map((p) => {
                return {id: p.id, ...p.data()} as Trip;
            });

            dispatch({
                type: SET_TRIPS,
                payload: tripsData,
            });


        } catch (e) {
            console.error('Some error happened here', 'tripActions:storeTrip()', e);
        }
    }
}


export const storeTrip = (tripData: ITripFormData): ThunkAction<void, RootState, null, TripAction> => {
    return async dispatch => {


        await addDoc(tripsRef, {
            name: tripData.name,
            mode: tripData.mode,
            //imageUrl: tripData.imageUrl,
            //waypoints: tripData.waypoints.map(wp => new GeoPoint(wp.lat(), wp.lng())),
            polyline: tripData.polyline,
            coverImg: tripData.coverImg,
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
            });
        });
        dispatch({
            type: SET_TRIP_MODAL,
            payload: {
                show: true,
                variant: 'success',
                message: 'Trip successfully created',
                redirect: '/dashboard',
            },
        });

    }
}


export const setTripModal = (tripModal: TripModal): ThunkAction<void, RootState, null, TripAction> => {
    return dispatch => {
        dispatch({
            type: SET_TRIP_MODAL,
            payload: tripModal,
        });
    }
}

export const clearTripModal = (): ThunkAction<void, RootState, null, TripAction> => {
    return dispatch => {
        dispatch({
            type: SET_TRIP_MODAL,
            payload: { show: false, variant: 'success', message: ''},
        });
    }
}

// get by post
export const getTripByPost = (post: Post): ThunkAction<void, RootState, null, TripAction> => {
    return async dispatch => {
        try {
            const querySnapshot = await getDocs(query(tripsRef, orderBy('created_at', 'desc')));

            const tripsData: Array<Trip> = querySnapshot.docs.map((p) => {
                return {id: p.id, ...p.data()} as Trip;
            });

            const trip = tripsData.find((trip: Trip) => {
                return trip.id === post.trip;
            });
            if(trip) {
                dispatch({
                    type: SET_TRIP,
                    payload: trip,
                });
            } else {
                console.error('No trip found!!');
            }

        } catch (e) {
            console.error('tripActions:getTripByPostId()', e);
        }
    }
}

// get trip by ID

export const getTripById = (id: string): ThunkAction<void, RootState, null, TripAction> => {
    return async dispatch => {

        try {
            const tripRef = doc(db, 'trips', id);
            const docSnap = await getDoc(tripRef);

            if(docSnap.exists()) {
                const tripData = { id: id, ...docSnap.data() } as Trip;

                dispatch({
                    type: SET_TRIP,
                    payload: tripData
                });
            } else {
                console.error('Trip #' + id + ' not found... setError?');
            }
        } catch (e) {
            console.error('Error on getTripById()', e);
        }

    }
}


export const deleteTrip = (trip: Trip): ThunkAction<void, RootState, null, TripsAction> => {
    return async dispatch => {

        const docRef = doc(db, 'trips', trip!.id!);

        await deleteDoc(docRef).catch((error) => {
            console.error('Some error happened here', 'tripActions:deleteTrip()');
        });

        const tripsData = await getAllTrips();

        dispatch({
            type: SET_TRIPS,
            payload: tripsData,
        })
    }
}
