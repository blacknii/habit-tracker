import React, { useState } from "react";
import styles from "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addRandomHabits, removeAllHabits } from "../../redux/habits";
import Menu from "../../components/UI/icons/Menu";
import Logo from "../../components/UI/icons/Logo";

function Header() {
  const [isModalActive, setIsModalActive] = useState(false);
  const dispatch = useDispatch();

  const close = () => {
    setIsModalActive(!isModalActive);
  };

  const randomHandler = () => {
    console.log("Adding random habits");
    setIsModalActive(!isModalActive);
    dispatch(addRandomHabits());
  };

  const removeHandler = () => {
    console.log("Removing all habits");
    setIsModalActive(!isModalActive);
    dispatch(removeAllHabits());
  };

  const modal = (
    <>
      <div className={styles["overlay"]} onClick={close}></div>
      <div className={styles["comtainer-modal"]}>
        {" "}
        <button onClick={randomHandler}>random data</button>
        <button onClick={removeHandler}>remove all</button>
      </div>
    </>
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.icon}>
          <Logo />
          <p className={styles.logo}>GoalGetter</p>
        </span>
        <button className={styles.button} onClick={close}>
          <Menu />
        </button>
      </div>
      {isModalActive && modal}
    </div>
  );
}

export default Header;
