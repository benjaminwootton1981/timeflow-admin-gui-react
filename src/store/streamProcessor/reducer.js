import {CONSATNTS} from "../constants";

const initialState = {
    addedSteps: [

    ],

};

export default function StreamProcessorReducer(state = initialState, action) {
    switch (action.type) {
        case CONSATNTS.STREAMS.GET_STREAMS:
            return {...state, streams: action.data};

        default:
            return state;
    }
}
