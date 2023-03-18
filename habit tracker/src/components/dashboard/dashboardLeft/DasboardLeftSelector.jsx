import React from "react";
import styles from "./DasboardLeftSelector.module.css";
import { useDispatch } from "react-redux";
import { datetypeChanger } from "../../../redux/habits";

function DasboardLeftSelector() {
  const dispatch = useDispatch();
  return (
    <div className={styles.container}>
      <ul className={styles["date-range-selector"]}>
        <button onClick={() => dispatch(datetypeChanger("Week"))}>Week</button>
        <button onClick={() => dispatch(datetypeChanger("Month"))}>
          Month
        </button>
        <button onClick={() => dispatch(datetypeChanger("Year"))}>Year</button>
        <button onClick={() => dispatch(datetypeChanger("AllTime"))}>
          All Time
        </button>
      </ul>
      <button>+ Add Habbit</button>
    </div>
  );
}

export default DasboardLeftSelector;
