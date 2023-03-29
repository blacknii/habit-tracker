import React from "react";
import styles from "./NewHabit.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  nameChanger,
  typeChanger,
  frequencyChanger,
  weekDaysChanger,
  everyDayChanger,
  modalSwitch,
} from "../../redux/newHabit";
import { newHabit } from "../../redux/habits";

const today = new Date().toISOString().slice(0, 10);

function NewHabit() {
  const { habitName, habitType, weeklyFrequency } = useSelector(
    (state) => state.newHabit
  );
  const dispatch = useDispatch();
  const activeDays = weeklyFrequency
    .map((day, i) => {
      if (day) return i + 1;
    })
    .filter((day) => day !== undefined);

  const close = () => {
    dispatch(modalSwitch(false));
  };

  const addHabit = () => {
    if (
      habitName != "" &&
      JSON.stringify(weeklyFrequency) !=
        JSON.stringify([false, false, false, false, false, false, false])
    ) {
      dispatch(modalSwitch(false));
      dispatch(
        newHabit({
          name: habitName,
          startDay: today,
          activeDays: activeDays,
          lastWeek: [0],
          habitType: habitType,
        })
      );
    }
  };

  const addAnother = () => {
    dispatch(
      newHabit({
        name: habitName,
        startDay: today,
        activeDays: activeDays,
        lastWeek: [0],
        habitType: habitType,
      })
    );
  };

  const weekDays = (event) => {
    event.preventDefault();
    dispatch(weekDaysChanger());
  };

  const everyDay = (event) => {
    event.preventDefault();
    dispatch(everyDayChanger());
  };

  const toDo = (event) => {
    event.preventDefault();
    dispatch(typeChanger(true));
  };

  const notToDo = (event) => {
    event.preventDefault();
    dispatch(typeChanger(false));
  };

  return (
    <>
      <div className={styles.overlay}></div>
      <div className={styles.container}>
        <div>
          <div className={styles["display-flex"]}>
            <h2>Add Habit</h2>
            <button className={styles["x-button"]} onClick={close}>
              x
            </button>
          </div>
          <p>Tackle your goals in daily doses</p>
        </div>
        <form className={styles.form}>
          <div>
            <label className={styles["label-big"]} for="name">
              1. Name this habit
            </label>
            <br />
            <input
              className={styles["input-text"]}
              type="text"
              id="name"
              name="name"
              value={habitName}
              onChange={(event) => dispatch(nameChanger(event.target.value))}
            />
          </div>
          <div>
            <label className={styles["label-big"]} for="type">
              2. Habit Type
            </label>
            <br />
            <div className={styles["habit-type"]}>
              <div className={styles["display-flex"]} onClick={toDo}>
                <input type="radio" id="type" name="type" checked={habitType} />
                <label for="type">To-Do</label>
              </div>
              <br />
              <div className={styles["display-flex"]} onClick={notToDo}>
                <input
                  type="radio"
                  id="type"
                  name="type"
                  checked={!habitType}
                />
                <label for="type">Not-To-Do</label>
                <br />
              </div>
            </div>
          </div>
          <div>
            <label className={styles["label-big"]} for="frequency">
              3. Weekly frequency
            </label>
            <div className={styles["display-label-checkbox"]}>
              <br />
              <label className={styles["label-checkbox"]} for="frequency">
                Mon
                <input
                  type="checkbox"
                  checked={weeklyFrequency[0]}
                  onClick={() => dispatch(frequencyChanger(0))}
                />
              </label>
              <br />
              <label className={styles["label-checkbox"]} for="frequency">
                Tue
                <input
                  type="checkbox"
                  checked={weeklyFrequency[1]}
                  onClick={() => dispatch(frequencyChanger(1))}
                />
              </label>
              <br />
              <label className={styles["label-checkbox"]} for="frequency">
                Wed
                <input
                  type="checkbox"
                  checked={weeklyFrequency[2]}
                  onClick={() => dispatch(frequencyChanger(2))}
                />
              </label>
              <br />
              <label className={styles["label-checkbox"]} for="frequency">
                Thu
                <input
                  type="checkbox"
                  checked={weeklyFrequency[3]}
                  onClick={() => dispatch(frequencyChanger(3))}
                />
              </label>
              <br />
              <label className={styles["label-checkbox"]} for="frequency">
                Fri
                <input
                  type="checkbox"
                  checked={weeklyFrequency[4]}
                  onClick={() => dispatch(frequencyChanger(4))}
                />
              </label>
              <br />
              <label className={styles["label-checkbox"]} for="frequency">
                Sat
                <input
                  type="checkbox"
                  checked={weeklyFrequency[5]}
                  onClick={() => dispatch(frequencyChanger(5))}
                />
              </label>
              <br />
              <label className={styles["label-checkbox"]} for="frequency">
                Sun
                <input
                  type="checkbox"
                  checked={weeklyFrequency[6]}
                  onClick={() => dispatch(frequencyChanger(6))}
                />
              </label>
              <br />
            </div>
            <div className={styles["display-weekly-frequency-button"]}>
              <button
                className={styles["weekly-frequency-button"]}
                onClick={weekDays}
              >
                Week days
              </button>
              <button
                className={styles["weekly-frequency-button"]}
                onClick={everyDay}
              >
                Every day
              </button>
            </div>
          </div>
        </form>
        <div className={styles["display-form-button"]}>
          <button className={styles["form-button"]} onClick={addHabit}>
            Add Habit
          </button>
          <button className={styles["form-button"]} onClick={addAnother}>
            +Add Another
          </button>
        </div>
      </div>
    </>
  );
}

export default NewHabit;
