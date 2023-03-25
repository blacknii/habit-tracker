import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter";
import habitsReducer from "./habits";
import newHabitReducer from "./newHabit";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    habits: habitsReducer,
    newHabit: newHabitReducer,
  },
});
