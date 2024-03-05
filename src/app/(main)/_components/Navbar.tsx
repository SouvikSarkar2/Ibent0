"use client";
import ThemeSwitch from "@/components/ThemeSwitch";
import { BellOff } from "lucide-react";
import Image from "next/image";
import User from "./User";
import { useUserIdStore } from "@/store";
import { useEffect } from "react";

const Navbar = ({ id }: { id: string | undefined }) => {
  const { userId, setUserId } = useUserIdStore();
  useEffect(() => {
    setUserId(id);
  }, [id]);
  // console.log("userId :", userId);

  return (
    <div className="h-[8vh] rounded-xl flex justify-between bg-gray-200  m-2 mb-1.5 items-center dark:bg-[#2C293D] text-black dark:text-gray-300 duration-100">
      <div className="p-2 pl-4 dark:hidden">
        <Image height={38} width={38} src={"/logo-light.png"} alt="" />
      </div>
      <div className="p-2 pl-4 hidden dark:flex">
        <Image height={38} width={38} src={"/logo-dark.png"} alt="" />
      </div>
      <div></div>
      <div className="flex gap-2.5 px-2.5">
        <div className="flex cursor-pointer justify-center items-center bg-gray-300 dark:bg-[#15141A] rounded-xl border-2 dark:border-gray-400 border-black px-4">
          <ThemeSwitch />
        </div>
        <div className="flex cursor-pointer justify-center items-center bg-gray-300 dark:bg-[#15141A] rounded-xl border-2 dark:border-gray-400 border-black px-4">
          <BellOff size={18} />
        </div>
        <User />
      </div>
    </div>
  );
};

export default Navbar;
