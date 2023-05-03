import {
  type Action,
  type ThunkAction,
  configureStore,
} from "@reduxjs/toolkit";
import logger from "redux-logger";
import { categorySlice } from "./redux/categorySlice";

function makeStore() {
  return configureStore({
    reducer: {
      category: categorySlice.reducer,
    },
    middleware: (middleware) =>
      process.env.NODE_ENV === "development"
        ? middleware().concat(logger)
        : middleware(),
    devTools: process.env.NODE_ENV === "development",
  });
}

const store = makeStore();

export default store;

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>;
