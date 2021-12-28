import firebaseApp from '../../firebase/firebaseApp';
import {Trip, TripAction} from '../types';

import {getFirestore, addDoc, collection, Timestamp} from 'firebase/firestore';


const db = getFirestore(firebaseApp);

export const storeTrip = async (trip: Trip) => {

    //To add:
    console.log('trip to trips', trip.name);
    console.log('wps', trip.waypoints);

    //Add trip:
    const tripRef = await addDoc(collection(db, 'trips'), {
        name: trip.name,
        created_at: Timestamp.now(),
    });

    //and its waypoints:

    await  addDoc(collection(db, 'waypoints'), {

    })


        }
