import React from "react";
import styles from "./ProgressBar.module.css";

function ProgressBar(props) {
  const filled = props.value;
  return (
    <div className={props.size ? styles.progressBarSmall : styles.progressBar}>
      <div
        style={{
          backgroundColor: "#007bff",
          height: "100%",
          width: `${filled}%`,
          borderRadius: "10px",
        }}
      ></div>
    </div>
  );
}

export default ProgressBar;
