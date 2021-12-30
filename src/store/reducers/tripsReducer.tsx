import {TripsAction, TripsState, SET_TRIPS} from '../types';

const initialState: TripsState = {
    trips: [],
}

const tripsReducer = (state = initialState, action: TripsAction) => {
    switch (action.type) {
        case SET_TRIPS:
            return {
                ...state,
                trips: action.payload,
            }
        default:
            return state;

    }
}

export default tripsReducer;
