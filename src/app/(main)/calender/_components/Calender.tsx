"use client";
import {
  currentMonthNumber,
  currentYear,
  days,
  getDatesInMonth,
  getMonthAbbreviation,
  getStartingDayOfMonth,
} from "@/utils/Data";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import DayCard from "./DayCard";

const Calender = () => {
  const [month, setMonth] = useState(currentMonthNumber());
  const [year, setYear] = useState(currentYear());

  const handlePrev = () => {
    if (month === 1) {
      setMonth(12);
      setYear(year - 1);
    } else {
      setMonth(() => month - 1);
    }
  };

  const handleNext = () => {
    if (month === 12) {
      setMonth(1);
      setYear(year + 1);
    } else {
      setMonth(() => month + 1);
    }
  };

  return (
    <div className=" duration-700 h-[95%] bg-white dark:bg-[#35374B] dark:text-gray-100 rounded-xl w-[96%]">
      <div className="flex justify-between p-4">
        <div className="flex gap-2">
          <div
            className="bg-[#EDEDEF] dark:bg-[#2C293D] rounded-full p-2 cursor-pointer"
            onClick={() => handlePrev()}
          >
            <ChevronLeft />
          </div>
          <div
            className="bg-[#EDEDEF] dark:bg-[#2C293D] rounded-full p-2 cursor-pointer"
            onClick={() => handleNext()}
          >
            <ChevronRight />
          </div>
        </div>
        <div className="text-3xl font-semibold  pr-2">
          {getMonthAbbreviation(month)} {year}
        </div>
      </div>
      <div className=" h-[86%] overflow-y-scroll">
        <div className="flex justify-start pl-14 text-lg pt-8 gap-8 font-semibold">
          {days().map((item) => (
            <span className=" w-[11%] h-10 " key={item}>
              {item}
            </span>
          ))}
        </div>
        <div className="flex justify-start gap-x-8 pl-14 gap-y-5 flex-wrap  pt-10">
          {getStartingDayOfMonth(month, year).map((index) => (
            <span key={index} className="h-24 w-[11%] ">
              <span></span>
            </span>
          ))}
          {getDatesInMonth(month, year).map((index) => (
            <span key={index} className="h-24 w-[11%] ">
              <DayCard index={index} />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calender;
