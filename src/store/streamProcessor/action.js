import { CONSTANTS } from "../constants";
import {
  getSchemasRequest,
  getStepTypeRequest,
  getStreamProcessorRequest,
  getStreamRequest,
  setStepTypeRequest,
  setStreamProcessorRequest,
} from "../../data-layer/api";

export const getStreamProcessors = (project_id) => (dispatch) => {
  getStreamProcessorRequest(project_id)
    .then((result) => {
      dispatch({
        type: CONSTANTS.STREAMS.GET_STREAM_PROCESSORS,
        data: result.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
export const getStreams = (project_id) => (dispatch) => {
  getStreamRequest(project_id)
    .then((resp) => {
      dispatch({
        type: CONSTANTS.STREAMS.GET_STREAMS,
        data: resp.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const setStreams = (dataStream, dataStep) => (dispatch) => {
  setStreamProcessorRequest(dataStream)
    .then((resp) => {
      setStepTypeRequest(dataStep)
        .then((resp) => {
          dispatch({
            type: CONSTANTS.STREAMS.GET_STREAMS,
            data: resp.data,
          });
        })
        .catch((err) => {
          console.log(err);
        });

      dispatch({
        type: CONSTANTS.STREAMS.GET_STREAMS,
        data: resp.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getSchemas = (project_id) => (dispatch) => {
  getSchemasRequest(project_id)
    .then((resp) => {
      dispatch({
        type: CONSTANTS.STREAMS.GET_SCHEMAS,
        data: resp.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getStepType = () => (dispatch) => {
  getStepTypeRequest()
    .then((resp) => {
      dispatch({
        type: CONSTANTS.STREAMS.GET_STEP_TYPE,
        data: resp.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addStep = (items) => ({
  type: CONSTANTS.STREAMS.ADD_NEW_STEP,
  data: items,
});
export const setSchemasId = (name) => ({
  type: CONSTANTS.STREAMS.FILTERED_SCHEMAS,
  data: name,
});

// export const setSteps = (step, stepIndex) => ({
//   type: CONSTANTS.STREAMS.SET_STEP,
//   data: { step: step, stepIndex: stepIndex },
// });

export const deleteStep = (name) => ({
  type: CONSTANTS.STREAMS.DELL_NEW_STEP,
  data: name,
});
export const newStreamProcessor = () => ({
  type: CONSTANTS.STREAMS.CREATE_NEW_STREAM,
});
