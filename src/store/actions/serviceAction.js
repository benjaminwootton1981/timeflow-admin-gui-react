import {CONSTANTS} from "../constants";
import {
    getSimulationsRequest,
    getStreamProcessorsRequest,
    getStreamsRequest
} from "../../data-layer/api";

export const getStreams = (project_id) => (dispatch) => {
    getStreamsRequest(project_id).then(result => {
        dispatch({
            type:CONSTANTS.STREAMS.GET_STREAMS,
            data: result.data
        });
    }).catch(err => {
        console.log(err);
    })
};

export const getStreamProcessors = (project_id) => (dispatch)=> {
    getStreamProcessorsRequest(project_id).then(result => {
        dispatch({
            type: CONSTANTS.STREAMS.GET_STREAM_PROCESSORS,
            data: result.data
        });
    }).catch(err => {
        console.log(err);
    })
};

export const getSimulations = (project_id) => (dispatch) => {
    getSimulationsRequest(project_id).then(result => {
        dispatch({
            type: CONSTANTS.STREAMS.GET_SIMULATIONS,
            data: result.data
        });
    }).catch(err => {
        console.log(err);
    })
};




