"use client";
import ThemeSwitch from "@/components/ThemeSwitch";
import { BellOff } from "lucide-react";
import Image from "next/image";
import User from "./User";
import { useUserIdStore } from "@/store";
import { useEffect } from "react";
import Link from "next/link";

const Navbar = ({ id }: { id: string | undefined }) => {
  const { userId, setUserId } = useUserIdStore();
  useEffect(() => {
    setUserId(id);
  }, [id]);
  // console.log("userId :", userId);

  return (
    <div className="h-[8vh] rounded-xl flex justify-between bg-gray-200  m-2 mb-1.5 items-center dark:bg-[#2C293D] text-black dark:text-gray-300 duration-100">
      <Link href={"/"} className="p-2 pl-6 dark:hidden ">
        <Image height={48} width={68} src={"/logo-dark2.png"} alt="" />
      </Link>
      <Link href={"/"} className="p-2 pl-6 hidden dark:flex">
        <Image height={48} width={68} src={"/logo-light2.png"} alt="" />
      </Link>
      <div></div>
      <div className="flex gap-2.5 px-2.5">
        <ThemeSwitch />

        <div className="flex cursor-pointer justify-center items-center bg-gray-300 dark:bg-[#15141A] rounded-xl border-2 dark:border-gray-400 border-black px-4">
          <BellOff size={18} />
        </div>
        <User />
      </div>
    </div>
  );
};

export default Navbar;
