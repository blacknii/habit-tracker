import { createSlice } from "@reduxjs/toolkit";

const dD = {
  name: "Dummy",
  startDay: "2023-02-18",
  lastWeek: [0, 0, 1, 0, 1, 1, 1],
};

const initialState = {
  stateOfTheWeek: 12,
  listOfHabits: [
    {
      name: "English Gramma",
      startDay: "2023-02-18",
      activeDays: [1, 2, 3, 4, 5, 6, 7],
      lastWeek: [1, 1, 1, 1, 1, 1, 0],
    },
    {
      name: "English Practice",
      startDay: "2023-02-20",
      activeDays: [1, 2, 3, 4, 5],
      lastWeek: [1, 1, 1, 1, 1],
    },
    {
      name: "Todays Work",
      startDay: "2023-02-15",
      activeDays: [1, 4, 5, 6, 7],
      lastWeek: [1, 1, 1, 1, 1, 1, 0, 1],
    },
    {
      name: "Reading",
      startDay: "2023-02-18",
      activeDays: [1, 2, 3, 4, 5, 6, 7],
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
    completionsSwitch: (state, action) => {
      state.listOfHabits.map((habbit) => {
        console.log(habbit.lastWeek.length);
        if (
          habbit.name === action.payload[0] &&
          habbit.lastWeek.length - 1 >= action.payload[1]
        )
          habbit.lastWeek[action.payload[1]]
            ? (habbit.lastWeek[action.payload[1]] = 0)
            : (habbit.lastWeek[action.payload[1]] = 1);
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { newHabit, removeHabit, completionsSwitch } =
  counterSlice.actions;

export default counterSlice.reducer;
