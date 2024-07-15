import { configureStore } from "@reduxjs/toolkit";
import authReducers from "./reducers/authReducers";
import { userApi } from "../Services/api";
import fileReducer from "./reducers/filereducer";
import adminReducer from "./reducers/adminReducers";
import { adminApi } from "../Services/adminapi";
import { fileApi } from "../Services/file";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { useDispatch, useSelector } from "react-redux";

const persistConfig = {
  key: 'root',
  storage,
}
const persistedReducer = persistReducer(persistConfig, authReducers)
export const store = configureStore({
  reducer: {
    auth: persistedReducer,
    [userApi.reducerPath]: userApi.reducer,
    file: fileReducer,
    [fileApi.reducerPath]: fileApi.reducer,
    admin: adminReducer,
    [adminApi.reducerPath]: adminApi.reducer,
  },
  //return
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      fileApi.middleware,
      adminApi.middleware
    ),
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

// Optional: Setting up listeners if you're using RTK Query's cache invalidation or other features
// import { setupListeners } from '@reduxjs/toolkit/query';
// setupListeners(store.dispatch);
