import React from "react";
import styles from "./NewHabit.module.css";

function NewHabit() {
  return (
    <>
      <div className={styles.overlay}></div>
      <div className={styles.container}>
        <div>
          <div className={styles["display-flex"]}>
            <h2>Add Habit</h2>
            <button className={styles["x-button"]}>x</button>
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
            />
          </div>
          <div>
            <label className={styles["label-big"]} for="type">
              2. Habit Type
            </label>
            <br />
            <div className={styles["habit-type"]}>
              <div className={styles["display-flex"]}>
                <input type="radio" id="type" name="type" />
                <label for="type">To-Do</label>
              </div>
              <br />
              <div className={styles["display-flex"]}>
                <input type="radio" id="type" name="type" />
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
                <input type="checkbox" />
              </label>
              <br />
              <label className={styles["label-checkbox"]} for="frequency">
                Tue
                <input type="checkbox" />
              </label>
              <br />
              <label className={styles["label-checkbox"]} for="frequency">
                Wed
                <input type="checkbox" />
              </label>
              <br />
              <label className={styles["label-checkbox"]} for="frequency">
                Thu
                <input type="checkbox" />
              </label>
              <br />
              <label className={styles["label-checkbox"]} for="frequency">
                Fri
                <input type="checkbox" />
              </label>
              <br />
              <label className={styles["label-checkbox"]} for="frequency">
                Sat
                <input type="checkbox" />
              </label>
              <br />
              <label className={styles["label-checkbox"]} for="frequency">
                Sun
                <input type="checkbox" />
              </label>
              <br />
            </div>
            <div className={styles["display-weekly-frequency-button"]}>
              <button className={styles["weekly-frequency-button"]}>
                Week days
              </button>
              <button className={styles["weekly-frequency-button"]}>
                Every day
              </button>
            </div>
          </div>
          <div className={styles["display-form-button"]}>
            <button className={styles["form-button"]}>Add Habit</button>
            <button className={styles["form-button"]}>+Add Another</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default NewHabit;
