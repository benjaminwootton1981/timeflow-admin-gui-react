import {CONSTANTS} from "../constants";

const initialState = {
    addedSteps: [],

};

export default function StreamProcessorReducer(state = initialState, action) {
    switch (action.type) {
        case CONSTANTS.STREAMS.ADD_NEW_STEP:
            const step = [...state.addedSteps, {'type': action.data}];
            return {...state, addedSteps: step};

        default:
            return state;
    }
}
