import {GET_SIMULATIONS, GET_STREAMPROCESSORS, GET_STREAMS} from "../constants";
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

export const getStreamProcessors = (project_id) => {
  return dispatch => {
    let url = `${API_URL}streamprocessors/?project=${project_id}`;
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
          dispatch(_getStreamProcessors(result));
        });
  };
};

export const _getStreamProcessors = result => {
  return {
    type: GET_STREAMPROCESSORS,
    result
  };
};

export const getSimulations = (project_id) => {
  return dispatch => {
    let url = `${API_URL}simulations/?project=${project_id}`;
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
          dispatch(_getSimulations(result));
        });
  };
};

export const _getSimulations = result => {
  return {
    type: GET_SIMULATIONS,
    result
  };
};


