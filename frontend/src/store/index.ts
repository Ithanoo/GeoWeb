import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import layerReducer from "../slices/layerSlice";
import filterReducer from "../slices/filterSlice";
import securityReducer from "../slices/securitySlice";

export const store = configureStore({
  reducer: {
    layers: layerReducer,
    filters: filterReducer,
    security: securityReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
