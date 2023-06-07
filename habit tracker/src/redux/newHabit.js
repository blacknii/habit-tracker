import { createSlice } from "@reduxjs/toolkit";

const allDays = [true, true, true, true, true, true, true];
const weekDays = [true, true, true, true, true, false, false];
const empty = [false, false, false, false, false, false, false];

const initialState = {
  isModalActive: false,
  habitName: "",
  habitType: true,
  weeklyFrequency: empty,
};

export const newHabbitSlice = createSlice({
  name: "newHabbit",
  initialState,
  reducers: {
    modalSwitch: (state, action) => {
      state.isModalActive = action.payload;
    },
    nameChanger: (state, action) => {
      state.habitName = action.payload;
    },
    typeChanger: (state, action) => {
      state.habitType = action.payload;
    },
    frequencyChanger: (state, action) => {
      state.weeklyFrequency[action.payload] =
        !state.weeklyFrequency[action.payload];
    },
    clear: (state) => {
      state.weeklyFrequency = empty;
      state.habitName = "";
      state.habitType = true;
    },
    weekDaysChanger: (state) => {
      if (arraysAreEqual(state.weeklyFrequency, weekDays)) {
        state.weeklyFrequency = empty;
      } else {
        state.weeklyFrequency = weekDays;
      }
    },
    everyDayChanger: (state) => {
      if (arraysAreEqual(state.weeklyFrequency, allDays)) {
        state.weeklyFrequency = empty;
      } else {
        state.weeklyFrequency = allDays;
      }
    },
  },
});

function arraysAreEqual(a, b) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

export const {
  nameChanger,
  typeChanger,
  frequencyChanger,
  weekDaysChanger,
  everyDayChanger,
  modalSwitch,
  clear,
} = newHabbitSlice.actions;
export default newHabbitSlice.reducer;
