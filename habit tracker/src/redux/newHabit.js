import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalActive: false,
  habitName: "",
  habitType: true,
  weeklyFrequency: [false, false, false, false, false, false, false],
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    modalSwitch: (state, action) => {
      state.isModalActive = action.payload;
      console.log(action.payload);
    },
    nameChanger: (state, action) => {
      state.habitName = action.payload;
      console.log(action.payload);
    },
    typeChanger: (state, action) => {
      state.habitType = action.payload;
      console.log(action.payload);
    },
    frequencyChanger: (state, action) => {
      state.weeklyFrequency[action.payload] =
        !state.weeklyFrequency[action.payload];
      console.log(action.payload);
    },
    weekDaysChanger: (state) => {
      const weekDays = [true, true, true, true, true, false, false];
      const empty = [false, false, false, false, false, false, false];
      if (JSON.stringify(state.weeklyFrequency) == JSON.stringify(weekDays)) {
        state.weeklyFrequency = empty;
      } else {
        state.weeklyFrequency = weekDays;
      }
    },
    everyDayChanger: (state) => {
      const allDays = [true, true, true, true, true, true, true];
      const empty = [false, false, false, false, false, false, false];
      if (JSON.stringify(state.weeklyFrequency) == JSON.stringify(allDays)) {
        state.weeklyFrequency = empty;
      } else {
        state.weeklyFrequency = allDays;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  nameChanger,
  typeChanger,
  frequencyChanger,
  weekDaysChanger,
  everyDayChanger,
  modalSwitch,
} = counterSlice.actions;
export default counterSlice.reducer;
