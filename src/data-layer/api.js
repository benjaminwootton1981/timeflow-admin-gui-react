// Api
import { ax } from "./axios";
import api from "../api";

ax.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      localStorage.clear();
      window.location.reload();
    }
    return error.response;
  }
);

/**
 * @param project_id
 * @returns {Promise<data>}
 */
export const getStreamsRequest = (project_id) =>
  ax.get(`streams/?project=${project_id}`);

export const getProjectsRequest = (project_id) =>
  ax.get(`projects/${project_id}`);

export const getStreamProcessorsRequest = (project_id) =>
  ax.get(`streamprocessors/?project=${project_id}`);

export const getStreamRequest = (project_id) =>
  ax.get(`stream/?project=${project_id}`);

export const getStreamProcessorListRequest = (project_id) =>
  ax.get(`streamprocessor/?project=${project_id}`);

export const getSimulationsRequest = (project_id) =>
  ax.get(`simulations/?project=${project_id}`);

export const getStepTypeRequest = () =>
  ax.get(`streamprocessorstep/step-types`);

export const setStepTypeRequest = (data) => {
  return ax.post(`streamprocessorstep/`, data);
};

export const updateStepTypeRequest = (step_id, data) =>
  ax.patch(`streamprocessorstep/${step_id}/`, data);

export const createWorkFlowStepRequest = (data) =>
  ax.post(`workflowtask/`, data);

export const updateWorkFlowStepRequest = (data, workFlowId) =>
  ax.patch(`workflowtask/${workFlowId}/`, data);

export const updateStreamProcessorInfoRequest = (step_id, data) =>
  ax.patch(`streamprocessor/${step_id}/`, data);

export const setStreamProcessorRequest = (data) =>
  ax.post(`streamprocessor/`, data);

export const getStreamProcessorRequest = (id) =>
  ax.get(`streamprocessor/${id}`);

export const getSchemasRequest = (project_id) =>
  ax.get(`schema/?project=${project_id}`);

export const getSearchRequest = (project_id) =>
  ax.get(`search/?project=${project_id}`);

export const deleteStepRequest = (step_id) =>
  ax.delete(`streamprocessorstep/${step_id}`);

export const getRecipientListRequest = () => ax.get(`user/recipient-list/`);

export const getDataDictionaryRequest = (step_id) =>
  ax.get(`datadictionary/?project=${step_id}`);

export const getFunctionRequest = (step_id) =>
  ax.get(`function/?project=${step_id}`);

export const getKpiRequest = (step_id) => ax.get(`kpi/?project=${step_id}`);

export const getFunctionEndpointsRequest = () => ax.get(`function-endpoint/`);
