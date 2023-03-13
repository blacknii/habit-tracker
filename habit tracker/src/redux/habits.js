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
      const whichWeek = state.timePeriod.timeIndex;
      const monthDate1 = new Date();
      const monthIndex1 = monthDate1.getMonth();
      const year1 = monthDate1.getFullYear();
      const types = ["Week", "Month", "Year", "AllTime"];
      const year = year1;
      const type = types[0];
      const timeRange = ["2023-03-01", "2023-03-12"];

      const options = { weekday: "short", month: "short", day: "numeric" };
      const today = new Date();
      const today2 = new Date();
      const startOfWeek = new Date(
        today.setDate(
          today.getDate() -
            (today.getDay() ? today.getDay() : 6) -
            7 * whichWeek
        )
      );
      const endOfWeek = new Date(
        today.setDate(today.getDate() - today.getDay() + 7)
      );
      const startOfTheLastWeek = new Date(
        today2.setDate(
          today2.getDate() -
            (today.getDay() ? today.getDay() : 6) -
            7 -
            7 * whichWeek
        )
      );
      const endOfTheLastWeek = new Date(
        today2.setDate(today2.getDate() - today2.getDay() + 7)
      );
      console.log(startOfWeek);
      console.log(endOfWeek);
      console.log(startOfTheLastWeek);
      console.log(endOfTheLastWeek);
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
