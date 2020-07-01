import { CONSTANTS } from "../constants";

const initialState = {
  streams: null,
  streamprocessors: null,
  simulations: null,
};

export default function ServiceReducer(state = initialState, action) {
  switch (action.type) {
    case CONSTANTS.STREAMS.GET_STREAMS:
      return { ...state, streams: action.data };
    case CONSTANTS.STREAMS.GET_STREAM_PROCESSORS:
      return { ...state, streamprocessors: action.data };
    case CONSTANTS.STREAMS.GET_SIMULATIONS:
      return { ...state, simulations: action.data };
    case CONSTANTS.STREAMS.UPDATE_STREAM_PROCESSOR_INFO:
      const filterStreamProcessors = state.streamprocessors.filter(
        (streamProcessor) => streamProcessor.id !== +action.data.id
      );
      filterStreamProcessors.push(action.data);
      return { ...state, streamprocessors: filterStreamProcessors };
    default:
      return state;
  }
}
