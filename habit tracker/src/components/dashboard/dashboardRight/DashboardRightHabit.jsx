import React from "react";
import styles from "./DashboardRightHabit.module.css";
import { useDispatch } from "react-redux";
import { completionsSwitch, removeHabit } from "../../../redux/habits";

function DashboardRightHabit(props) {
  const dispatch = useDispatch();
  const lastIndex = props.lastWeek.length - 1 - props.timeIndex;
  let todaysTask = props.lastWeek[lastIndex];
  const activeDays = props.activeDays;
  const dayNames = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  let today = new Date();
  let dayOfTheWeek = today.getDay() ? today.getDay() : 7;
  dayOfTheWeek = ((dayOfTheWeek - 1 - props.timeIndex) % 7) + 1;
  while (dayOfTheWeek < 1) {
    dayOfTheWeek += 7;
  }
  todaysTask = !activeDays.includes(dayOfTheWeek) ? 2 : todaysTask;

  const uncompletedTask = (
    <div className={styles.submit}>
      <button
        className={styles["mark-complete"]}
        onClick={() => dispatch(completionsSwitch([props.name, lastIndex]))}
      >
        Mark Complete
      </button>
    </div>
  );

  const completedTask = (
    <div className={styles.submit}>
      <p className={styles["color-white"]}>✅Completed</p>
      <button
        className={styles["completed-button"]}
        onClick={() => dispatch(completionsSwitch([props.name, lastIndex]))}
      >
        Undo
      </button>
    </div>
  );

  const InactiveTask = (
    <div className={styles.submit}>
      <p>Inactive on {dayNames[dayOfTheWeek - 1]}</p>
    </div>
  );
  let streak = 0;

  const reversedArray = props.lastWeek
    .slice(0, props.lastWeek.length - 1)
    .reverse();
  function countOnes(array) {
    let currentDay = dayOfTheWeek - 1;
    let count = 0;
    for (let i = 0; i < array.length; i++) {
      if (activeDays.includes(currentDay)) {
        if (array[i] === 0) {
          break;
        }
        if (array[i] === 1) {
          count++;
        }
      }
      currentDay--;
      if (currentDay === 0) currentDay = 7;
    }
    return count + todaysTask;
  }
  const strike = countOnes(reversedArray);

  return (
    <div className={styles.container}>
      <div className={styles.symbol}>
        {props.habitType
          ? todaysTask === 2
            ? "⚪"
            : "🔵"
          : todaysTask === 2
          ? "✖"
          : "❎"}
      </div>
      <div
        className={
          todaysTask === 1
            ? styles["highlight-active"]
            : todaysTask === 2
            ? styles["highlight-inactive"]
            : styles.highlight
        }
      ></div>
      <div
        className={
          todaysTask === 1
            ? styles["right-active"]
            : todaysTask === 2
            ? styles["right-inactive"]
            : styles.right
        }
      >
        <div className={styles["delete-button"]}>
          <h2 className={styles["habbit-name"]}>{props.name}</h2>
          <div className={styles.flex}>
            <p>
              {strike}
              🔥
            </p>
            <button
              className={styles["delete"]}
              onClick={() => dispatch(removeHabit(props.name))}
            >
              x
            </button>
          </div>
        </div>

        {/* {todaysTask ? completedTask : uncompletedTask} */}
        {todaysTask === 0 && uncompletedTask}
        {todaysTask === 1 && completedTask}
        {todaysTask === 2 && InactiveTask}
      </div>
    </div>
  );
}

export default DashboardRightHabit;
