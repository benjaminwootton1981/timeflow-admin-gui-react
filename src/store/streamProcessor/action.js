import {CONSTANTS} from "../constants";
import {
    getStreamsRequest
} from "../../dall/axios";

export const getStreamsAbc = (project_id) => (dispatch) => {
    getStreamsRequest(project_id).then(resp => {
        debugger
        dispatch({
            type: CONSTANTS.STREAMS.GET_STREAMS,
            data: resp
        });
    }).catch(err => {
        console.log(err);
    })
};

export const addStep = (type) => ({
    type: CONSTANTS.STREAMS.ADD_NEW_STEP,
    data: type

});



