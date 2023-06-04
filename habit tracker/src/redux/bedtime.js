import { createSlice } from "@reduxjs/toolkit";

const DEFAULT_BEDTIME_MESSAGE = "Add Your Bedtime";

const bedtime = localStorage.getItem("bedtime");

const initialState = {
  bedtime,
  bedtimeMessage: DEFAULT_BEDTIME_MESSAGE,
  isModalVisible: false,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setBedtime: (state, action) => {
      const newBedtime = action.payload;

      if (newBedtime === 0) {
        localStorage.removeItem("bedtime");
        state.bedtime = null;
      } else {
        state.bedtime = newBedtime;
        localStorage.setItem("bedtime", newBedtime);
      }
    },
    setBedtimeMessage: (state) => {
      if (state.bedtime === null) {
        state.bedtimeMessage = DEFAULT_BEDTIME_MESSAGE;
      } else {
        state.bedtimeMessage = calculateBedtimeMessage();
      }
    },
    setBedtimeModal: (state, action) => {
      state.isModalVisible = action.payload;
    },
  },
});

function calculateBedtimeMessage() {
  const inputString = localStorage.getItem("bedtime");

  let [timeStr, period] = inputString.split(" ");
  let [hours, minutes] = timeStr.split(":");

  // Convert hours to 24-hour format if necessary
  if (period === "PM" && hours !== "12") {
    hours = parseInt(hours, 10) + 12;
  } else if (period === "AM" && hours === "12") {
    hours = "00";
  }

  const bedtime = new Date();
  bedtime.setHours(parseInt(hours, 10));
  bedtime.setMinutes(parseInt(minutes, 10));

  const now = new Date();

  const diffMs = bedtime.getTime() - now.getTime();
  const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  if (diffHrs <= 0 && diffMins <= 0) {
    return "Time to sleep";
  }

  return `${diffHrs} hrs ${diffMins} mins till bedtime`;
}

export const { setBedtime, setBedtimeMessage, setBedtimeModal } =
  counterSlice.actions;

export default counterSlice.reducer;
