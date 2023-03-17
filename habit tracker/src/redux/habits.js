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
      state.listOfHabits.map((habbit) => {
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
      const timeIndex = state.timePeriod.timeIndex;

      const today = new Date();

      const tempDate = new Date();

      const startOfTheWeek = new Date(
        tempDate.setDate(
          tempDate.getDate() -
            (tempDate.getDay() ? tempDate.getDay() - 1 : 6) -
            7 * timeIndex
        )
      );

      const endOfTheWeek = new Date(tempDate.setDate(tempDate.getDate() + 6));

      const startOfTheLastTheWeek = new Date(
        tempDate.setDate(tempDate.getDate() - 13)
      );

      const endOfTheLastTheWeek = new Date(
        tempDate.setDate(tempDate.getDate() + 6)
      );

      const monthDate = new Date();
      const month = monthDate.getMonth() - timeIndex;

      const startOfMonth = new Date(monthDate.getFullYear(), month, 1);
      const endOfMonth = new Date(monthDate.getFullYear(), month + 1, 0);

      const yearDate = new Date();
      const year = yearDate.getFullYear() - timeIndex;

      const startOfYear = new Date(year, 0, 1);
      const endOfYear = new Date(year, 12, 0);

      // console.log(state.timePeriod.timeIndex);
      // console.log(today);
      // console.log(startOfTheWeek);
      // console.log(endOfTheWeek);
      // console.log(startOfTheLastTheWeek);
      // console.log(endOfTheLastTheWeek);
      // console.log(startOfMonth);
      // console.log(endOfMonth);
      // console.log(startOfYear);
      // console.log(endOfYear);
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
