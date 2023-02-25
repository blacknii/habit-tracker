import { createSlice } from "@reduxjs/toolkit";

const dD = {
  name: "Dummy",
  startDay: "2023-02-18",
  lastWeek: [0, 0, 1, 0, 1, 1, 1],
};

const initialState = {
  listOfHabits: [
    {
      name: "English Gramma",
      startDay: "2023-02-18",
      lastWeek: [1, 1, 1, 1, 1, 1, 0],
    },
    {
      name: "English Practice",
      startDay: "2023-02-20",
      lastWeek: [1, 1, 1, 1, 1],
    },
    {
      name: "Todays Work",
      startDay: "2023-02-15",
      lastWeek: [1, 1, 1, 1, 1, 1, 0, 1],
    },
    {
      name: "Reading",
      startDay: "2023-02-18",
      lastWeek: [0, 0, 1, 0, 1, 1, 0],
    },
  ],
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    newHabit: (state) => {
      state.listOfHabits.push(dD);
    },
    removeHabit: (state) => {
      state.listOfHabits.pop();
    },
  },
});

// Action creators are generated for each case reducer function
export const { newHabit, removeHabit } = counterSlice.actions;

export default counterSlice.reducer;
