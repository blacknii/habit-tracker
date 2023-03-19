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
  type: "Week",
  timeIndex: 0,
  today: null,
  chosenWeek: ["2023-02-18", "2023-02-18"],
  chosenWeekBefore: ["2023-02-18", "2023-02-18"],
  chosenMonth: ["2023-02-18", "2023-02-18"],
  chosenMonthBefore: ["2023-02-18", "2023-02-18"],
  chosenYear: ["2023-02-18", "2023-02-18"],
  chosenYearBefore: ["2023-02-18", "2023-02-18"],
  allTime: ["2023-02-18", "2023-02-18"],
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
      let oldestDate = new Date(state.listOfHabits[0].startDay);
      state.listOfHabits.forEach((item) => {
        let itemDate = new Date(item.startDay);
        let today = new Date();

        if (itemDate - oldestDate < 0) {
          oldestDate = itemDate;
        }

        // To calculate the time difference of two dates
        let Difference_In_Time = today.getTime() - itemDate.getTime();

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
      });

      state.timePeriod.allTime[0] = oldestDate.toISOString().substring(0, 10);

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

      const startOfTheMonth = new Date(monthDate.getFullYear(), month, 1);
      startOfTheMonth.setDate(startOfTheMonth.getDate() + 1);
      const endOfTheMonth = new Date(monthDate.getFullYear(), month + 1, 0);
      endOfTheMonth.setDate(endOfTheMonth.getDate() + 1);

      const startOfTheLastMonth = new Date(
        monthDate.getFullYear(),
        month - 1,
        1
      );
      startOfTheLastMonth.setDate(startOfTheLastMonth.getDate() + 1);
      const endOfTheLastMonth = new Date(monthDate.getFullYear(), month, 0);
      endOfTheLastMonth.setDate(endOfTheLastMonth.getDate() + 1);

      const yearDate = new Date();
      const year = yearDate.getFullYear() - timeIndex;

      const startOfTheYear = new Date(year, 0, 1);
      startOfTheYear.setDate(startOfTheYear.getDate() + 1);
      const endOfTheYear = new Date(year, 12, 0);
      endOfTheYear.setDate(endOfTheYear.getDate() + 1);
      const startOfTheLastYear = new Date(year - 1, 0, 1);
      startOfTheLastYear.setDate(startOfTheLastYear.getDate() + 1);
      const endOfTheLastYear = new Date(year - 1, 12, 0);
      endOfTheLastYear.setDate(endOfTheLastYear.getDate() + 1);

      state.timePeriod.today = today.toISOString().substring(0, 10);
      state.timePeriod.chosenWeek[0] = startOfTheWeek
        .toISOString()
        .substring(0, 10);
      state.timePeriod.chosenWeek[1] = endOfTheWeek
        .toISOString()
        .substring(0, 10);
      state.timePeriod.chosenWeekBefore[0] = startOfTheLastTheWeek
        .toISOString()
        .substring(0, 10);
      state.timePeriod.chosenWeekBefore[1] = endOfTheLastTheWeek
        .toISOString()
        .substring(0, 10);
      state.timePeriod.chosenMonth[0] = startOfTheMonth
        .toISOString()
        .substring(0, 10);
      state.timePeriod.chosenMonth[1] = endOfTheMonth
        .toISOString()
        .substring(0, 10);
      state.timePeriod.chosenMonthBefore[0] = startOfTheLastMonth
        .toISOString()
        .substring(0, 10);
      state.timePeriod.chosenMonthBefore[1] = endOfTheLastMonth
        .toISOString()
        .substring(0, 10);
      state.timePeriod.chosenYear[0] = startOfTheYear
        .toISOString()
        .substring(0, 10);
      state.timePeriod.chosenYear[1] = endOfTheYear
        .toISOString()
        .substring(0, 10);
      state.timePeriod.chosenYearBefore[0] = startOfTheLastYear
        .toISOString()
        .substring(0, 10);
      state.timePeriod.chosenYearBefore[1] = endOfTheLastYear
        .toISOString()
        .substring(0, 10);
      state.timePeriod.allTime[1] = today.toISOString().substring(0, 10);
    },
    dateIndexChanger: (state, action) => {
      state.timePeriod.timeIndex += action.payload;
    },
    datetypeChanger: (state, action) => {
      state.timePeriod.timeIndex = 0;
      state.timePeriod.type = action.payload;
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
  datetypeChanger,
} = counterSlice.actions;

export default counterSlice.reducer;
