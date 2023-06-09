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
import Plus from "../UI/icons/Plus";
import Close from "../UI/icons/Close";
import RadioButton from "../UI/icons/RadioButton";

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

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        dispatch(modalSwitch(false));
        dispatch(clear());
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const addHabit = (addAnother = false) => {
    if (
      habitName != "" &&
      JSON.stringify(weeklyFrequency) !=
        JSON.stringify([false, false, false, false, false, false, false])
    ) {
      let isDuplicate = false;

      if (!isDuplicate) {
        if (!addAnother) {
          dispatch(modalSwitch(false));
        }

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
        <div className={styles.header}>
          <div className={styles.highlight}></div>
          <div className={styles.title}>
            <div className={styles["display-flex"]}>
              <h2 className={styles.heading}>Add Habit</h2>
              <button className={styles["x-button"]} onClick={close}>
                <Close color="white" />
              </button>
            </div>
            <p className={styles.subheading}>
              Tackle your goals in daily doses
            </p>
          </div>
        </div>
        <form className={styles.form}>
          <div>
            <div className={styles.flex}>
              <label className={styles["label-big"]} htmlFor="name">
                1. Name this habit
              </label>
              {!isNameCorrect && (
                <p className={styles["error-text"]}>{nameErrorMessage}</p>
              )}
            </div>
            <input
              className={
                isNameCorrect
                  ? styles["input-text"]
                  : styles["input-text-error"]
              }
              type="text"
              id="habitName"
              name="habitName"
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
              <div className={styles["habit-type-option"]}>
                <input
                  type="radio"
                  id="type"
                  name="type"
                  checked={habitType}
                  onChange={toDo}
                />
                <label htmlFor="type" onClick={toDo}>
                  <RadioButton checked={habitType} />
                  <span>To-Do</span>
                </label>
              </div>
              <br />
              <div className={styles["habit-type-option"]}>
                <input
                  type="radio"
                  id="type"
                  name="type"
                  checked={!habitType}
                  onChange={notToDo}
                />
                <label htmlFor="type" onClick={notToDo}>
                  <RadioButton checked={!habitType} />
                  <span>Not-To-Do</span>
                </label>
                <br />
              </div>
            </div>
          </div>
          <div>
            <div className={styles.flex}>
              <label className={styles["label-big"]} htmlFor="frequency">
                3. Weekly frequency
              </label>
              {!isFrequencyCorrect && (
                <p className={styles["error-text"]}>
                  This is a required field.
                </p>
              )}
            </div>
            <div className={styles["display-label-checkbox"]}>
              <label
                onClick={() => dispatch(frequencyChanger(0))}
                className={
                  isFrequencyCorrect
                    ? weeklyFrequency[0]
                      ? styles["label-checkbox-checked"]
                      : styles["label-checkbox"]
                    : styles["label-checkbox-error"]
                }
                htmlFor="frequency"
              >
                Mon
                <input
                  className={styles["display-none"]}
                  type="checkbox"
                  defaultChecked={weeklyFrequency[0]}
                  onClick={() => dispatch(frequencyChanger(0))}
                />
              </label>

              <label
                onClick={() => dispatch(frequencyChanger(1))}
                className={
                  isFrequencyCorrect
                    ? weeklyFrequency[1]
                      ? styles["label-checkbox-checked"]
                      : styles["label-checkbox"]
                    : styles["label-checkbox-error"]
                }
                htmlFor="frequency"
              >
                Tue
                <input
                  className={styles["display-none"]}
                  type="checkbox"
                  defaultChecked={weeklyFrequency[1]}
                  onClick={() => dispatch(frequencyChanger(1))}
                />
              </label>

              <label
                onClick={() => dispatch(frequencyChanger(2))}
                className={
                  isFrequencyCorrect
                    ? weeklyFrequency[2]
                      ? styles["label-checkbox-checked"]
                      : styles["label-checkbox"]
                    : styles["label-checkbox-error"]
                }
                htmlFor="frequency"
              >
                Wed
                <input
                  className={styles["display-none"]}
                  type="checkbox"
                  defaultChecked={weeklyFrequency[2]}
                  onClick={() => dispatch(frequencyChanger(2))}
                />
              </label>

              <label
                onClick={() => dispatch(frequencyChanger(3))}
                className={
                  isFrequencyCorrect
                    ? weeklyFrequency[3]
                      ? styles["label-checkbox-checked"]
                      : styles["label-checkbox"]
                    : styles["label-checkbox-error"]
                }
                htmlFor="frequency"
              >
                Thu
                <input
                  className={styles["display-none"]}
                  type="checkbox"
                  defaultChecked={weeklyFrequency[3]}
                  onClick={() => dispatch(frequencyChanger(3))}
                />
              </label>

              <label
                onClick={() => dispatch(frequencyChanger(4))}
                className={
                  isFrequencyCorrect
                    ? weeklyFrequency[4]
                      ? styles["label-checkbox-checked"]
                      : styles["label-checkbox"]
                    : styles["label-checkbox-error"]
                }
                htmlFor="frequency"
              >
                Fri
                <input
                  className={styles["display-none"]}
                  type="checkbox"
                  defaultChecked={weeklyFrequency[4]}
                  onClick={() => dispatch(frequencyChanger(4))}
                />
              </label>

              <label
                onClick={() => dispatch(frequencyChanger(5))}
                className={
                  isFrequencyCorrect
                    ? weeklyFrequency[5]
                      ? styles["label-checkbox-checked"]
                      : styles["label-checkbox"]
                    : styles["label-checkbox-error"]
                }
                htmlFor="frequency"
              >
                Sat
                <input
                  className={styles["display-none"]}
                  type="checkbox"
                  defaultChecked={weeklyFrequency[5]}
                  onClick={() => dispatch(frequencyChanger(5))}
                />
              </label>

              <label
                onClick={() => dispatch(frequencyChanger(6))}
                className={
                  isFrequencyCorrect
                    ? weeklyFrequency[6]
                      ? styles["label-checkbox-checked"]
                      : styles["label-checkbox"]
                    : styles["label-checkbox-error"]
                }
                htmlFor="frequency"
              >
                Sun
                <input
                  className={styles["display-none"]}
                  type="checkbox"
                  defaultChecked={weeklyFrequency[6]}
                  onClick={() => dispatch(frequencyChanger(6))}
                />
              </label>
            </div>
            <div className={styles["display-weekly-frequency-button"]}>
              <button
                className={
                  isFrequencyCorrect
                    ? weeklyFrequency[0] &&
                      weeklyFrequency[1] &&
                      weeklyFrequency[2] &&
                      weeklyFrequency[3] &&
                      weeklyFrequency[4] &&
                      !weeklyFrequency[5] &&
                      !weeklyFrequency[6]
                      ? styles["weekly-frequency-button-checked"]
                      : styles["weekly-frequency-button"]
                    : styles["weekly-frequency-button-error"]
                }
                onClick={weekDays}
              >
                Week days
              </button>
              <button
                className={
                  isFrequencyCorrect
                    ? weeklyFrequency[0] &&
                      weeklyFrequency[1] &&
                      weeklyFrequency[2] &&
                      weeklyFrequency[3] &&
                      weeklyFrequency[4] &&
                      weeklyFrequency[5] &&
                      weeklyFrequency[6]
                      ? styles["weekly-frequency-button-checked"]
                      : styles["weekly-frequency-button"]
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
          <button
            className={styles["form-button-another"]}
            onClick={() => addHabit(false)}
          >
            Add Habit
          </button>
          <button
            className={styles["form-button-add"]}
            onClick={() => addHabit(true)}
          >
            <Plus />
            Add Another
          </button>
        </div>
      </div>
    </>
  );
}

export default NewHabit;
