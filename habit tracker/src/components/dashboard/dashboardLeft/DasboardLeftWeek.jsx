import React, { useEffect, useState } from "react";
import styles from "./DasboardLeftWeek.module.css";
import DashboardLeftHabit from "./DashboardLeftHabit";
import { useDispatch, useSelector } from "react-redux";
import ProgressBar from "../../UI/ProgressBar";
import { dateIndexChanger } from "../../../redux/habits";

function DasboardLeftWeek() {
  const { listOfHabits } = useSelector((state) => state.habits);
  const State = useSelector((state) => state.habits);
  // console.log(State.timePeriod);
  const dispatch = useDispatch();

  const [thisPeriodpercentage, setThisPeriodpercentage] = useState(0);
  const [lastPeriodpercentage, setLastPeriodpercentage] = useState(0);
  let curr = new Date();
  let dayOfTheWeek = curr.getDay() ? curr.getDay() : 7;
  const timeIndex = State.timePeriod.timeIndex;

  const options = { weekday: "short", month: "short", day: "numeric" };
  const [showProgressBar, setShowProgressBar] = useState(false);
  const chosenWeek = State.timePeriod.chosenWeek;
  const chosenMonth = State.timePeriod.chosenMonth;
  const chosenYear = State.timePeriod.chosenYear;
  const chosenWeekBefore = State.timePeriod.chosenWeekBefore;
  const chosenMonthBefore = State.timePeriod.chosenMonthBefore;
  const chosenYearBefore = State.timePeriod.chosenYearBefore;
  const allTime = State.timePeriod.allTime;
  const type = State.timePeriod.type;
  let timeRange = ["2023-03-01", "2023-03-12"];
  let timeRangeBefore = ["2023-03-01", "2023-03-12"];

  switch (type) {
    case "Week":
      console.log("Week");
      timeRange = chosenWeek;
      timeRangeBefore = chosenWeekBefore;
      break;
    case "Month":
      console.log("Month");
      timeRange = chosenMonth;
      timeRangeBefore = chosenMonthBefore;
      break;
    case "Year":
      console.log("Year");
      timeRange = chosenYear;
      timeRangeBefore = chosenYearBefore;
      break;
    case "AllTime":
      console.log("AllTime");
      timeRange = allTime;
      break;
  }

  const startOfcurrentPeriod = new Date(timeRange[0]);
  const endOfcurrentPeriod = new Date(timeRange[1]);
  const startOfTheLastcurrentPeriod = new Date(timeRangeBefore[0]);
  const endOfTheLastcurrentPeriod = new Date(timeRangeBefore[1]);

  const startOfcurrentPeriodFormatted = startOfcurrentPeriod.toLocaleString(
    "en-US",
    options
  );
  const endOfcurrentPeriodFormatted = endOfcurrentPeriod.toLocaleString(
    "en-US",
    options
  );
  const currentPeriodRange = `${startOfcurrentPeriodFormatted} - ${endOfcurrentPeriodFormatted}`;

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
        console.log("---------------------");
        if (Difference_In_Days + Difference_In_Days_input < 0) {
        } else {
          item.lastWeek
            .slice(
              Difference_In_Days < 0 ? 0 : Difference_In_Days,
              Difference_In_Days + Difference_In_Days_input
            )
            .map((day, j) => {
              if (item.activeDays.includes(dayOfTheWeek)) {
                allDays++;
                if (day === 1) {
                  doneDays++;
                }
              }
              if (dayOfTheWeek === 7) dayOfTheWeek = 0;
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
  // console.log(listOfHabits);

  // console.log(thisWeekpercentage);

  return (
    <div className={styles.container}>
      <div className={styles["main-top"]}>
        <div>
          <button onClick={() => dispatch(dateIndexChanger(1))}>◀</button>
          <button onClick={() => dispatch(dateIndexChanger(-1))}>▶</button>
        </div>
        <h2>{currentPeriodRange}</h2>
        <div>
          <button onClick={() => setShowProgressBar(false)}>1️⃣</button>
          <button onClick={() => setShowProgressBar(true)}>2️⃣</button>
        </div>
      </div>
      <div className={styles["overall-progress"]}>
        <ProgressBar value={thisPeriodpercentage} key={"key"} />
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
          return (
            <DashboardLeftHabit
              key={habbit.name}
              name={habbit.name}
              startDay={habbit.startDay}
              activeDays={habbit.activeDays}
              lastWeek={habbit.lastWeek}
              dayOfTheWeek={dayOfTheWeek}
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
        })}
      </div>
    </div>
  );
}

export default DasboardLeftWeek;
