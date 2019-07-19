import { createStore } from "redux";
import rotateReducer from "./Reducers/reducer";

function configureStore(state = { play: 1, index: 0 }) {
  return createStore(rotateReducer, state);
}

export default configureStore;