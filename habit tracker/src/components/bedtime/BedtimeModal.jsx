import React, { useState } from "react";
import styles from "./BedtimeModal.module.css";
import Modal from "../UI/Modal";
import { useDispatch, useSelector } from "react-redux";
import { setBedtimeModal, setBedtime } from "../../redux/bedtime";
import Moon from "../UI/icons/Moon";

function BedtimeModal() {
  const dispatch = useDispatch();
  const { bedtime } = useSelector((state) => state.bedtime);

  const [hour, setHour] = useState(
    bedtime ? Number(bedtime.substr(0, 2)) : "0"
  );
  const [minute, setMinute] = useState(
    bedtime ? Number(bedtime.substr(3, 2)) : "0"
  );
  const [period, setPeriod] = useState(bedtime ? bedtime.substr(5, 2) : "AM");

  const cancel = (event) => {
    event.preventDefault();
    dispatch(setBedtimeModal(false));
  };
  const AddBedtime = (event) => {
    event.preventDefault();
    if (hour <= 0) {
      dispatch(setBedtime(0));
    } else {
      dispatch(
        setBedtime(
          `${hour}:${minute.length === 1 ? "0" : ""}${minute} ${period}`
        )
      );
    }
    dispatch(setBedtimeModal(false));
  };

  const hourInput = (event) => {
    if (event.target.value >= 0 && event.target.value <= 12)
      setHour(event.target.value);
  };

  const minuteInput = (event) => {
    if (event.target.value >= 0 && event.target.value <= 59)
      setMinute(event.target.value);
  };

  const periodInput = (event) => {
    setPeriod(event.target.value);
  };

  return (
    <>
      <div className={styles["overlay"]} onClick={cancel}></div>
      <div className={styles["comtainer"]}>
        {" "}
        <div className={styles["modal-message"]}>
          <div className={styles["modal-trash-icon"]}>
            <Moon />
          </div>
          <div>
            <h2>What time do you typically go to bed?</h2>
            <p>A rough estimate is fine</p>
          </div>
        </div>
        <form className={styles["form"]}>
          <div className={styles["main-form"]}>
            <label className={styles.label} htmlFor="name">
              Hr
            </label>
            <input
              className={styles.input}
              type="number"
              name="hour"
              id="hour"
              min="0"
              max="12"
              value={hour}
              onChange={hourInput}
            />
            <label className={styles.label} htmlFor="name">
              Min
            </label>
            <input
              className={styles.input}
              type="number"
              name="minute"
              id="minute"
              min="0"
              max="60"
              value={minute}
              step="5"
              onChange={minuteInput}
            />
            <div className={styles.switch}>
              <div
                onClick={() => {
                  setPeriod("AM");
                }}
                className={
                  period === "AM"
                    ? styles["switch-option-on"]
                    : styles["switch-option-off"]
                }
              >
                <input
                  type="radio"
                  name="drone"
                  value="AM"
                  checked={period === "AM"}
                  onChange={periodInput}
                  className={styles["display-none"]}
                />
                <label htmlFor="AM" className={styles["switch-label"]}>
                  AM
                </label>
              </div>

              <div
                onClick={() => {
                  setPeriod("PM");
                }}
                className={
                  period === "PM"
                    ? styles["switch-option-on"]
                    : styles["switch-option-off"]
                }
              >
                <input
                  type="radio"
                  name="drone"
                  value="PM"
                  checked={period === "PM"}
                  onChange={periodInput}
                  className={styles["display-none"]}
                />
                <label htmlFor="PM" className={styles["switch-label"]}>
                  PM
                </label>
              </div>
            </div>
          </div>
          <div className={styles["modal-buttons"]}>
            <button className={styles["modal-button-cancel"]} onClick={cancel}>
              Cancel
            </button>
            <button
              className={styles["modal-button-add-bedtime"]}
              onClick={AddBedtime}
            >
              Add Bedtime
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default BedtimeModal;
