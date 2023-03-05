import React from "react";
import styles from "./DasboardLeftWeek.module.css";
import DashboardLeftHabit from "./DashboardLeftHabit";
import { useDispatch, useSelector } from "react-redux";

function DasboardLeftWeek() {
  const { listOfHabits } = useSelector((state) => state.habits);
  const dispatch = useDispatch();

  let curr = new Date();
  let dayOfTheWeek = curr.getDay() ? curr.getDay() : 7;

  return (
    <div className={styles.container}>
      <div className={styles["main-top"]}>
        <div>
          <button>◀</button>
          <button>▶</button>
        </div>
        <h2>Mon, Feb 20 - Sun, Feb 26</h2>
        <div>
          <button>1️⃣</button>
          <button>2️⃣</button>
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
          <div className={styles.days}>
            <div className={styles.day}>Tue</div>
            <div className={styles.day}>Mon</div>
            <div className={styles.day}>Wen</div>
            <div className={styles.day}>Thu</div>
            <di className={styles.day} v>
              Fri
            </di>
            <div className={styles.day}>Sat</div>
            <div className={styles.day}>Sun</div>
          </div>
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
            />
          );
        })}
      </div>
    </div>
  );
}

export default DasboardLeftWeek;
