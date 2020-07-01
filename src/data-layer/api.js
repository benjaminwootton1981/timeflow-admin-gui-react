// Api
import { ax } from "./axios";

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

export const setStepTypeRequest = (data) =>
  ax.post(`streamprocessorstep/`, data);

export const updateStepTypeRequest = (step_id, data) =>
  ax.patch(`streamprocessorstep/${step_id}/`, data);

export const updateStreamProcessorInfoRequest = (step_id, data) =>
  ax.patch(`streamprocessor/${step_id}/`, data);

export const setStreamProcessorRequest = (data) =>
  ax.post(`streamprocessor/`, data);

export const getStreamProcessorRequest = (id) =>
  ax.get(`streamprocessor/${id}`);

export const getSchemasRequest = (project_id) =>
  ax.get(`schema/?project=${project_id}`);

export const deleteStepRequest = (step_id) =>
  ax.delete(`streamprocessorstep/${step_id}`);

export const recipient_listRequest = (step_id) =>
  ax.get(`user/recipient-list/${step_id}`);

export const datadictionaryRequest = (step_id) =>
  ax.get(`datadictionary/${step_id}`);

export const functionReqduest = (step_id) => ax.get(`function/${step_id}`);
export const kpiReqduest = (step_id) => ax.get(`kpi/${step_id}`);
