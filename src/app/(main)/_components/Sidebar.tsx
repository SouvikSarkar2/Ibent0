"use client";

import { ArrowLeft, Briefcase, Calendar, Plus, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/calender", text: "Calender" },
  { href: "/allevent", text: "All Event" },
  { href: "/events", text: "Add Event" },
  { href: "/users/user", text: "User" },
];

const Sidebar = () => {
  const [isActive, setIsActive] = useState<null | number>(null);
  const pathname = usePathname();
  // console.log(pathname);
  return (
    <div
      className={` bg-gray-200 dark:bg-primary rounded-3xl w-[15%] dark:text-text flex flex-col items-center gap-3 ${
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
          className={` w-[90%] py-3 pl-2 rounded-xl ${
            isActive === index
              ? "bg-white dark:bg-[#494c62]"
              : "bg-gray-300 dark:bg-[#2C293D]"
          }`}
        >
          <div className="flex gap-2">
            {index === 0 && <Calendar />}
            {index === 1 && <Briefcase />}
            {index === 2 && <Plus />}
            {index === 3 && <User />}

            {link.text}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
