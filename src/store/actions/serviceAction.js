import { GET_STREAMS } from "../constants";
import { API_URL, PROJECT_KEY, DEVELOPER_KEY } from "../../config";

export const getStreams = () => {
  return dispatch => {
    let url = `${API_URL}streams/?developer_key=${DEVELOPER_KEY}&project_key=${PROJECT_KEY}`;
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .catch(err => {
        console.log(err);
      })
      .then(res => res.json())
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
