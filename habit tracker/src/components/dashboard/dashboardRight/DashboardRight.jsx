import React, { useEffect } from "react";
import styles from "./DashboardRight.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  newHabit,
  removeHabit,
  fillingUpEmptyDays,
  test,
} from "../../../redux/habits";
import DashboardRightHabit from "./DashboardRightHabit";

function DashboardRight() {
  const { listOfHabits } = useSelector((state) => state.habits);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fillingUpEmptyDays());
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
      <button onClick={() => dispatch(test(["2023-02-27", "2023-03-10", 0]))}>
        Add Your Bedtime
      </button>
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
            />
          );
        })}
      </div>
    </div>
  );
}

export default DashboardRight;
