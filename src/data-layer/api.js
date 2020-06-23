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

export const getStreamProcessorRequest = (project_id) =>
  ax.get(`streamprocessor/?project=${project_id}`);

export const getSimulationsRequest = (project_id) =>
  ax.get(`simulations/?project=${project_id}`);

export const getStepTypeRequest = () =>
  ax.get(`streamprocessorstep/step-types`);

export const setStepTypeRequest = (data) => ax.post(`streamprocessorstep`);

export const setStreamProcessorRequest = (data) => ax.post(`streamprocessor`);

export const getSchemasRequest = (project_id) =>
  ax.get(`schema/?project=${project_id}`);
