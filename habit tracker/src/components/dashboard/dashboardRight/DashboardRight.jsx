import React, { useEffect, useState } from "react";
import styles from "./DashboardRight.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  newHabit,
  removeHabit,
  fillingUpEmptyDays,
  dateCompletion,
  dateIndexChanger,
} from "../../../redux/habits";
import { setBedtimeModal } from "../../../redux/bedtime";
import { setBedtimeMessage } from "../../../redux/bedtime";
import DashboardRightHabit from "./DashboardRightHabit";

function DashboardRight() {
  const { listOfHabits } = useSelector((state) => state.habits);
  const { bedtimeMessage } = useSelector((state) => state.bedtime);
  const dispatch = useDispatch();

  let maxTimeIndex = 0;
  listOfHabits.forEach((element) => {
    if (element.lastWeek.length > maxTimeIndex)
      maxTimeIndex = element.lastWeek.length;
  });

  const [timeIndex, setTimeIndex] = useState(0);

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
          {timeIndex > 0 && <p onClick={() => setTimeIndex(0)}>Today</p>}
          <button
            onClick={() =>
              timeIndex < maxTimeIndex ? setTimeIndex(timeIndex + 1) : null
            }
            className={
              timeIndex < maxTimeIndex
                ? styles.button
                : styles["button-unactive"]
            }
          >
            ◀
          </button>
          <button
            onClick={() => (timeIndex ? setTimeIndex(timeIndex - 1) : null)}
            className={timeIndex ? styles.button : styles["button-unactive"]}
          >
            ▶
          </button>
        </div>
      </div>
      {bedtimeMessage === "Add Your Bedtime" && (
        <button
          className={styles.bedtime}
          onClick={() => dispatch(setBedtimeModal(true))}
        >
          🌜 Add Your Bedtime
        </button>
      )}

      <div className={styles.habbits}>
        {listOfHabits.map((habbit) => {
          if (habbit.lastWeek.length >= timeIndex) {
            return (
              <DashboardRightHabit
                key={habbit.name}
                name={habbit.name}
                startDay={habbit.startDay}
                lastWeek={habbit.lastWeek}
                activeDays={habbit.activeDays}
                timeIndex={timeIndex}
              />
            );
          }
        })}
      </div>
    </div>
  );
}

export default DashboardRight;
