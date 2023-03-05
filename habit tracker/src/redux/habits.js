import { createSlice } from "@reduxjs/toolkit";

const items =
  localStorage.getItem("listOfHabits") != null
    ? JSON.parse(localStorage.getItem("listOfHabits"))
    : [
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
      ];

const dD = {
  name: "Dummy",
  startDay: "2023-02-18",
  activeDays: [1, 2, 3, 4, 5, 6, 7],
  lastWeek: [0, 0, 1, 0, 1, 1, 1],
};

const initialState = {
  listOfHabits: items,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    newHabit: (state) => {
      state.listOfHabits.push(dD);
      localStorage.setItem(
        "listOfHabits",
        JSON.stringify(state.listOfHabits.map((item) => item))
      );
    },
    removeHabit: (state) => {
      state.listOfHabits.pop();
      localStorage.setItem(
        "listOfHabits",
        JSON.stringify(state.listOfHabits.map((item) => item))
      );
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
      localStorage.setItem(
        "listOfHabits",
        JSON.stringify(state.listOfHabits.map((item) => item))
      );
    },
  },
});

export const { newHabit, removeHabit, completionsSwitch } =
  counterSlice.actions;

export default counterSlice.reducer;
