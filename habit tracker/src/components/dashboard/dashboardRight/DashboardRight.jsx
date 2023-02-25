import React from "react";
import styles from "./DashboardRight.module.css";

function DashboardRight() {
  return (
    <div className={styles.container}>
      <div className={styles.day}>
      <p>Thu, Feb 23</p>
      <div>
        <button>◀</button>
        <button>▶</button>
      </div>
      </div>
      <button>Add Your Bedtime</button>
      <div>
        <p>task 1</p>
        <p>task 2</p>
        <p>task 3</p>
      </div>
    </div>
  );
}

export default DashboardRight;
