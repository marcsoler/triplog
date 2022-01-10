import {TripAction, TripState, SET_TRIP, SET_TRIP_SUCCESS} from '../types';

const initialState: TripState = {
    trip: undefined,
    showSuccess: false,
}

const tripReducer = (state = initialState, action: TripAction) => {
    switch (action.type) {
        case SET_TRIP:
            return {
                ...state,
                trip: action.payload,
            }
        case SET_TRIP_SUCCESS:
            return {
                ...state,
                showSuccess: action.payload,
            }
        default:
            return state;

    }
}

export default tripReducer;
