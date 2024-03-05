"use client";

import { Trash2 } from "lucide-react";

const RecentEventCard = ({ event }) => {
  return (
    <div className=" border-b-2 border-black flex justify-between h-[50px]">
      <div className="w-[30%]  flex items-center">{event.date}</div>
      <div className="w-[50%] flex items-center">{event.title}</div>
      <div className="w-[30%] flex items-center justify-end">{event.type}</div>
      <div className="flex justify-center items-center px-2 m-2 rounded-xl cursor-pointer hover:bg-red-400 text-red-500 hover:text-black">
        <Trash2 />
      </div>
    </div>
  );
};

export default RecentEventCard;
