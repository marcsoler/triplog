import firebaseApp from '../../firebase/firebaseApp';
import {Post, PostsAction, SET_POSTS, SET_TRIPS, Trip, TripAction, TripsAction} from '../types';

import {getFirestore, addDoc, collection, Timestamp, GeoPoint, query, getDocs, orderBy} from 'firebase/firestore';
import {ThunkAction} from 'redux-thunk';
import {RootState} from '../index';


const db = getFirestore(firebaseApp);

// get trips
export const getTrips = (): ThunkAction<void, RootState, null, TripsAction> => {
    return async dispatch => {
        try {
            const querySnapshot = await getDocs(query(collection(db, 'trips'), orderBy('created_at', 'desc')));

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
        await addDoc(collection(db, 'trips'), {
            name: trip.name,
            waypoints: trip.waypoints.map(wp => new GeoPoint(wp.lat(), wp.lng())),
            polyline: trip.polyline,
            created_at: Timestamp.now(),
            updated_at: Timestamp.now(),
        }).catch((error) => {
            console.error('Some error happened here', 'tripActions:storeTrip()');
        });
    }
}
