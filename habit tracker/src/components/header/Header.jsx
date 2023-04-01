import React from "react";
import styles from "./Header.module.css";

function Header() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.logo}>GoalGetter</p>
        <button className={styles.button}>Menu</button>
      </div>
    </div>
  );
}

export default Header;
