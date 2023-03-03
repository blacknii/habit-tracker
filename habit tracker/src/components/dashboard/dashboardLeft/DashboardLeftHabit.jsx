import React from "react";
import styles from "./DashboardLeftHabit.module.css";
import { useDispatch } from "react-redux";
import { completionsSwitch } from "../../../redux/habits";

function DashboardLeftHabit(props) {
  const reversedArr = [...props.lastWeek].reverse();
  const dispatch = useDispatch();
  const lastIndex = props.lastWeek.length - 1;

  const daysArr = [1, 2, 3, 4, 5, 6, 7];

  return (
    <div className={styles.week}>
      <div className={styles.days}>
        <p>{props.name}</p>
      </div>
      <div className={styles.days}>
        {daysArr.map((day) => {
          if (
            props.dayOfTheWeek - day >= 0 &&
            reversedArr[props.dayOfTheWeek - day] === 1
          ) {
            return (
              <button
                className={styles["day-done"]}
                onClick={() =>
                  dispatch(
                    completionsSwitch([
                      props.name,
                      lastIndex - props.dayOfTheWeek + day,
                    ])
                  )
                }
              ></button>
            );
          } else if (
            props.dayOfTheWeek - day >= 0 &&
            reversedArr[props.dayOfTheWeek - day] === 0
          ) {
            return (
              <button
                className={styles["day-not-done"]}
                onClick={() =>
                  dispatch(
                    completionsSwitch([
                      props.name,
                      lastIndex - props.dayOfTheWeek + day,
                    ])
                  )
                }
              ></button>
            );
          } else {
            return <button className={styles["day-waining"]}></button>;
          }
        })}
      </div>
      <div className={styles["row-end"]}>
        <p>3/{props.dayOfTheWeek}</p>
      </div>
    </div>
  );
}

export default DashboardLeftHabit;
