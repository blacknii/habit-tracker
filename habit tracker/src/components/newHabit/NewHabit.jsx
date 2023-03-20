import React from "react";
import styles from "./NewHabit.module.css";

function NewHabit() {
  return (
    <>
      <div className={styles.overlay}></div>
      <div className={styles.container}>
        <div>
          <div className={styles.test}>
            <p>Add Habit</p>
            <button className={styles.button}>x</button>
          </div>
          <p>Tackle your goals in daily doses</p>
        </div>
        <form className={styles.form}>
          <div>
            <label for="name">1. Name this habit</label>
            <br />
            <input type="text" id="name" name="name" />
          </div>
          <div>
            <label for="type">2. Habit Type</label>
            <br />
            <div className={styles.test}>
              <div className={styles.test}>
                <input type="radio" id="type" name="type" />
                <label for="type">To-Do</label>
              </div>
              <br />
              <div className={styles.test}>
                <input type="radio" id="type" name="type" />
                <label for="type">Not-To-Do</label>
                <br />
              </div>
            </div>
          </div>
          <div>
            <label for="frequency">3. Weekly frequency</label>
            <div className={styles.test}>
              <br />
              <label for="frequency">
                Mon
                <input type="checkbox" />
              </label>
              <br />
              <label for="frequency">
                Tue
                <input type="checkbox" />
              </label>
              <br />
              <label for="frequency">
                Wed
                <input type="checkbox" />
              </label>
              <br />
              <label for="frequency">
                Thu
                <input type="checkbox" />
              </label>
              <br />
              <label for="frequency">
                Fri
                <input type="checkbox" />
              </label>
              <br />
              <label for="frequency">
                Sat
                <input type="checkbox" />
              </label>
              <br />
              <label for="frequency">
                Sun
                <input type="checkbox" />
              </label>
              <br />
            </div>
            <div className={styles.test}>
              <button className={styles.button}>Week days</button>
              <button className={styles.button}>Every day</button>
            </div>
          </div>
          <div className={styles.test}>
            <button className={styles.button}>Add Habit</button>
            <button className={styles.button}>+Add Another</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default NewHabit;
