import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Uses localStorage by default
import userReducer from "./userslice";
import adminReducer from "./adminslice";

// Redux Persist configuration
const persistConfig = {
  key: "root", // Key for the root of the persisted state
  storage, // Storage method (localStorage in this case)
};

const persistedReducer = persistReducer(persistConfig, userReducer);
const persistedAdminReducer = persistReducer(persistConfig, adminReducer);

// Create the store with the persisted reducer
const store = configureStore({
  reducer: {
    user: persistedReducer,
    admin: persistedAdminReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Ignore non-serializable checks for Redux Persist
    }),
});

// Export the store and persistor
export const persistor = persistStore(store);
export default store;
