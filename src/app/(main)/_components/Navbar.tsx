import ThemeSwitch from "@/components/ThemeSwitch";
import { Bell, Moon } from "lucide-react";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="h-[10vh] flex justify-between items-center dark:bg-[#21212D] text-black dark:text-text">
      <div className="p-2">
        <Image height={75} width={75} src={"/logo-black.png"} alt="" />
      </div>
      <div>
        <div className="bg-slate-200 dark:bg-[#15141A] w-[500px] p-2 px-4  rounded-full">
          Search
        </div>
      </div>
      <div className="flex gap-6 px-6">
        <div className="flex justify-center items-center bg-slate-200 dark:bg-[#15141A] rounded-full px-4">
          <ThemeSwitch />
        </div>
        <div className="flex justify-center items-center bg-slate-200 dark:bg-[#15141A] rounded-full px-4 ">
          <Bell size={18} />
        </div>
        <div className="bg-[#15141A] rounded-full overflow-hidden">
          <Image width={50} height={50} alt="" src={"/"} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
