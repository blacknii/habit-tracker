import { createSlice } from "@reduxjs/toolkit";

const habbits =
  localStorage.getItem("listOfHabits") != null
    ? JSON.parse(localStorage.getItem("listOfHabits"))
    : [];

const dD = {
  name: "Dummy",
  startDay: "2023-02-18",
  activeDays: [1, 2, 3, 4, 5, 6, 7],
  lastWeek: [0, 0, 1, 0, 1, 1, 1],
};

const time = {
  timeIndex: 0,
  today: 0,
  chosenWeek: [],
  chosenWeekBefore: [],
  chosenMonth: [],
  chosenMonthBefore: [],
  chosenYear: [],
  chosenYearBefore: [],
  allTime: [],
};

const initialState = {
  listOfHabits: habbits,
  timePeriod: time,
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
      // console.log(action.payload);
      state.listOfHabits.map((habbit) => {
        // console.log(habbit.lastWeek.length);
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
    fillingUpEmptyDays: (state) => {
      state.listOfHabits.map((item) => {
        let date1 = new Date(item.startDay);
        let date2 = new Date();
        // To calculate the time difference of two dates
        let Difference_In_Time = date2.getTime() - date1.getTime();

        // To calculate the no. of days between two dates
        let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

        if (item.lastWeek.length < Difference_In_Days)
          for (
            let index = 0;
            index < Difference_In_Days - item.lastWeek.length;
            index++
          ) {
            item.lastWeek.push(0);
          }
        return item;
      });

      localStorage.setItem(
        "listOfHabits",
        JSON.stringify(state.listOfHabits.map((item) => item))
      );
    },
    dateCompletion: (state) => {
      console.log(state.timePeriod.timeIndex);
    },
    dateIndexChanger: (state, action) => {
      state.timePeriod.timeIndex += action.payload;
      console.log(state.timePeriod.timeIndex);
    },
  },
});

export const {
  newHabit,
  removeHabit,
  completionsSwitch,
  fillingUpEmptyDays,
  dateCompletion,
  dateIndexChanger,
} = counterSlice.actions;

export default counterSlice.reducer;
