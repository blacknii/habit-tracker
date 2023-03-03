import React from 'react';
import styles from './DashboardLeftHabit.module.css';
import { useDispatch } from "react-redux";
import {completionsSwitch} from "../../../redux/habits"

function DashboardLeftHabit(props) {
  const reversedArr = [...props.lastWeek].reverse()
  const dispatch = useDispatch();
  const lastIndex = props.lastWeek.length - 1


  return <div className={styles.week}>
    <div className={styles.days}>
    <p>{props.name}</p>
    </div>
    <div className={styles.days}>
    <button className={styles.day} onClick={() => dispatch(completionsSwitch([props.name, lastIndex - props.dayOfTheWeek + 1]))}>{props.dayOfTheWeek-1 >= 0 ? reversedArr[props.dayOfTheWeek-1] : "X"}</button>
    <button className={styles.day} onClick={() => dispatch(completionsSwitch([props.name, lastIndex - props.dayOfTheWeek + 2]))}>{props.dayOfTheWeek-2 >= 0 ? reversedArr[props.dayOfTheWeek-2] : "X"}</button>
    <button className={styles.day} onClick={() => dispatch(completionsSwitch([props.name, lastIndex - props.dayOfTheWeek + 3]))}>{props.dayOfTheWeek-3 >= 0 ? reversedArr[props.dayOfTheWeek-3] : "X"}</button>
    <button className={styles.day} onClick={() => dispatch(completionsSwitch([props.name, lastIndex - props.dayOfTheWeek + 4]))}>{props.dayOfTheWeek-4 >= 0 ? reversedArr[props.dayOfTheWeek-4] : "X"}</button>
    <button className={styles.day} onClick={() => dispatch(completionsSwitch([props.name, lastIndex - props.dayOfTheWeek + 5]))}>{props.dayOfTheWeek-5 >= 0 ? reversedArr[props.dayOfTheWeek-5] : "X"}</button>
    <button className={styles.day} onClick={() => dispatch(completionsSwitch([props.name, lastIndex - props.dayOfTheWeek + 6]))}>{props.dayOfTheWeek-6 >= 0 ? reversedArr[props.dayOfTheWeek-6] : "X"}</button>
    <button className={styles.day} onClick={() => dispatch(completionsSwitch([props.name, lastIndex - props.dayOfTheWeek + 7]))}>{props.dayOfTheWeek-7 >= 0 ? reversedArr[props.dayOfTheWeek-7] : "X"}</button>
    </div>
    <div className={styles["row-end"]}>
    <p>3/{props.dayOfTheWeek}</p>
    </div>
  </div>
};

export default DashboardLeftHabit;