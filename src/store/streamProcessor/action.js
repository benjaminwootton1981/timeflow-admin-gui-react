import {STREAMS} from "../constants";
import {
    getStreamsRequest
} from "../../dall/axios";

export const getStreamsAbc = (project_id) => (dispatch) => {
    getStreamsRequest(project_id).then(resp => {
        debugger
        dispatch({
            type: STREAMS.GET_STREAMS,
            data: resp
        });
    }).catch(err => {
        console.log(err);
    })
};

export const addStep = (item) => {

};



