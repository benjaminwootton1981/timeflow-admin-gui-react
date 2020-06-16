import axios from "axios";
import {API_URL} from "../config";
// export const baseUrl = process.env.REACT_APP_API + "/api/v1";
export const domainUrl = process.env.REACT_APP_API;

// Axios settings
export const ax = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});
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

// Api
/**
 * @param project_id
 * @returns {Promise<data>}
 */
export const  getStreamsRequest = (project_id) => ax.get(`streams/?project=${project_id}`);
export const  getStreamProcessorsRequest = (project_id) => ax.get(`streamprocessors/?project=${project_id}`);
export const  getSimulationsRequest = (project_id) => ax.get(`simulations/?project=${project_id}`);
