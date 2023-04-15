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
import ChevronLeft from "../../UI/icons/ChevronLeft";
import ChevronRight from "../../UI/icons/ChevronRight";
import Moon from "../../UI/icons/Moon";

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

  const currentDate = new Date();
  const options = { weekday: "short", month: "short", day: "numeric" };
  const targetDate = new Date(
    currentDate.setDate(currentDate.getDate() - timeIndex)
  );
  const formattedDate = targetDate.toLocaleDateString("en-US", options);

  return (
    <div className={styles.container}>
      <div className={styles.day}>
        <h2 className={styles.today}>{formattedDate}</h2>
        <div className={styles["day-and-buttons"]}>
          {timeIndex > 0 && (
            <p className={styles.skip} onClick={() => setTimeIndex(0)}>
              Today
            </p>
          )}
          <div>
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
              <ChevronLeft />
            </button>
            <button
              onClick={() => (timeIndex ? setTimeIndex(timeIndex - 1) : null)}
              className={timeIndex ? styles.button : styles["button-unactive"]}
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
      {bedtimeMessage === "Add Your Bedtime" && (
        <button
          className={styles.bedtime}
          onClick={() => dispatch(setBedtimeModal(true))}
        >
          {<Moon />} Add Your Bedtime
        </button>
      )}

      <div className={styles.habbits}>
        {listOfHabits.length === 0 ? (
          <p className={styles["empty-habits-message"]}>
            You haven't added any habits yet
          </p>
        ) : (
          listOfHabits.map((habbit) => {
            if (habbit.lastWeek.length >= timeIndex) {
              return (
                <DashboardRightHabit
                  key={habbit.name}
                  name={habbit.name}
                  startDay={habbit.startDay}
                  lastWeek={habbit.lastWeek}
                  activeDays={habbit.activeDays}
                  habitType={habbit.habitType}
                  timeIndex={timeIndex}
                />
              );
            }
          })
        )}
      </div>
    </div>
  );
}

export default DashboardRight;
