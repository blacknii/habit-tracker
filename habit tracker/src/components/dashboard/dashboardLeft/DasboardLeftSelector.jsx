import React from 'react';
import styles from './DasboardLeftSelector.module.css';

function DasboardLeftSelector() {
  return <div className={styles.container}>
    <ul className={styles["date-range-selector"]}>
      <li>Week</li>
      <li>Month</li>
      <li>Year</li>
      <li>All Time</li>
    </ul>
    <button>+ Add Habbit</button>
  </div>
};

export default DasboardLeftSelector;