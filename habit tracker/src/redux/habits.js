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
    test: (state) => {
      state.listOfHabits.map((item) => {
        let date1 = new Date(item.startDay);
        let date2 = new Date("2023-03-08");
        // To calculate the time difference of two dates
        let Difference_In_Time = date2.getTime() - date1.getTime();

        // To calculate the no. of days between two dates
        let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

        console.log(Difference_In_Days);

        console.log(item.lastWeek.length);
        if (item.lastWeek.length < Difference_In_Days)
          for (
            let index = 0;
            index < Difference_In_Days - item.lastWeek.length;
            index++
          ) {
            item.lastWeek.push(0);
            console.log("Test");
          }

        // console.log(item.startDay);
        return item;
      });

      localStorage.setItem(
        "listOfHabits",
        JSON.stringify(state.listOfHabits.map((item) => item))
      );
    },
  },
});

export const { newHabit, removeHabit, completionsSwitch, test } =
  counterSlice.actions;

export default counterSlice.reducer;
