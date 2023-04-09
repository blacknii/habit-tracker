import React from "react";
import styles from "./DashboardRightHabit.module.css";
import { useDispatch } from "react-redux";
import { completionsSwitch, removeHabit } from "../../../redux/habits";

function DashboardRightHabit(props) {
  const dispatch = useDispatch();
  const lastIndex = props.lastWeek.length - 1;
  let todaysTask = props.lastWeek[lastIndex];
  const activeDays = props.activeDays;
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
      <p>Inactive on Sunday</p>
    </div>
  );

  let today = new Date();
  let dayOfTheWeek = today.getDay() ? today.getDay() : 7;

  // console.log(dayOfTheWeek);
  // console.log(activeDays);
  // console.log(!activeDays.includes(dayOfTheWeek));

  todaysTask = !activeDays.includes(dayOfTheWeek) ? 2 : todaysTask;

  return (
    <div className={styles.container}>
      <div className={styles.symbol}>{todaysTask === 2 ? "⚪" : "🔵"}</div>
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
          <button
            className={styles["delete"]}
            onClick={() => dispatch(removeHabit(props.name))}
          >
            x
          </button>
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
