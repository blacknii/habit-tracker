import React from "react";
import styles from "./DasboardLeftSelector.module.css";
import { useDispatch, useSelector } from "react-redux";
import { datetypeChanger } from "../../../redux/habits";
import { modalSwitch } from "../../../redux/newHabit";

function DasboardLeftSelector() {
  const dispatch = useDispatch();
  const State = useSelector((state) => state.habits);
  const type = State.timePeriod.type;
  console.log(type);
  return (
    <div className={styles.container}>
      <ul className={styles["date-range-selector"]}>
        <li
          className={
            type == "Week" ? styles["button-picked"] : styles["button"]
          }
          onClick={() => dispatch(datetypeChanger("Week"))}
        >
          Week
        </li>
        <li
          className={
            type == "Month" ? styles["button-picked"] : styles["button"]
          }
          onClick={() => dispatch(datetypeChanger("Month"))}
        >
          Month
        </li>
        <li
          className={
            type == "Year" ? styles["button-picked"] : styles["button"]
          }
          onClick={() => dispatch(datetypeChanger("Year"))}
        >
          Year
        </li>
        <li
          className={
            type == "AllTime" ? styles["button-picked"] : styles["button"]
          }
          onClick={() => dispatch(datetypeChanger("AllTime"))}
        >
          All Time
        </li>
      </ul>
      <button onClick={() => dispatch(modalSwitch(true))}>+ Add Habbit</button>
    </div>
  );
}

export default DasboardLeftSelector;
