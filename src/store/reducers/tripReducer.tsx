import {SET_TRIP, SET_TRIP_MODAL, TripAction, TripState} from '../types';

const initialState: TripState = {
    trip: undefined,
    tripModal: {
        show: false,
        variant: 'success',
        message: '',
    },
}

const tripReducer = (state = initialState, action: TripAction) => {
    switch (action.type) {
        case SET_TRIP:
            return {
                ...state,
                trip: action.payload,
            }
        case SET_TRIP_MODAL:
            return {
                ...state,
                tripModal: action.payload,
            }
        //case SET_TRIP_SUCCESS:
        //    return {
        //        ...state,
        //        successMsg: action.payload,
        //    }
        //case SET_TRIP_ALERT:
        //    return {
        //        ...state,
        //        alertMsg: action.payload,
        //    }

        default:
            return state;

    }
}

export default tripReducer;
