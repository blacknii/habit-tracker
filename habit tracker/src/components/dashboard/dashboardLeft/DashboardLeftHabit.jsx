import React from "react";
import styles from "./DashboardLeftHabit.module.css";
import { useDispatch } from "react-redux";
import { completionsSwitch } from "../../../redux/habits";

function DashboardLeftHabit(props) {
  const reversedArr = [...props.lastWeek].reverse();
  const dispatch = useDispatch();
  const lastIndex = props.lastWeek.length - 1;

  const daysArr = [1, 2, 3, 4, 5, 6, 7];

  let allCurrentDays = 0;
  let allCurrentDoneDays = 0;
  // for (let i = 1; i < props.dayOfTheWeek + 1; i++) {
  //   console.log(i);
  //   if (props.activeDays.includes(i)) allCurrentDays++;
  // }

  return (
    <div className={styles.week}>
      <div className={styles.days}>
        <p>{props.name}</p>
      </div>
      <div className={styles.days}>
        {daysArr.map((day) => {
          if (!props.activeDays.includes(day)) {
            return (
              <button key={day} className={styles["day-inactive"]}></button>
            );
          } else if (
            props.dayOfTheWeek - day >= 0 &&
            reversedArr[props.dayOfTheWeek - day] === 1
          ) {
            allCurrentDays++;
            allCurrentDoneDays++;
            return (
              <button
                key={day}
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
            allCurrentDays++;
            return (
              <button
                key={day}
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
          } else if (props.dayOfTheWeek - day < 0) {
            return (
              <button key={day} className={styles["day-waining"]}></button>
            );
          } else {
            return (
              <button key={day} className={styles["day-inactive"]}></button>
            );
          }
        })}
      </div>
      <div className={styles["row-end"]}>
        <p>
          {allCurrentDoneDays}/{allCurrentDays}
        </p>
      </div>
    </div>
  );
}

export default DashboardLeftHabit;
