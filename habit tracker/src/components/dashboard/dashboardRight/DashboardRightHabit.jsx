import React from "react";
import styles from "./DashboardRightHabit.module.css";
import { useDispatch } from "react-redux";
import { completionsSwitch } from "../../../redux/habits";

function DashboardRightHabit(props) {
  const dispatch = useDispatch();
  const lastIndex = props.lastWeek.length - 1;
  let todaysTask = props.lastWeek[lastIndex];
  const activeDays = props.activeDays;
  const uncompletedTask = (
    <div className={styles.submit}>
      <button
        onClick={() => dispatch(completionsSwitch([props.name, lastIndex]))}
      >
        Mark Complete
      </button>
    </div>
  );
  const completedTask = (
    <div className={styles.submit}>
      <p>✅Completed</p>
      <button
        onClick={() => dispatch(completionsSwitch([props.name, lastIndex]))}
      >
        Undo
      </button>
    </div>
  );
  const InactiveTask = (
    <div className={styles.submit}>
      <p>Inactive</p>
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
      <p>{props.name}</p>
      {/* {todaysTask ? completedTask : uncompletedTask} */}
      {todaysTask === 0 && uncompletedTask}
      {todaysTask === 1 && completedTask}
      {todaysTask === 2 && InactiveTask}
    </div>
  );
}

export default DashboardRightHabit;
