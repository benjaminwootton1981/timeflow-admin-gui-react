import {CONSTANTS} from "../constants";
import {forEach} from "react-bootstrap/cjs/ElementChildren";

const initialState = {
    addedSteps: [],

};

export default function StreamProcessorReducer(state = initialState, action) {
    switch (action.type) {
        case CONSTANTS.STREAMS.ADD_NEW_STEP:
            const step = [...state.addedSteps, {'name': action.data}];
            return {...state, addedSteps: step};
        case CONSTANTS.STREAMS.DELL_NEW_STEP:

            const index = state.addedSteps.indexOf(5);
            if (index > -1) {
                state.addedSteps.splice(index, 1);
            }
            state.addedSteps.forEach((step) => {
                // if (step.name === action.data) {
                //     state.addedSteps.delete(index)
                // }
            });
            return {...state, addedSteps: step};

        default:
            return state;
    }
}
