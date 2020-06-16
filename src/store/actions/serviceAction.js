import {STREAMS} from "../constants";
import {
    getSimulationsRequest,
    getStreamProcessorsRequest,
    getStreamsRequest
} from "../../dall/axios";

export const getStreams = (project_id) => (dispatch) => {
    getStreamsRequest(project_id).then(resp => {
        debugger
        dispatch({
            type:STREAMS.GET_STREAMS,
            data:resp
        });
    }).catch(err => {
        console.log(err);
    })
};

export const getStreamProcessors = (project_id) => (dispatch)=> {
    return dispatch => {
        getStreamProcessorsRequest(project_id).then(result => {
            dispatch({
                type: STREAMS.GET_STREAM_PROCESSORS,
                data:result
            });
        }).catch(err => {
                console.log(err);
            })
    };
};

export const getSimulations = (project_id) => {
    return dispatch => {
        getSimulationsRequest(project_id).then(result => {
            dispatch({
                type: STREAMS.GET_SIMULATIONS,
                data:result});
        }).catch(err => {
                console.log(err);
            })

    };
};




