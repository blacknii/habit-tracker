import React, { useEffect } from "react";
import styles from "./DashboardRight.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  newHabit,
  removeHabit,
  fillingUpEmptyDays,
  dateCompletion,
  dateIndexChanger,
} from "../../../redux/habits";
import { setBedtimeMessage } from "../../../redux/bedtime";
import DashboardRightHabit from "./DashboardRightHabit";

function DashboardRight() {
  const { listOfHabits } = useSelector((state) => state.habits);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fillingUpEmptyDays());
    dispatch(dateCompletion());
    dispatch(setBedtimeMessage());
  });

  return (
    <div className={styles.container}>
      <div className={styles.day}>
        <h2 className={styles.today}>Thu, Feb 23</h2>
        <div>
          <button className={styles.button}>◀</button>
          <button className={styles["button-unactive"]}>▶</button>
        </div>
      </div>
      <button className={styles.bedtime}>🌜 Add Your Bedtime</button>
      <div className={styles.habbits}>
        {listOfHabits.map((habbit) => {
          return (
            <DashboardRightHabit
              key={habbit.name}
              name={habbit.name}
              startDay={habbit.startDay}
              lastWeek={habbit.lastWeek}
              activeDays={habbit.activeDays}
            />
          );
        })}
      </div>
    </div>
  );
}

export default DashboardRight;
