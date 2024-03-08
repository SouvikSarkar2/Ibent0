"use client";

import {
  ArrowLeft,
  CalendarRange,
  CircleUserRound,
  GanttChartSquare,
  PlusCircle,
} from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/calender", text: "Calender" },
  { href: "/allevent", text: "Pending" },
  { href: "/events", text: "Add Event" },
  { href: "/user", text: "User" },
];

const Sidebar = () => {
  const [isActive, setIsActive] = useState<null | number>(null);
  const pathname = usePathname();
  // console.log(pathname);
  return (
    <div
      className={` bg-gray-200 dark:bg-[#2C293D] border-r-4 border-white dark:border-[#020817] rounded-xl w-[15%] dark:text-text flex flex-col items-center gap-3 ${
        pathname === "/dashboard" ? "pt-10" : ""
      }`}
    >
      {pathname !== "/dashboard" && (
        <div className="flex py-4 px-3 w-[90%]">
          <Link
            href={"/dashboard"}
            className="bg-gray-300 dark:bg-[#2C293D] p-1 rounded-full"
            onClick={() => setIsActive(null)}
          >
            <ArrowLeft />
          </Link>
        </div>
      )}
      {links.map((link, index) => (
        <Link
          key={index}
          href={link.href}
          onClick={() => setIsActive(index)}
          className={`hover:bg-white hover:pl-12  dark:hover:bg-[#494c62] duration-500  w-[90%] py-3 pl-3 rounded-xl font-bold font-urbanist uppercase text-md ${
            isActive === index
              ? "bg-white dark:bg-[#494c62] "
              : " bg-inherit dark:bg-inherit"
          }`}
        >
          <div className=" ease-in-out flex gap-2">
            {index === 0 && <CalendarRange />}
            {index === 1 && <GanttChartSquare />}
            {index === 2 && <PlusCircle />}
            {index === 3 && <CircleUserRound />}

            {link.text}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
