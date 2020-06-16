// Api
import {ax} from "./axios";

/**
 * @param project_id
 * @returns {Promise<data>}
 */
export const  getStreamsRequest = (project_id) => ax.get(`streams/?project=${project_id}`);
export const  getStreamProcessorsRequest = (project_id) => ax.get(`streamprocessors/?project=${project_id}`);
export const  getSimulationsRequest = (project_id) => ax.get(`simulations/?project=${project_id}`);

