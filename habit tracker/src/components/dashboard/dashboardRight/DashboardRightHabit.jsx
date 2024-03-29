import React, { useEffect, useState } from "react";
import styles from "./DashboardRightHabit.module.css";
import { useDispatch } from "react-redux";
import { completionsSwitch, removeHabit } from "../../../redux/habits";
import Checkmark from "../../UI/icons/Checkmark";
import Close from "../../UI/icons/Close";
import Cross from "../../UI/icons/Cross";
import FireIcon from "../../UI/icons/FireIcon";
import Circle from "../../UI/icons/Circle";
import Trash from "../../UI/icons/Trash";

function DashboardRightHabit(props) {
  const dispatch = useDispatch();
  const lastIndex = props.lastWeek.length - 1 - props.timeIndex;
  let todaysTask = props.lastWeek[lastIndex];
  const activeDays = props.activeDays;
  const dayNames = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  let today = new Date();
  let dayOfTheWeek = today.getDay() ? today.getDay() : 7;
  dayOfTheWeek = ((dayOfTheWeek - 1 - props.timeIndex) % 7) + 1;
  while (dayOfTheWeek < 1) {
    dayOfTheWeek += 7;
  }
  todaysTask = !activeDays.includes(dayOfTheWeek) ? 2 : todaysTask;

  const uncompletedTask = (
    <div className={styles.submit}>
      <button
        className={styles["mark-complete"]}
        onClick={() => dispatch(completionsSwitch([props.name, lastIndex]))}
      >
        Mark Complete
      </button>
    </div>
  );

  const completedTask = (
    <div className={styles.submit}>
      <div className={styles["color-white"]}>
        {props.habitType ? (
          <span className={styles["completed-message"]}>
            <Checkmark /> <p>Completed</p>
          </span>
        ) : (
          <span className={styles["completed-message"]}>
            <Checkmark /> <p>Avoided</p>
          </span>
        )}
      </div>
      <button
        className={styles["completed-button"]}
        onClick={() => dispatch(completionsSwitch([props.name, lastIndex]))}
      >
        Undo
      </button>
    </div>
  );

  const InactiveTask = (
    <div className={styles.submit}>
      <p>Inactive on {dayNames[dayOfTheWeek - 1]}</p>
    </div>
  );
  let streak = 0;

  const reversedArray = props.lastWeek
    .slice(0, props.lastWeek.length - 1)
    .reverse();
  function countOnes(array) {
    let currentDay = dayOfTheWeek - 1;
    let count = 0;
    for (let i = 0; i < array.length; i++) {
      if (activeDays.includes(currentDay)) {
        if (array[i] === 0) {
          break;
        }
        if (array[i] === 1) {
          count++;
        }
      }
      currentDay--;
      if (currentDay === 0) currentDay = 7;
    }
    if (todaysTask == 1) count++;
    return count;
  }
  const strike = countOnes(reversedArray);

  const [isModalActive, setIsModalActive] = useState(false);

  const close = () => {
    setIsModalActive(!isModalActive);
  };

  const delateHandler = () => {
    dispatch(removeHabit(props.name));
    setIsModalActive(!isModalActive);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsModalActive(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const modal = (
    <>
      <div className={styles["overlay"]} onClick={close}></div>
      <div className={styles["comtainer-modal"]}>
        {" "}
        <div className={styles["modal-message"]}>
          <div className={styles["modal-trash-icon"]}>
            <Trash />
          </div>
          <div>
            <h2>Delete Habit</h2>
            <p>
              Are you sure you want to delete this habit? You won't be able to
              see your history.
            </p>
          </div>
        </div>
        <div className={styles["modal-habit-name"]}>
          <Circle color="#3798fa" />
          <h3 className={styles["habit-name-long"]}>{props.name}</h3>
        </div>
        <div className={styles["modal-buttons"]}>
          <button className={styles["modal-button-cancel"]} onClick={close}>
            Cancel
          </button>
          <button
            className={styles["modal-button-delete"]}
            onClick={delateHandler}
          >
            Yes, delete it.
          </button>
        </div>
      </div>
    </>
  );

  return (
    <div className={styles.container}>
      <div className={styles.symbol}>
        {props.habitType ? (
          todaysTask === 2 ? (
            <Circle color="#bed1ed" />
          ) : (
            <Circle color="#3798fa" />
          )
        ) : todaysTask === 2 ? (
          <Cross color="#bed1ed" />
        ) : (
          <Cross color="#3798fa" />
        )}
      </div>
      <div
        className={
          todaysTask === 1
            ? styles["highlight-active"]
            : todaysTask === 2
            ? styles["highlight-inactive"]
            : styles.highlight
        }
      ></div>
      <div
        className={
          todaysTask === 1
            ? styles["right-active"]
            : todaysTask === 2
            ? styles["right-inactive"]
            : styles.right
        }
      >
        <div className={styles["delete-button"]}>
          <h2 className={styles["habit-name"]}>{props.name}</h2>
          <div className={styles["strike-and-delete"]}>
            <span
              className={
                todaysTask !== 1
                  ? styles["fire-icon"]
                  : styles["fire-icon-inherit"]
              }
            >
              {strike}
              {todaysTask === 1 ? (
                <FireIcon hole="#3798fa" />
              ) : (
                <FireIcon hole="white" />
              )}
            </span>
            <button
              className={
                todaysTask === 1 ? styles["delete-inherit"] : styles["delete"]
              }
              onClick={close}
            >
              <Close />
            </button>
          </div>
        </div>

        {/* {todaysTask ? completedTask : uncompletedTask} */}
        {todaysTask === 0 && uncompletedTask}
        {todaysTask === 1 && completedTask}
        {todaysTask === 2 && InactiveTask}
      </div>
      {isModalActive && modal}
    </div>
  );
}

export default DashboardRightHabit;
