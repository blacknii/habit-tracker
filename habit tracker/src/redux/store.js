import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter";
import habitsReducer from "./habits";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    habits: habitsReducer,
  },
});
