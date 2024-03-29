import React, { useEffect, useState } from "react";
import styles from "./DasboardLeftWeek.module.css";
import DashboardLeftHabit from "./DashboardLeftHabit";
import { useDispatch, useSelector } from "react-redux";
import ProgressBar from "../../UI/ProgressBar";
import { dateIndexChanger } from "../../../redux/habits";
import ChevronLeft from "../../UI/icons/ChevronLeft";
import ChevronRight from "../../UI/icons/ChevronRight";
import Grid from "../../UI/icons/Grid";
import List from "../../UI/icons/List";

function DasboardLeftWeek() {
  const { listOfHabits } = useSelector((state) => state.habits);
  const state = useSelector((state) => state.habits);
  const dispatch = useDispatch();

  const [thisPeriodpercentage, setThisPeriodpercentage] = useState(0);
  const [lastPeriodpercentage, setLastPeriodpercentage] = useState(0);
  let curr = new Date();
  let dayOfTheWeek = curr.getDay() ? curr.getDay() : 7;
  const timeIndex = state.timePeriod.timeIndex;

  const options = { weekday: "short", month: "short", day: "numeric" };
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthsShort = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const [showProgressBar, setShowProgressBar] = useState(false);
  const chosenWeek = state.timePeriod.chosenWeek;
  const chosenMonth = state.timePeriod.chosenMonth;
  const chosenYear = state.timePeriod.chosenYear;
  const chosenWeekBefore = state.timePeriod.chosenWeekBefore;
  const chosenMonthBefore = state.timePeriod.chosenMonthBefore;
  const chosenYearBefore = state.timePeriod.chosenYearBefore;
  const allTime = state.timePeriod.allTime;
  const type = state.timePeriod.type;
  let timeRange;
  let timeRangeBefore;

  switch (type) {
    case "Week":
      timeRange = chosenWeek;
      timeRangeBefore = chosenWeekBefore;
      break;
    case "Month":
      timeRange = chosenMonth;
      timeRangeBefore = chosenMonthBefore;
      break;
    case "Year":
      timeRange = chosenYear;
      timeRangeBefore = chosenYearBefore;
      break;
    case "AllTime":
      timeRange = allTime;
      timeRangeBefore = [];
      break;
  }

  useEffect(() => {
    if (type != "Week") setShowProgressBar(true);
  }, [type]);

  const startOfcurrentPeriod = new Date(timeRange[0]);
  const endOfcurrentPeriod = new Date(timeRange[1]);
  const startOfTheLastcurrentPeriod = new Date(timeRangeBefore[0]);
  const endOfTheLastcurrentPeriod = new Date(timeRangeBefore[1]);
  const startOfcurrentPeriodYear = startOfcurrentPeriod.getFullYear();
  const startOfcurrentPeriodMonth = startOfcurrentPeriod.getMonth();
  const startOfcurrentPeriodDay = startOfcurrentPeriod.getDate();

  const startOfcurrentPeriodFormatted = startOfcurrentPeriod.toLocaleString(
    "en-US",
    options
  );
  const endOfcurrentPeriodFormatted = endOfcurrentPeriod.toLocaleString(
    "en-US",
    options
  );

  let currentPeriodRange = `${startOfcurrentPeriodFormatted} - ${endOfcurrentPeriodFormatted}`;

  switch (type) {
    case "Week":
      currentPeriodRange = `${startOfcurrentPeriodFormatted} - ${endOfcurrentPeriodFormatted}`;
      break;
    case "Month":
      currentPeriodRange = `${months[startOfcurrentPeriodMonth]} ${startOfcurrentPeriodYear}`;
      break;
    case "Year":
      currentPeriodRange = `${startOfcurrentPeriodYear}`;
      break;
    case "AllTime":
      currentPeriodRange = `${monthsShort[startOfcurrentPeriodMonth]} ${startOfcurrentPeriodDay}, ${startOfcurrentPeriodYear} - Today`;
      break;
  }

  const daysOfTheWeek = (
    <div className={styles.days}>
      <div className={styles.day}>Mon</div>
      <div className={styles.day}>Tue</div>
      <div className={styles.day}>Wen</div>
      <div className={styles.day}>Thu</div>
      <div className={styles.day}>Fri</div>
      <div className={styles.day}>Sat</div>
      <div className={styles.day}>Sun</div>
    </div>
  );

  const completionPercentage = (listOfHabits, payload) => {
    let imputDateStart = new Date(payload[0]);
    let imputDateEnd = new Date(payload[1]);
    let Difference_In_Time_input =
      imputDateEnd.getTime() - imputDateStart.getTime();
    let Difference_In_Days_input =
      Difference_In_Time_input / (1000 * 3600 * 24) + 1;

    let Difference_In_Days = 0;
    let Difference_In_Time = 0;
    let itemDateStartDay = 0;

    let allDays = 0;
    let doneDays = 0;

    let dayOfTheWeek = 1;

    let IsdifferencePositive = true;

    listOfHabits.forEach((item) => {
      if (payload[2] === "" || payload[2] === item.name) {
        itemDateStartDay = new Date(item.startDay);
        Difference_In_Time =
          imputDateStart.getTime() - itemDateStartDay.getTime();
        Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        IsdifferencePositive = Difference_In_Days > 0;
        if (Difference_In_Days < 0) {
          dayOfTheWeek = itemDateStartDay.getDay()
            ? itemDateStartDay.getDay()
            : 7;
        } else {
          dayOfTheWeek = imputDateStart.getDay() ? imputDateStart.getDay() : 7;
        }

        if (Difference_In_Days + Difference_In_Days_input < 0) {
        } else {
          item.lastWeek
            .slice(
              Difference_In_Days < 0 ? 0 : Difference_In_Days,
              Difference_In_Days + Difference_In_Days_input
            )
            .forEach((day, j) => {
              if (item.activeDays.includes(dayOfTheWeek)) {
                allDays++;
                if (day === 1) {
                  doneDays++;
                }
              }
              if (dayOfTheWeek === 7) dayOfTheWeek = 1;
              else dayOfTheWeek++;
            });
        }
      }
    });
    return [
      allDays,
      doneDays,
      allDays === 0 && doneDays === 0
        ? 0
        : Math.round((doneDays / allDays) * 100),
    ];
  };

  useEffect(() => {
    setThisPeriodpercentage(
      completionPercentage(listOfHabits, [
        startOfcurrentPeriod,
        endOfcurrentPeriod,
        "",
      ])[2]
    );
    setLastPeriodpercentage(
      completionPercentage(listOfHabits, [
        startOfTheLastcurrentPeriod,
        endOfTheLastcurrentPeriod,
        "",
      ])[2]
    );
  });

  return (
    <div className={styles.container}>
      <div className={styles["main-top"]}>
        <div className={styles["left"]}>
          <div className={styles.buttons}>
            <button
              className={
                lastPeriodpercentage
                  ? styles["button"]
                  : styles["button-unactive"]
              }
              onClick={() => {
                lastPeriodpercentage ? dispatch(dateIndexChanger(1)) : null;
              }}
            >
              <ChevronLeft />
            </button>
            <button
              className={
                timeIndex ? styles["button"] : styles["button-unactive"]
              }
              onClick={() => {
                timeIndex ? dispatch(dateIndexChanger(-1)) : null;
              }}
            >
              <ChevronRight />
            </button>
          </div>
          <h2 className={styles["font-size-2rem"]}>{currentPeriodRange}</h2>
        </div>
        <div className={styles["current-and-buttons"]}>
          {timeIndex > 0 && (
            <p
              className={styles.skip}
              onClick={() => {
                timeIndex ? dispatch(dateIndexChanger(-timeIndex)) : null;
              }}
            >
              Current
            </p>
          )}
          <li
            className={
              type === "Week"
                ? styles["view-selector"]
                : styles["view-selector-week"]
            }
          >
            {type === "Week" && (
              <ul
                className={
                  showProgressBar
                    ? styles["view-button"]
                    : styles["view-button-picked"]
                }
                onClick={() => setShowProgressBar(false)}
              >
                <Grid />
              </ul>
            )}
            <ul
              className={
                showProgressBar
                  ? styles["view-button-picked"]
                  : styles["view-button"]
              }
              onClick={() => setShowProgressBar(true)}
            >
              <List />
            </ul>
          </li>
        </div>
      </div>
      <div className={styles["overall-progress"]}>
        <div className={styles["progress-bar2"]}>
          <ProgressBar size={true} value={thisPeriodpercentage} key={"key"} />
        </div>
        <div className={styles["overall-progress-percentage-comparison"]}>
          <p>
            {thisPeriodpercentage - lastPeriodpercentage < 0
              ? `Down ${lastPeriodpercentage - thisPeriodpercentage}`
              : `Up ${thisPeriodpercentage - lastPeriodpercentage}`}
            % from the week before
          </p>
          <p>{thisPeriodpercentage}% achieved</p>
        </div>
      </div>
      <div>
        <div className={styles.week}>
          <div></div>
          {!showProgressBar && type === "Week" ? daysOfTheWeek : <></>}
          <div></div>
        </div>
        {listOfHabits.map((habbit) => {
          let isEmpty = completionPercentage(listOfHabits, [
            timeRange[0],
            timeRange[1],
            habbit.name,
          ])[0];
          if (isEmpty || timeIndex === 0) {
            return (
              <DashboardLeftHabit
                key={habbit.name}
                name={habbit.name}
                startDay={habbit.startDay}
                activeDays={habbit.activeDays}
                lastWeek={habbit.lastWeek}
                dayOfTheWeek={dayOfTheWeek}
                habitType={habbit.habitType}
                whichWeek={timeIndex}
                showProgressBar={showProgressBar}
                type={type}
                completionPercentage={completionPercentage(listOfHabits, [
                  timeRange[0],
                  timeRange[1],
                  habbit.name,
                ])}
              />
            );
          }
        })}
      </div>
    </div>
  );
}

export default DasboardLeftWeek;
