import React from "react";
import styles from "./Modal.module.css";

function Modal(props) {
  return (
    <div className={styles["overlay"]}>
      <div className={styles["comtainer"]}>
        {" "}
        <div>{props.children}</div>
      </div>
    </div>
  );
}

export default Modal;
