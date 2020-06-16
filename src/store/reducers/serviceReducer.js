import {CONSATNTS} from "../constants";

const initialState = {
  streams: [],
  streamprocessors: [],
  simulations: [],
};

export default function ServiceReducer(state = initialState, action) {
  switch (action.type) {
    case CONSATNTS.STREAMS.GET_STREAMS:
      return {...state, streams: action.data};
    case CONSATNTS.STREAMS.GET_STREAM_PROCESSORS:
      return {...state, streamprocessors: action.data};
    case CONSATNTS.STREAMS.GET_SIMULATIONS:
      return {...state, simulations: action.data};
    default:
      return state;
  }
}
