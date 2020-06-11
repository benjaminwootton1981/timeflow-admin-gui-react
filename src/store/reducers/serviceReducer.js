import { GET_STREAMS } from "../constants";

const initialState = {
  streams: []
};

export default function ServiceReducer(state = initialState, action) {
  switch (action.type) {
    case GET_STREAMS:
      return {
        ...state,
        streams: action.result
      };
    default:
      return state;
  }
}
