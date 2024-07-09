import { configureStore } from "@reduxjs/toolkit";
import authReducers  from "./reducers/authReducers";
import { userApi } from "../Services/api";
import fileReducer from "./reducers/filereducer";
import adminReducer from "./reducers/adminReducers";
import { adminApi } from "../Services/adminapi";
import { fileApi } from "../Services/file";
import { useDispatch , useSelector } from "react-redux";
export const store= configureStore({
    reducer:{
        auth:authReducers,
        [userApi.reducerPath]:userApi.reducer,
        file:fileReducer,
        [fileApi.reducerPath]:fileApi.reducer,
        admin:adminReducer,
        [adminApi.reducerPath]:adminApi.reducer,
    },
    //return
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(userApi.middleware,fileApi.middleware,adminApi.middleware)
})
export type RootState= ReturnType<typeof store.getState>;
export type AppDispatch= typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();



// Optional: Setting up listeners if you're using RTK Query's cache invalidation or other features
// import { setupListeners } from '@reduxjs/toolkit/query';
// setupListeners(store.dispatch);