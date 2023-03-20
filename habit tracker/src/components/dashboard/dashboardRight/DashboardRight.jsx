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
import DashboardRightHabit from "./DashboardRightHabit";

function DashboardRight() {
  const { listOfHabits } = useSelector((state) => state.habits);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fillingUpEmptyDays());
    dispatch(dateCompletion());
  });

  return (
    <div className={styles.container}>
      <div className={styles.day}>
        <p>Thu, Feb 23</p>
        <div>
          <button>◀</button>
          <button>▶</button>
        </div>
      </div>
      <button>Add Your Bedtime</button>
      <div>
        <div>
          <button onClick={() => dispatch(newHabit())}>add</button>
          <button onClick={() => dispatch(removeHabit())}>remove</button>
        </div>
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
