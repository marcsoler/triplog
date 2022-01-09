import firebaseApp from '../../firebase/firebaseApp';
import {Post, SET_TRIP, SET_TRIPS, Trip, TripAction, TripsAction} from '../types';

import {
    getFirestore,
    addDoc,
    collection,
    Timestamp,
    GeoPoint,
    query,
    getDocs,
    orderBy, getDoc, doc,
} from 'firebase/firestore';
import {ThunkAction} from 'redux-thunk';
import {RootState} from '../index';


const db = getFirestore(firebaseApp);

const tripsRef = collection(db, 'trips');

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


export const storeTrip = (trip: Trip): ThunkAction<void, RootState, null, TripAction> => {
    return async dispatch => {
        await addDoc(tripsRef, {
            name: trip.name,
            imageUrl: trip.imageUrl,
            waypoints: trip.waypoints.map(wp => new GeoPoint(wp.lat(), wp.lng())),
            polyline: trip.polyline,
            created_at: Timestamp.now(),
            updated_at: Timestamp.now(),
        }).catch((error) => {
            console.error('Some error happened here', 'tripActions:storeTrip()');
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
            console.log('Error on getTripById()', e);
        }

    }
}
