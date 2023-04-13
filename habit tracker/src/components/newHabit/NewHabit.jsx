import React, { useState, useEffect } from "react";
import styles from "./NewHabit.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  nameChanger,
  typeChanger,
  frequencyChanger,
  weekDaysChanger,
  everyDayChanger,
  modalSwitch,
  clear,
} from "../../redux/newHabit";
import { newHabit } from "../../redux/habits";

const today = new Date().toISOString().slice(0, 10);

function NewHabit() {
  const { habitName, habitType, weeklyFrequency } = useSelector(
    (state) => state.newHabit
  );
  const { listOfHabits } = useSelector((state) => state.habits);
  const dispatch = useDispatch();
  const activeDays = weeklyFrequency
    .map((day, i) => {
      if (day) return i + 1;
    })
    .filter((day) => day !== undefined);

  const close = () => {
    dispatch(modalSwitch(false));
    dispatch(clear());
  };

  const [isNameCorrect, setIsNameCorrect] = useState(true);
  const [isFrequencyCorrect, setIsFrequencyCorrect] = useState(true);
  const [firstLoad, setFirstLoad] = useState(true);
  const [nameErrorMessage, setNameErrorMessage] = useState(
    "This is a required field."
  );

  const addHabit = () => {
    if (
      habitName != "" &&
      JSON.stringify(weeklyFrequency) !=
        JSON.stringify([false, false, false, false, false, false, false])
    ) {
      let isDuplicate = false;
      console.log(
        listOfHabits.forEach((element) => {
          if (element.name === habitName) isDuplicate = true;
        })
      );
      if (!isDuplicate) {
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
        setFirstLoad(true);
        dispatch(clear());
      } else {
        setNameErrorMessage("A habit with that name already exists");
        setIsNameCorrect(false);
      }
    } else {
      if (habitName == "") {
        setNameErrorMessage("This is a required field.");
        setIsNameCorrect(false);
      }
      if (
        JSON.stringify(weeklyFrequency) ==
        JSON.stringify([false, false, false, false, false, false, false])
      ) {
        setIsFrequencyCorrect(false);
      }
    }
  };

  useEffect(() => {
    if (firstLoad) setFirstLoad(false);

    if (
      JSON.stringify(weeklyFrequency) ==
        JSON.stringify([false, false, false, false, false, false, false]) &&
      !firstLoad
    ) {
      setIsFrequencyCorrect(false);
    } else {
      setIsFrequencyCorrect(true);
    }
  }, [weeklyFrequency]);

  const addAnother = () => {
    if (
      habitName != "" &&
      JSON.stringify(weeklyFrequency) !=
        JSON.stringify([false, false, false, false, false, false, false])
    ) {
      let isDuplicate = false;
      console.log(
        listOfHabits.forEach((element) => {
          if (element.name === habitName) isDuplicate = true;
        })
      );
      if (!isDuplicate) {
        dispatch(
          newHabit({
            name: habitName,
            startDay: today,
            activeDays: activeDays,
            lastWeek: [0],
            habitType: habitType,
          })
        );
        setFirstLoad(true);
        dispatch(clear());
      } else {
        setNameErrorMessage("a habit with that name already exists");
        setIsNameCorrect(false);
      }
    } else {
      if (habitName == "") {
        setNameErrorMessage("This is a required field.");
        setIsNameCorrect(false);
      }
      if (
        JSON.stringify(weeklyFrequency) ==
        JSON.stringify([false, false, false, false, false, false, false])
      ) {
        setIsFrequencyCorrect(false);
      }
    }
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

  const habitNameHandler = (event) => {
    dispatch(nameChanger(event.target.value));
    if (event.target.value == "") {
      setNameErrorMessage("This is a required field.");
      setIsNameCorrect(false);
    } else if (event.target.value != "" && !isNameCorrect)
      setIsNameCorrect(true);
  };

  return (
    <>
      <div className={styles.overlay} onClick={close}></div>
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
            <label className={styles["label-big"]} htmlFor="name">
              1. Name this habit
            </label>
            {!isNameCorrect && <p>{nameErrorMessage}</p>}
            <br />
            <input
              className={
                isNameCorrect
                  ? styles["input-text"]
                  : styles["input-text-error"]
              }
              type="text"
              id="name"
              name="name"
              value={habitName}
              onChange={habitNameHandler}
            />
          </div>
          <div>
            <label className={styles["label-big"]} htmlFor="type">
              2. Habit Type
            </label>
            <br />
            <div className={styles["habit-type"]}>
              <div className={styles["display-flex"]} onClick={toDo}>
                <input type="radio" id="type" name="type" checked={habitType} />
                <label htmlFor="type">To-Do</label>
              </div>
              <br />
              <div className={styles["display-flex"]} onClick={notToDo}>
                <input
                  type="radio"
                  id="type"
                  name="type"
                  checked={!habitType}
                />
                <label htmlFor="type">Not-To-Do</label>
                <br />
              </div>
            </div>
          </div>
          <div>
            <label className={styles["label-big"]} htmlFor="frequency">
              3. Weekly frequency
            </label>
            {!isFrequencyCorrect && <p>This is a required field.</p>}
            <div className={styles["display-label-checkbox"]}>
              <br />
              <label
                className={
                  isFrequencyCorrect
                    ? styles["label-checkbox"]
                    : styles["label-checkbox-error"]
                }
                htmlFor="frequency"
              >
                Mon
                <input
                  type="checkbox"
                  checked={weeklyFrequency[0]}
                  onClick={() => dispatch(frequencyChanger(0))}
                />
              </label>
              <br />
              <label
                className={
                  isFrequencyCorrect
                    ? styles["label-checkbox"]
                    : styles["label-checkbox-error"]
                }
                htmlFor="frequency"
              >
                Tue
                <input
                  type="checkbox"
                  checked={weeklyFrequency[1]}
                  onClick={() => dispatch(frequencyChanger(1))}
                />
              </label>
              <br />
              <label
                className={
                  isFrequencyCorrect
                    ? styles["label-checkbox"]
                    : styles["label-checkbox-error"]
                }
                htmlFor="frequency"
              >
                Wed
                <input
                  type="checkbox"
                  checked={weeklyFrequency[2]}
                  onClick={() => dispatch(frequencyChanger(2))}
                />
              </label>
              <br />
              <label
                className={
                  isFrequencyCorrect
                    ? styles["label-checkbox"]
                    : styles["label-checkbox-error"]
                }
                htmlFor="frequency"
              >
                Thu
                <input
                  type="checkbox"
                  checked={weeklyFrequency[3]}
                  onClick={() => dispatch(frequencyChanger(3))}
                />
              </label>
              <br />
              <label
                className={
                  isFrequencyCorrect
                    ? styles["label-checkbox"]
                    : styles["label-checkbox-error"]
                }
                htmlFor="frequency"
              >
                Fri
                <input
                  type="checkbox"
                  checked={weeklyFrequency[4]}
                  onClick={() => dispatch(frequencyChanger(4))}
                />
              </label>
              <br />
              <label
                className={
                  isFrequencyCorrect
                    ? styles["label-checkbox"]
                    : styles["label-checkbox-error"]
                }
                htmlFor="frequency"
              >
                Sat
                <input
                  type="checkbox"
                  checked={weeklyFrequency[5]}
                  onClick={() => dispatch(frequencyChanger(5))}
                />
              </label>
              <br />
              <label
                className={
                  isFrequencyCorrect
                    ? styles["label-checkbox"]
                    : styles["label-checkbox-error"]
                }
                htmlFor="frequency"
              >
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
                className={
                  isFrequencyCorrect
                    ? styles["weekly-frequency-button"]
                    : styles["weekly-frequency-button-error"]
                }
                onClick={weekDays}
              >
                Week days
              </button>
              <button
                className={
                  isFrequencyCorrect
                    ? styles["weekly-frequency-button"]
                    : styles["weekly-frequency-button-error"]
                }
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
