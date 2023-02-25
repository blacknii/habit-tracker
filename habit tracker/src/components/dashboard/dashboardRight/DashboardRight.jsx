import React from "react";
import styles from "./DashboardRight.module.css";
import { useDispatch, useSelector } from "react-redux";
import {newHabit, removeHabit} from "../../../redux/habits"

function DashboardRight() {
  const { listOfHabits } = useSelector((state)=> state.habits)
  const dispatch = useDispatch();
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
        <button onClick={() => dispatch(newHabit())} >add</button>
        <button onClick={() => dispatch(removeHabit())} >remove</button>
      </div>
        {listOfHabits.map(habbit => {
          return <p key={habbit.name}>{habbit.name}</p>
        })}
      </div>
    </div>
  );
}

export default DashboardRight;
