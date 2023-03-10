import React, { useState } from "react";
import styles from "./DasboardLeftWeek.module.css";
import DashboardLeftHabit from "./DashboardLeftHabit";
import { useDispatch, useSelector } from "react-redux";

function DasboardLeftWeek() {
  const { listOfHabits } = useSelector((state) => state.habits);
  const dispatch = useDispatch();

  let curr = new Date();
  let dayOfTheWeek = curr.getDay() ? curr.getDay() : 7;

  const [whichWeek, setWhichWeek] = useState(0);
  const [showProgressBar, setShowProgressBar] = useState(false);

  const options = { weekday: "short", month: "short", day: "numeric" };
  const today = new Date();
  const startOfWeek = new Date(
    today.setDate(today.getDate() - today.getDay() + 1 - 7 * whichWeek)
  );
  const endOfWeek = new Date(
    today.setDate(today.getDate() - today.getDay() + 7)
  );
  const startOfWeekFormatted = startOfWeek.toLocaleString("en-US", options);
  const endOfWeekFormatted = endOfWeek.toLocaleString("en-US", options);
  const weekRange = `${startOfWeekFormatted} - ${endOfWeekFormatted}`;

  const daysOfTheWeek = (
    <div className={styles.days}>
      <div className={styles.day}>Mon</div>
      <div className={styles.day}>Tue</div>
      <div className={styles.day}>Wen</div>
      <div className={styles.day}>Thu</div>
      <div className={styles.day}>Fri</div>
      <div className={styles.day}>Sat</div>
      <div className={styles.day}>Sun</div>
    </div>
  );

  return (
    <div className={styles.container}>
      <div className={styles["main-top"]}>
        <div>
          <button onClick={() => setWhichWeek(whichWeek + 1)}>◀</button>
          <button onClick={() => setWhichWeek(whichWeek - 1)}>▶</button>
        </div>
        <h2>{weekRange}</h2>
        <div>
          <button onClick={() => setShowProgressBar(false)}>1️⃣</button>
          <button onClick={() => setShowProgressBar(true)}>2️⃣</button>
        </div>
      </div>
      <div className={styles["overall-progress"]}>
        <p>progress bar</p>
        <div className={styles["overall-progress-percentage-comparison"]}>
          <p>🔽 Down 25% from the week before</p>
          <p>75% achieved</p>
        </div>
      </div>
      <div>
        <div className={styles.week}>
          <div></div>
          {!showProgressBar ? daysOfTheWeek : <></>}
          <div></div>
        </div>
        {listOfHabits.map((habbit) => {
          return (
            <DashboardLeftHabit
              key={habbit.name}
              name={habbit.name}
              startDay={habbit.startDay}
              activeDays={habbit.activeDays}
              lastWeek={habbit.lastWeek}
              dayOfTheWeek={dayOfTheWeek}
              whichWeek={whichWeek}
              showProgressBar={showProgressBar}
            />
          );
        })}
      </div>
    </div>
  );
}

export default DasboardLeftWeek;
