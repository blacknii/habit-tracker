import { configureStore } from "@reduxjs/toolkit";
import bedtimeReducer from "./bedtime";
import habitsReducer from "./habits";
import newHabitReducer from "./newHabit";

export const store = configureStore({
  reducer: {
    bedtime: bedtimeReducer,
    habits: habitsReducer,
    newHabit: newHabitReducer,
  },
});
