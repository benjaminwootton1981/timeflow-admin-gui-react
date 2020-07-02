import { CONSTANTS } from "../constants";
import {
  deleteStepRequest,
  getDataDictionaryRequest,
  getDatadictionaryRequest,
  getFunctionRequest,
  getKpiRequest,
  getRecipientListRequest,
  getSchemasRequest,
  getStepTypeRequest,
  getStreamProcessorListRequest,
  getStreamProcessorRequest,
  getStreamRequest,
  setStepTypeRequest,
  setStreamProcessorRequest,
  updateStepTypeRequest,
  updateStreamProcessorInfoRequest,
} from "../../data-layer/api";

export const getStreamProcessorsList = (project_id) => (dispatch) => {
  getStreamProcessorListRequest(project_id)
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
export const getStreamProcessor = (stream_processor_id) => (dispatch) => {
  getStreamProcessorRequest(stream_processor_id)
    .then((resp) => {
      dispatch({
        type: CONSTANTS.STREAMS.GET_STREAM_PROCESSOR,
        data: resp.data.streamprocessorstep_set,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const createStreamProcessor = (dataStep) => (dispatch) => {
  const steps = dataStep.items;
  const streamProcessorData = dataStep;
  delete streamProcessorData["items"];
  const stringifyData = JSON.stringify(streamProcessorData);
  setStreamProcessorRequest(stringifyData)
    .then((resp) => {
      steps.forEach((step, i) => {
        const addId = Object.assign(step, {});
        addId["streamprocessor"] = resp.data.id;
        addId["ordering"] = i + 1;
        const stringifyDataStep = JSON.stringify(addId);
        setStepTypeRequest(stringifyDataStep)
          .then((resp) => {})
          .catch((err) => {
            console.log(err);
          });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
export const saveStreamProcessor = (editStreamProcessor, processorId) => (
  dispatch
) => {
  editStreamProcessor.items.forEach((step, i) => {
    const addId = Object.assign(step, {});
    addId["streamprocessor"] = processorId;
    addId["ordering"] = i + 1;
    const stringifyDataStep = JSON.stringify(addId);
    const streamProcessorInfo = editStreamProcessor;
    delete streamProcessorInfo["items"];
    const stringifyDataInfo = JSON.stringify(streamProcessorInfo);
    if (step["block"]) {
      console.log("BLOCK");
    }
    updateStreamProcessorInfoRequest(processorId, stringifyDataInfo)
      .then((resp) => {})
      .catch((err) => {
        console.log(err);
      });

    if (step.id !== null) {
      updateStepTypeRequest(step.id, stringifyDataStep)
        .then((resp) => {
          if (resp.status === 200) {
          } else {
            alert(resp.data.streamprocessor[0]);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setStepTypeRequest(stringifyDataStep)
        .then((resp) => {
          if (resp.status === 201) {
          } else {
            alert(resp.data.streamprocessor[0]);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
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

export const orderingStep = (type, stepIndex) => ({
  type: CONSTANTS.STREAMS.ORDERING_STEP,
  data: { type: type, stepIndex: stepIndex },
});
export const updateDataStreamProcessor = (localData) => ({
  type: CONSTANTS.STREAMS.UPDATE_STREAM_PROCESSOR,
  data: localData,
});
export const addNewBlock = (localData) => ({
  type: CONSTANTS.STREAMS.UPDATE_STREAM_PROCESSOR,
  data: localData,
});
export const updateDataInfo = (data, id) => {
  let items = {
    id: +id,
    project: data.project,
    name: data.name,
    description: data.description,
    replicas: data.replicas,
  };
  return {
    type: CONSTANTS.STREAMS.UPDATE_STREAM_PROCESSOR_INFO,
    data: items,
  };
};

export const deleteStep = (name, step_id) => (dispatch) => {
  deleteStepRequest(step_id)
    .then((resp) => {
      dispatch({
        type: CONSTANTS.STREAMS.DELL_NEW_STEP,
        data: name,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
export const newStreamProcessor = () => ({
  type: CONSTANTS.STREAMS.CREATE_NEW_STREAM,
});

export const getRecipientList = () => (dispatch) => {
  getRecipientListRequest()
    .then((resp) => {
      dispatch({
        type: CONSTANTS.STREAMS.GET_RECIPIENT_LIST,
        data: resp.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
export const getDataDictionary = (step_id) => (dispatch) => {
  getDataDictionaryRequest(step_id)
    .then((resp) => {
      dispatch({
        type: CONSTANTS.STREAMS.GET_DATA_DICTIONARY,
        data: resp.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
export const getFunctionData = (step_id) => (dispatch) => {
  getFunctionRequest(step_id)
    .then((resp) => {
      dispatch({
        type: CONSTANTS.STREAMS.GET_FUNCTION,
        data: resp.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
export const getKpi = (step_id) => (dispatch) => {
  getKpiRequest(step_id)
    .then((resp) => {
      dispatch({
        type: CONSTANTS.STREAMS.GET_KPI,
        data: resp.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
