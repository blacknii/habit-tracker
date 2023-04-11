import React from "react";
import DasboardLeftSelector from "./DasboardLeftSelector";
import DasboardLeftWeek from "./DasboardLeftWeek";
import styles from "./DashboardLeft.module.css";
import { useSelector, useDispatch } from "react-redux";
import { setBedtimeModal } from "../../../redux/bedtime";

function DashboardLeft() {
  const dispatch = useDispatch();
  const { bedtimeMessage } = useSelector((state) => state.bedtime);

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h1>Good afternoon</h1>
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
