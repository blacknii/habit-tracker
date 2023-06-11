import React, { useEffect, useState } from "react";
import styles from "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addRandomHabits, removeAllHabits } from "../../redux/habits";
import Menu from "../../components/UI/icons/Menu";
import Logo from "../../components/UI/icons/Logo";

function Header() {
  const [isModalOpen, setisModalOpen] = useState(false);
  const dispatch = useDispatch();

  const toggleModal = () => {
    setisModalOpen(!isModalOpen);
  };

  const randomHandler = () => {
    setisModalOpen(!isModalOpen);
    dispatch(addRandomHabits());
  };

  const removeHandler = () => {
    setisModalOpen(!isModalOpen);
    dispatch(removeAllHabits());
  };

  const modal = (
    <>
      <div className={styles["overlay"]} onClick={toggleModal}></div>
      <div className={styles["container-modal"]}>
        {" "}
        <button
          className={styles["modal-button-random"]}
          onClick={randomHandler}
        >
          Random Data
        </button>
        <button
          className={styles["modal-button-delete"]}
          onClick={removeHandler}
        >
          Remove All
        </button>
        <button className={styles["modal-button-cancel"]} onClick={toggleModal}>
          Cancel
        </button>
      </div>
    </>
  );

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setisModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.icon}>
          <Logo />
          <p className={styles.logo}>GoalGetter</p>
        </span>
        <button className={styles.button} onClick={toggleModal}>
          <Menu />
        </button>
      </div>
      {isModalOpen && modal}
    </div>
  );
}

export default Header;
