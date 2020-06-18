import {combineReducers} from "redux";
import ServiceReducer from "./serviceReducer";
import StreamProcessorReducer from "../streamProcessor/reducer";
import {CONSTANTS} from "../constants";

const userReducer = (state = null, action) => {
  if (action.type === CONSTANTS.GET_CURRENT_USER) {
    return action.payload
  }

  return state
}
const RootReducer = combineReducers({
  ServiceReducer,
  StreamProcessorReducer,
  currentUser: userReducer
});

export default RootReducer;
