import { combineReducers } from "redux";
import ServiceReducer from "./serviceReducer";
import StreamProcessorReducer from "../streamProcessor/reducer";
import { CONSTANTS } from "../constants";
import loader from "../loader/reducer";

const userReducer = (state = null, action) => {
  if (action.type === CONSTANTS.GET_CURRENT_USER) {
    return action.payload;
  }

  return state;
};

const configReducer = (state = {}, action) => {
  if (action.type === CONSTANTS.GET_CONFIG) {
    return action.payload;
  }
  return state;
};
const RootReducer = combineReducers({
  ServiceReducer,
  StreamProcessorReducer,
  loader,
  currentUser: userReducer,
  config: configReducer,
});

export default RootReducer;
