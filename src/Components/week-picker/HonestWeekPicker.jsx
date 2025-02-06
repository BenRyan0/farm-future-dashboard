import React, { useState, useEffect } from "react";
import '../css/weekSelector.css';
import { v4 } from "uuid";
import { ArrowLeft } from "./ArrowLeft";
import { ArrowRight } from "./ArrowRight";
import { addMonths, endOfWeek, startOfWeek, subMonths } from "date-fns";
import { getDaysInMonth } from "date-fns";

const HonestWeekPicker = ({ onChange }) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [week, setWeek] = useState({
    firstDay: startOfWeek(new Date(), { weekStartsOn: 1 }),
    lastDay: endOfWeek(new Date(), { weekStartsOn: 1 })
  });

  useEffect(() => {
    onChange && onChange(week);
  }, [week, onChange]);

  const isLeapYear = () => {
    let leapYear = new Date(new Date().getFullYear(), 1, 29);
    return leapYear.getDate() === 29;
  };

  const convertDate = (date) => {
    let dt = new Date(date);
    return `${dt.getDate()}.${dt.getMonth() + 1}.${dt.getFullYear()}.`;
  };

  const handleClick = (e) => {
    let localDate;
    if (e.target.id.includes("prev")) {
      localDate = new Date(date.setDate(1));
    } else if (e.target.id.includes("next")) {
      localDate = new Date(date.setDate(getDaysInMonth(date)));
    } else {
      localDate = new Date(date.setDate(e.target.id));
    }

    const selectedFirstDay = startOfWeek(localDate, { weekStartsOn: 1 });
    const selectedLastDay = endOfWeek(localDate, { weekStartsOn: 1 });

    // Get the current week's first and last day
    const currentWeekFirstDay = startOfWeek(new Date(), { weekStartsOn: 1 });
    const currentWeekLastDay = endOfWeek(new Date(), { weekStartsOn: 1 });

    // Prevent selecting a future week
    if (selectedFirstDay > currentWeekLastDay) {
      return; // Exit if the selected week is in the future
    }

    setDate(new Date(localDate));
    setWeek({ firstDay: selectedFirstDay, lastDay: selectedLastDay });
  };

  const months = [
    "Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun", "July", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."
  ];

  const days = {
    "1": 31, "2": isLeapYear() ? 29 : 28, "3": 31, "4": 30,
    "5": 31, "6": 30, "7": 31, "8": 31, "9": 30, "10": 31,
    "11": 30, "12": 31
  };

  const renderDays = () => {
    let month = date.getMonth() + 1;
    let dayElements = [];
    for (let i = 1; i <= days[month]; i++) {
      let currentDate = new Date(date).setDate(i);
      let cName = "single-number ";
      if (
        new Date(week.firstDay).getTime() <= currentDate &&
        currentDate <= new Date(week.lastDay).getTime()
      ) {
        cName += "selected-week";
      }
      dayElements.push(
        <div key={v4()} id={i} className={cName} onClick={handleClick}>
          {i}
        </div>
      );
    }

    const displayDate = new Date(date).setDate(1);
    let dayOfWeek = new Date(displayDate).getDay();
    if (dayOfWeek < 1) dayOfWeek = 7;

    let prevMonthDays = date.getMonth() === 0 ? 12 : date.getMonth();
    let prevMonthElements = [];
    for (let i = dayOfWeek; i > 1; i--) {
      let previousMonthDate = new Date(date).setMonth(date.getMonth() - 1);
      let currentDate = new Date(previousMonthDate).setDate(days[prevMonthDays] - i + 2);
      let cName = "single-number other-month";
      if (
        new Date(week.firstDay).getTime() <= currentDate &&
        currentDate <= new Date(week.lastDay).getTime()
      ) {
        cName += " selected-week";
      }
      prevMonthElements.push(
        <div key={v4()} id={"prev-" + i} className={cName} onClick={handleClick}>
          {days[prevMonthDays] - i + 2}
        </div>
      );
    }

    let nextMonthElements = [];
    let totalDays = prevMonthElements.length + dayElements.length > 35 ? 42 : 35;
    for (let i = 1; i <= totalDays - (prevMonthElements.length + dayElements.length); i++) {
      let cName = "single-number other-month";
      if (
        new Date(date).getDate() + i > week.lastDay.getDate() &&
        week.firstDay.getMonth() === date.getMonth()
      ) {
        cName += " selected-week";
      }
      nextMonthElements.push(
        <div key={v4()} id={"next-" + i} className={cName} onClick={handleClick}>
          {i}
        </div>
      );
    }

    return [...prevMonthElements, ...dayElements, ...nextMonthElements];
  };

  const handleDate = (next) => {
    const updatedDate = next ? addMonths(date, 1) : subMonths(date, 1);
    setDate(new Date(updatedDate));
  };

  return (
    <div
      className="week-picker-display"
      onBlur={() => setOpen(false)}
      onClick={() => setOpen(true)}
      tabIndex={0}
    >
      <p>
        {convertDate(week.firstDay)} - {convertDate(week.lastDay)}
      </p>
      {open && (
        <div className="week-picker-options">
          <div className="title-week">
            <div onClick={() => handleDate(false)} className="arrow-container">
              {ArrowLeft}
            </div>
            {`${months[date.getMonth()]} ${date.getFullYear()}.`}
            <div onClick={() => handleDate(true)} className="arrow-container">
              {ArrowRight}
            </div>
          </div>
          <div className="numbers-container">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
              <div key={day} className="single-number day">{day}</div>
            ))}
          </div>
          <div className="numbers-container">{renderDays()}</div>
        </div>
      )}
    </div>
  );
};

export default HonestWeekPicker;
