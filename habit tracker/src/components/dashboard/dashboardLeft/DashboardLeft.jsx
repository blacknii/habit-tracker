import React from "react";
import DasboardLeftSelector from "./DasboardLeftSelector";
import DasboardLeftWeek from "./DasboardLeftWeek";
import styles from "./DashboardLeft.module.css";

function DashboardLeft() {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h1>Good afternoon, Karl</h1>
        <p className={styles.bedtime}>Add Your Bedtime</p>
      </div>
      <DasboardLeftSelector />
      <DasboardLeftWeek />
    </div>
  );
}

export default DashboardLeft;
