import { CONSTANTS } from "../constants";

const initialState = {
  loading: false,
  isRedirect: false,
};

export default function loader(state = initialState, action) {
  switch (action.type) {
    case CONSTANTS.LOADER.LOAD_ON:
      return { ...state, loading: action.data };
    case CONSTANTS.LOADER.LOAD_OF:
      return { ...state, loading: action.data };
    case CONSTANTS.LOADER.IS_POSITIVE_RESP:
      return { ...state, isRedirect: action.data };
    case CONSTANTS.LOADER.IS_NEGATIVE_RESP:
      return { ...state, isRedirect: action.data };

    default:
      return state;
  }
}
