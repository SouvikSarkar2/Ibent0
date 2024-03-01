"use client";

import { useEffect, useState } from "react";

const TimeFunction = () => {
  const [time, setTime] = useState(getFormattedTime());
  const [date, setDate] = useState(getFormattedDate());

  useEffect(() => {
    const timeId = setTimeout(() => {
      setTime(getFormattedTime());
    }, 1000);

    const dateId = setTimeout(() => {
      setDate(getFormattedDate());
    }, 60000);

    return () => {
      clearTimeout(timeId);
      clearTimeout(dateId);
    };
  }, [time, date]);

  function getFormattedDate() {
    const months = [
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
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = months[currentDate.getMonth()];
    return `${day} ${month}`;
  }

  function getFormattedTime() {
    const currentDate = new Date();
    const hours = currentDate.getHours();
    const ampm = hours >= 12 ? "PM" : "AM";
    const adjustedHours = (hours % 12 || 12).toString().padStart(2, "0"); // Pad single-digit hours
    const minutes = currentDate.getMinutes().toString().padStart(2, "0"); // Pad single-digit minutes
    const seconds = currentDate.getSeconds().toString().padStart(2, "0"); // Pad single-digit seconds
    return `${adjustedHours}:${minutes}:${seconds} ${ampm}`;
  }

  return (
    <div className="border-l-4 border-slate-100 text-slate-100">
      <div className="font-bold uppercase text-4xl p-4">{date}</div>
      <div className=" rounded-lg p-2">
        <div className=" p-2">{time}</div>
      </div>
    </div>
  );
};

export default TimeFunction;
