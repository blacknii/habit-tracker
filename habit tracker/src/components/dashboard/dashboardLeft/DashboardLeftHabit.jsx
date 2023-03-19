import React from "react";
import styles from "./DashboardLeftHabit.module.css";
import { useDispatch } from "react-redux";
import { completionsSwitch } from "../../../redux/habits";
import ProgressBar from "../../UI/ProgressBar";

function DashboardLeftHabit(props) {
  let reversedArr = props.lastWeek
    .slice(-props.dayOfTheWeek - 7 * props.whichWeek)
    .reverse();
  const dispatch = useDispatch();
  const lastIndex = props.lastWeek.length - 1;
  let numbersOfDays = props.dayOfTheWeek;
  const daysArr = [1, 2, 3, 4, 5, 6, 7];

  let allCurrentDays = 0;
  let allCurrentDoneDays = 0;
  if (props.whichWeek > 0) {
    numbersOfDays = 7;
    reversedArr = props.lastWeek
      .slice(
        -props.dayOfTheWeek - 7 * props.whichWeek,
        -props.dayOfTheWeek - 7 * (props.whichWeek - 1)
      )
      .reverse();
  }

  const number = (day) => {
    if (props.whichWeek === 0) {
      return lastIndex - numbersOfDays + day;
    } else props.whichWeek > 1;
    {
      return (
        lastIndex -
        numbersOfDays +
        day -
        props.dayOfTheWeek -
        (props.whichWeek - 1) * 7
      );
    }
  };

  const checkBoxes = (
    <div className={styles.days}>
      {daysArr.map((day) => {
        if (!props.activeDays.includes(day)) {
          return <button key={day} className={styles["day-inactive"]}></button>;
        } else if (
          numbersOfDays - day >= 0 &&
          reversedArr[numbersOfDays - day] === 1
        ) {
          allCurrentDays++;
          allCurrentDoneDays++;
          return (
            <button
              key={day}
              className={styles["day-done"]}
              onClick={() =>
                dispatch(completionsSwitch([props.name, number(day)]))
              }
            ></button>
          );
        } else if (
          numbersOfDays - day >= 0 &&
          reversedArr[numbersOfDays - day] === 0
        ) {
          allCurrentDays++;
          return (
            <button
              key={day}
              className={styles["day-not-done"]}
              onClick={() =>
                dispatch(completionsSwitch([props.name, number(day)]))
              }
            ></button>
          );
        } else if (numbersOfDays - day < 0) {
          return <button key={day} className={styles["day-waining"]}></button>;
        } else {
          return <button key={day} className={styles["day-inactive"]}></button>;
        }
      })}
    </div>
  );

  let weekProgress = (allCurrentDoneDays / allCurrentDays) * 100;
  if (allCurrentDays == 0 && allCurrentDoneDays == 0) weekProgress = 0;

  // console.log(props.completionPercentage);

  if (props.type === "Week") {
    return (
      <div className={styles.week}>
        <div className={styles.days}>
          <p>{props.name}</p>
        </div>
        {props.showProgressBar ? (
          <ProgressBar value={weekProgress} key={props.day} />
        ) : (
          checkBoxes
        )}
        <div className={styles["row-end"]}>
          <p>
            {allCurrentDoneDays}/{allCurrentDays}
          </p>
        </div>
      </div>
    );
  } else if (props.type === "Month") {
    return (
      <div className={styles.week}>
        <div className={styles.days}>
          <p>{props.name}</p>
        </div>
        <ProgressBar value={props.completionPercentage[2]} key={props.day} />
        <div className={styles["row-end"]}>
          <p>
            {props.completionPercentage[1]}/{props.completionPercentage[0]}
          </p>
        </div>
      </div>
    );
  } else if (props.type === "Year") {
    return (
      <div className={styles.week}>
        <div className={styles.days}>
          <p>{props.name}</p>
        </div>
        <ProgressBar value={props.completionPercentage[2]} key={props.day} />
        <div className={styles["row-end"]}>
          <p>
            {props.completionPercentage[1]}/{props.completionPercentage[0]}
          </p>
        </div>
      </div>
    );
  } else if (props.type === "AllTime") {
    return (
      <div className={styles.week}>
        <div className={styles.days}>
          <p>{props.name}</p>
        </div>
        <ProgressBar value={props.completionPercentage[2]} key={props.day} />
        <div className={styles["row-end"]}>
          <p>
            {props.completionPercentage[1]}/{props.completionPercentage[0]}
          </p>
        </div>
      </div>
    );
  }
}

export default DashboardLeftHabit;
