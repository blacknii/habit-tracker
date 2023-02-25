import React from 'react';
import styles from './DasboardLeftWeek.module.css';

function DasboardLeftWeek() {
  return <div className={styles.container}>
    <div className={styles["main-top"]}>
      <div>
        <button>◀</button>
        <button>▶</button>
      </div>
      <h2>Mon, Feb 20 - Sun, Feb 26</h2>
      <div>
        <button>1️⃣</button>
        <button>2️⃣</button>
      </div>
    </div>
    <div className={styles["overall-progress"]}>
      <p>progress bar</p>
      <div className={styles["overall-progress-percentage-comparison"]}>
      <p>🔽 Down 25% from the week before</p>
      <p>75% achieved</p>
      </div>
    </div>
    <p>grid layout</p>
  </div>
};

export default DasboardLeftWeek;