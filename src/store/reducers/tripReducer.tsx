import {TripAction, TripState, SET_TRIP} from '../types';

const initialState: TripState = {
    trip: undefined
}

const tripReducer = (state = initialState, action: TripAction) => {
    switch (action.type) {
        case SET_TRIP:
            return {
                ...state,
                trip: action.payload,
            }
        default:
            return state;

    }
}

export default tripReducer;
