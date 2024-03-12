"use client";

import {
  ArrowLeft,
  CalendarRange,
  CircleUserRound,
  GanttChartSquare,
  LayoutDashboard,
  PlusCircle,
} from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/dashboard", text: "Dashboard" },
  { href: "/calender", text: "Calender" },
  { href: "/allevent", text: "Pending" },
  { href: "/events", text: "Add Event" },
  { href: "/user", text: "User" },
];

const Sidebar = () => {
  const pathname = usePathname();
  console.log(pathname);
  const [isActive, setIsActive] = useState<string | null>();
  useEffect(() => {
    setIsActive(pathname);
  }, [pathname]);
  return (
    <div
      className={` bg-gray-200 dark:bg-[#2C293D] border-r-4 border-white dark:border-[#020817] rounded-xl w-[15%] dark:text-text flex flex-col items-center gap-3 
        pt-10`}
    >
      {links.map((link, index) => (
        <Link
          key={index}
          href={link.href}
          onClick={() => setIsActive(link.href)}
          className={`hover:bg-white hover:pl-12  dark:hover:bg-[#494c62] duration-500  w-[90%] py-3 pl-3 rounded-xl font-bold font-urbanist uppercase text-md ${
            isActive === link.href
              ? "bg-white dark:bg-[#494c62] "
              : " bg-inherit dark:bg-inherit"
          }`}
        >
          <div className=" ease-in-out flex gap-2">
            {link.href === "/dashboard" && <LayoutDashboard />}
            {link.href === "/calender" && <CalendarRange />}
            {link.href === "/allevent" && <GanttChartSquare />}
            {link.href === "/events" && <PlusCircle />}
            {link.href === "/user" && <CircleUserRound />}

            {link.text}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
