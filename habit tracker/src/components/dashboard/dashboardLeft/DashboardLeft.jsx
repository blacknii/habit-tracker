import React from "react";
import DasboardLeftSelector from "./DasboardLeftSelector";
import DasboardLeftWeek from "./DasboardLeftWeek";
import styles from "./DashboardLeft.module.css";
import { useSelector, useDispatch } from "react-redux";
import { setBedtimeModal } from "../../../redux/bedtime";

function DashboardLeft() {
  const dispatch = useDispatch();
  const { bedtimeMessage } = useSelector((state) => state.bedtime);

  const greetingForTime = () => {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      return "Good morning";
    } else if (currentHour >= 12 && currentHour < 18) {
      return "Good afternoon";
    } else if (currentHour >= 18 && currentHour < 22) {
      return "Good evening";
    } else {
      return "Good night";
    }
  };

  const Greeting = greetingForTime();

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h1>{Greeting}</h1>
        <p
          className={styles.bedtime}
          onClick={() => dispatch(setBedtimeModal(true))}
        >
          {bedtimeMessage}
        </p>
      </div>
      <DasboardLeftSelector />
      <DasboardLeftWeek />
    </div>
  );
}

export default DashboardLeft;
