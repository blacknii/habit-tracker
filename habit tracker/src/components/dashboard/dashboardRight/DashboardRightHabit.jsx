import React from "react";
import styles from "./DashboardRightHabit.module.css";
import { useDispatch } from "react-redux";
import { completionsSwitch } from "../../../redux/habits";

function DashboardRightHabit(props) {
  const dispatch = useDispatch();
  const lastIndex = props.lastWeek.length - 1;
  const todaysTask = props.lastWeek[lastIndex];
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

  return (
    <div className={styles.container}>
      <p>{props.name}</p>
      {todaysTask ? completedTask : uncompletedTask}
    </div>
  );
}

export default DashboardRightHabit;
