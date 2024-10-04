import { configureStore } from "@reduxjs/toolkit";
import appReducer from "src/appSlice";
import { hubzApi } from "src/api/index";

export const store = configureStore({
  reducer: {
    app: appReducer,
    [hubzApi.reducerPath]: hubzApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(hubzApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
