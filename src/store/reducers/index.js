import { combineReducers } from "redux";
import ServiceReducer from "./serviceReducer";
import StreamProcessorReducer from "../streamProcessor/reducer";
const RootReducer = combineReducers({
  ServiceReducer,
  StreamProcessorReducer
});

export default RootReducer;
