import { GET_STREAMS } from "../constants";
import { API_URL } from "../../config";

export const getStreams = (project_id) => {
  return dispatch => {
    let url = `${API_URL}streams/?project=${project_id}`;
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .catch(err => {
        console.log(err);
      })
      .then(res => res && res.json())
      .then(result => {
        dispatch(_getStreams(result));
      });
  };
};

export const _getStreams = result => {
  return {
    type: GET_STREAMS,
    result
  };
};
