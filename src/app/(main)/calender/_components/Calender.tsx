"use client";
import { useUserIdStore } from "@/store";
import client from "@/utils/apolloClient";
import { gql, useMutation, useQuery } from "@apollo/client";
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
import { Skeleton } from "@/components/ui/skeleton";
import { filterEventsForDay, filterEventsByMonthAndYear } from "./FilterEvents";

const GET_EVENTS = gql`
  query Events($userId: String!) {
    events(id: $userId) {
      title
      id
      date
      type
      hr
      mn
      duration
    }
  }
`;

const Calender = () => {
  const { userId } = useUserIdStore();
  const [month, setMonth] = useState<number>(currentMonthNumber());
  const [year, setYear] = useState<number>(currentYear());

  const { loading, error, data } = useQuery(GET_EVENTS, {
    variables: { userId: userId },
    client: client,
  });

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

  if (loading)
    return (
      <div className=" h-[95%] bg-white dark:bg-[#35374B] dark:text-gray-100 rounded-xl w-[96%]">
        <div className="flex justify-between p-4">
          <div className="flex gap-2">
            <Skeleton className="bg-[#EDEDEF] dark:bg-[#2C293D] rounded-full h-10 w-10 cursor-pointer"></Skeleton>
            <Skeleton className="bg-[#EDEDEF] dark:bg-[#2C293D] rounded-full h-10 w-10 cursor-pointer"></Skeleton>
          </div>
          <Skeleton className="w-[200px] h-10"></Skeleton>
        </div>
        <div className=" h-[86%] overflow-y-scroll">
          <div className="flex justify-start pl-14 text-lg pt-8 gap-8 font-semibold">
            {days().map((item) => (
              <Skeleton className=" w-[11%] h-10 " key={item}></Skeleton>
            ))}
          </div>
          <div className="flex justify-start gap-x-8 pl-14 gap-y-5 flex-wrap  pt-10">
            {getStartingDayOfMonth(month, year).map((index) => (
              <Skeleton key={index} className="h-24 w-[11%] ">
                <span></span>
              </Skeleton>
            ))}
            {getDatesInMonth(month, year).map((index) => (
              <Skeleton key={index} className=" min-h-24 w-[11%] "></Skeleton>
            ))}
          </div>
        </div>
      </div>
    );
  if (error) return <p>Error: {error.message}</p>;
  const filteredEvents = filterEventsByMonthAndYear(data.events, month, year);

  return (
    <div className=" h-[95%] bg-white dark:bg-[#35374B] dark:text-gray-100 rounded-xl w-[96%]">
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
            <span key={index} className=" min-h-24 w-[11%] ">
              <DayCard
                index={index}
                events={filterEventsForDay(filteredEvents, index)}
              />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calender;
