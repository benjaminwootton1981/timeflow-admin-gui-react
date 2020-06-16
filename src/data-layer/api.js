// Api
import {ax} from "./axios";

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
export const  getStreamsRequest = (project_id) => ax.get(`streams/?project=${project_id}`);
export const  getStreamProcessorsRequest = (project_id) => ax.get(`streamprocessors/?project=${project_id}`);
export const  getSimulationsRequest = (project_id) => ax.get(`simulations/?project=${project_id}`);

