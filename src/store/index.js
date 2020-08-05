import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import RootReducer from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(
  RootReducer,
  {},
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
