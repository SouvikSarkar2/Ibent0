"use client";

import Link from "next/link";
import { formatEventTime } from "./FilterEvents";

const DayCard = ({ index, events }: { index: number; events: any }) => {
  return (
    <div className=" h-full w-full">
      <div className=" border-t-2 border-black dark:border-gray-100 text-xl py-1 pl-2 font-semibold w-[60%]">
        {index}
      </div>
      {events.slice(0, 4).map((event: any) => (
        <Link key={event.id} href={`/events/${event.id}`}>
          {" "}
          <div
            key={event.id}
            className={`text-sm font-urbanist rounded-sm p-0.5 ${
              event.type === "Work" &&
              "bg-red-200 text-red-600 border-2 border-red-600"
            } ${
              event.type === "Personal" &&
              "bg-sky-200 text-sky-600 border-2 border-sky-600"
            } ${
              event.type === "Social" &&
              "bg-green-200 text-green-600 border-2 border-green-600"
            }`}
          >
            <div>{event.title}</div>
            <div>{formatEventTime(event.hr, event.mn, event.duration)}</div>
          </div>
        </Link>
      ))}
      {events.length > 4 && (
        <div className="text-gray-300 text-xs uppercase italic text-center">
          ...AND MORE...
        </div>
      )}
    </div>
  );
};

export default DayCard;
