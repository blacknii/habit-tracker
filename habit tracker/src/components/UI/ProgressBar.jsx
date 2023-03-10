import React from "react";
import styles from "./ProgressBar.module.css";

function ProgressBar(props) {
  const filled = props.value;
  return (
    <div className={styles.progressBar}>
      <div
        style={{
          backgroundColor: "green",
          height: "100%",
          width: `${filled}%`,
        }}
      ></div>
    </div>
  );
}

export default ProgressBar;
