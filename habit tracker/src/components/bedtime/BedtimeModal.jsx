import React, { useState } from "react";
import styles from "./BedtimeModal.module.css";
import Modal from "../UI/Modal";
import { useDispatch, useSelector } from "react-redux";
import { setBedtimeModal, setBedtime } from "../../redux/bedtime";

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
        <div>
          <div>🌜</div>
          <div>
            <h2>What time do you typically go to bed?</h2>
            <p>A rough estimate is fine</p>
          </div>
          <form className={styles["form"]}>
            <label htmlFor="name">Hr</label>
            <input
              type="number"
              name="hour"
              id="hour"
              min="0"
              max="12"
              value={hour}
              onChange={hourInput}
            />
            <label htmlFor="name">Min</label>
            <input
              type="number"
              name="minute"
              id="minute"
              min="0"
              max="60"
              value={minute}
              step="5"
              onChange={minuteInput}
            />
            <div>
              <input
                type="radio"
                name="drone"
                value="AM"
                checked={period === "AM"}
                onChange={periodInput}
              />
              <label htmlFor="AM">AM</label>
            </div>

            <div>
              <input
                type="radio"
                name="drone"
                value="PM"
                checked={period === "PM"}
                onChange={periodInput}
              />
              <label htmlFor="PM">PM</label>
            </div>
            <div>
              <button onClick={cancel}>Cancel</button>
              <button onClick={AddBedtime}>Add Bedtime</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default BedtimeModal;
