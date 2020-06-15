import { GET_STREAMS, GET_STREAMPROCESSORS, GET_SIMULATIONS } from "../constants";

const initialState = {
  streams: null,
  streamprocessors: null,
  simulations: null,
};

export default function ServiceReducer(state = initialState, action) {
  switch (action.type) {
    case GET_STREAMS:
      return {
        ...state,
        streams: action.result
      };
    case GET_STREAMPROCESSORS:
      return {
        ...state,
        streamprocessors: action.result
      };
    case GET_SIMULATIONS:
      return {
        ...state,
        simulations: action.result
      };
    default:
      return state;
  }
}
