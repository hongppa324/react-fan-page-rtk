import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import authSlice from "../modules/authSlice";
import commentSlice from "../modules/commentSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  authSlice,
  commentSlice,
});

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["authSlice"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

const persistor = persistStore(store);

export { store, persistor };

const stateChangeTracker = () => {
  console.log(store.getState());
};

store.subscribe(stateChangeTracker);
