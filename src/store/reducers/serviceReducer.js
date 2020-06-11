import { GET_CARD } from "../constants";

const initialState = {};

export default function ServiceReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CARD:
      return {
        ...state
      };
    default:
      return state;
  }
}
