import ThemeSwitch from "@/components/ThemeSwitch";
import { BellOff, PenLine, Settings } from "lucide-react";
import { getServerSession } from "next-auth";
import Image from "next/image";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import SignoutButton from "./SignoutButton";

const Navbar = async () => {
  const session = await getServerSession();
  console.log("session from navbar : ", session);
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
        <div className="bg-[#15141A] rounded-xl overflow-hidden h-[50px] w-[50px]">
          <Popover>
            <PopoverTrigger>
              <Image
                width={50}
                height={50}
                alt=""
                src={`${session?.user?.image}`}
              />
            </PopoverTrigger>
            <PopoverContent className="mr-2 mt-2 w-auto h-[200px] bg-gray-300 dark:bg-[#35374B] relative">
              <div className="w-full h-full">
                <div className="w-full flex justify-center items-end">
                  <div className="rounded-xl h-[50px] w-[50px] overflow-hidden">
                    <Image
                      width={50}
                      height={50}
                      alt=""
                      src={`${session?.user?.image}`}
                    />
                  </div>
                </div>
                <div className=" font-urbanist h-[30px] flex justify-center items-center">
                  {session?.user?.name}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  {session?.user?.email}
                </div>
                <div className=" w-[95%] absolute bottom-1 right-1 flex gap-1 justify-end items-end pb-1 text-black">
                  <div className="flex items-center">
                    <div className="bg-yellow-400 rounded-md  h-[30px] w-[30px] flex justify-center items-center">
                      <Settings />
                    </div>
                  </div>
                  <div
                    className="flex justify-center items-center h-[30px] w-[70px]  font-urbanist
                   bg-slate-400 rounded-lg text-md"
                  >
                    <div className="flex justify-center text-sm items-center">
                      EDIT
                      <PenLine size={18} />
                    </div>
                  </div>
                  <div className="">
                    <SignoutButton />
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
