import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "../modules/authSlice";
import commentSlice from "../modules/commentSlice";

const rootReducer = combineReducers({
  authSlice,
  commentSlice,
});

const store = configureStore({
  reducer: {},
});

export default store;
