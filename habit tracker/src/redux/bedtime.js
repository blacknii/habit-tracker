import { createSlice } from "@reduxjs/toolkit";

const bedtime =
  localStorage.getItem("bedtime") != null
    ? localStorage.getItem("bedtime")
    : null;

const initialState = {
  bedtime: bedtime,
  bedtimeMessage: "Add Your Bedtime",
  isModalVisible: true,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setBedtime: (state, action) => {
      if (action.payload === 0) {
        localStorage.removeItem("bedtime");
        state.bedtime = null;
      } else {
        state.bedtime = action.payload;
        localStorage.setItem("bedtime", state.bedtime);
      }
    },
    setBedtimeMessage: (state) => {
      if (state.bedtime === null) {
        state.bedtimeMessage = "Add Your Bedtime";
      } else {
        const inputString = localStorage.getItem("bedtime");

        const [timeStr, period] = inputString.split(" ");
        let [hours, minutes] = timeStr.split(":");
        // Convert hours to 24-hour format if necessary
        if (period === "PM" && hours !== "12") {
          hours = parseInt(hours, 10) + 12;
        } else if (period === "AM" && hours === "12") {
          hours = "00";
        }
        // Create a new Date object for the bedtime
        const bedtime = new Date();
        bedtime.setHours(parseInt(hours, 10));
        bedtime.setMinutes(parseInt(minutes, 10));
        // Get the current time
        const now = new Date();
        // Calculate the difference in hours and minutes
        const diffMs = bedtime.getTime() - now.getTime();
        const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
        const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        // Check if it's time to sleep
        if (diffHrs <= 0 && diffMins <= 0) {
          state.bedtimeMessage = "Time to sleep";
        } else {
          // Format the result into the desired string format
          const result = `${diffHrs} hrs ${diffMins} mins till bedtime`;
          state.bedtimeMessage = result;
        }
      }
    },
    setBedtimeModal: (state, action) => {
      state.isModalVisible = action.payload;
    },
  },
});

export const { setBedtime, setBedtimeMessage, setBedtimeModal } =
  counterSlice.actions;

export default counterSlice.reducer;
