import React from "react";
import DasboardLeftSelector from "./DasboardLeftSelector";
import DasboardLeftWeek from "./DasboardLeftWeek";
import styles from "./DashboardLeft.module.css";
import { useSelector } from "react-redux";

function DashboardLeft() {
  const { bedtimeMessage } = useSelector((state) => state.bedtime);
  console.log(bedtimeMessage);
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h1>Good afternoon</h1>
        <p className={styles.bedtime}>{bedtimeMessage}</p>
      </div>
      <DasboardLeftSelector />
      <DasboardLeftWeek />
    </div>
  );
}

export default DashboardLeft;
