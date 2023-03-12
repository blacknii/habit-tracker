import React, { useEffect, useState } from "react";
import styles from "./DasboardLeftWeek.module.css";
import DashboardLeftHabit from "./DashboardLeftHabit";
import { useDispatch, useSelector } from "react-redux";
import ProgressBar from "../../UI/ProgressBar";

function DasboardLeftWeek() {
  const { listOfHabits } = useSelector((state) => state.habits);
  const dispatch = useDispatch();

  let curr = new Date();
  let dayOfTheWeek = curr.getDay() ? curr.getDay() : 7;

  const types = ["Week", "Month", "Year", "AllTime"];

  const [whichWeek, setWhichWeek] = useState(0);
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [thisWeekpercentage, setThisWeekpercentage] = useState(0);
  const [lastWeekpercentage, setLastWeekpercentage] = useState(0);
  const [type, setType] = useState(types[1]);
  const [timeRange, setTimeRange] = useState(["2023-03-01", "2023-03-12"]);

  const options = { weekday: "short", month: "short", day: "numeric" };
  const today = new Date();
  const today2 = new Date();
  const startOfWeek = new Date(
    today.setDate(
      today.getDate() - (today.getDay() ? today.getDay() : 6) - 7 * whichWeek
    )
  );
  const endOfWeek = new Date(
    today.setDate(today.getDate() - today.getDay() + 7)
  );
  const startOfTheLastWeek = new Date(
    today2.setDate(
      today2.getDate() -
        (today.getDay() ? today.getDay() : 6) -
        7 -
        7 * whichWeek
    )
  );
  const endOfTheLastWeek = new Date(
    today2.setDate(today2.getDate() - today2.getDay() + 7)
  );

  const startOfWeekFormatted = startOfWeek.toLocaleString("en-US", options);
  const endOfWeekFormatted = endOfWeek.toLocaleString("en-US", options);
  const weekRange = `${startOfWeekFormatted} - ${endOfWeekFormatted}`;

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

    let x;

    listOfHabits.forEach((item, i) => {
      if (payload[2] === "" || payload[2] === item.name) {
        x = new Date();
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
    setThisWeekpercentage(
      completionPercentage(listOfHabits, [startOfWeek, endOfWeek, ""])[2]
    );
    setLastWeekpercentage(
      completionPercentage(listOfHabits, [
        startOfTheLastWeek,
        endOfTheLastWeek,
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
          <button onClick={() => setWhichWeek(whichWeek + 1)}>◀</button>
          <button onClick={() => setWhichWeek(whichWeek - 1)}>▶</button>
        </div>
        <h2>{weekRange}</h2>
        <div>
          <button onClick={() => setShowProgressBar(false)}>1️⃣</button>
          <button onClick={() => setShowProgressBar(true)}>2️⃣</button>
        </div>
      </div>
      <div className={styles["overall-progress"]}>
        <ProgressBar value={thisWeekpercentage} key={"key"} />
        <div className={styles["overall-progress-percentage-comparison"]}>
          <p>
            {thisWeekpercentage - lastWeekpercentage < 0
              ? `Down ${lastWeekpercentage - thisWeekpercentage}`
              : `Up ${thisWeekpercentage - lastWeekpercentage}`}
            % from the week before
          </p>
          <p>{thisWeekpercentage}% achieved</p>
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
              whichWeek={whichWeek}
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
