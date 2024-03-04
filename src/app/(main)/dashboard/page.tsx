import { CalendarDays, ChevronDown } from "lucide-react";

const page = () => {
  return (
    <div>
      <div className=" h-[10vh] flex justify-between items-end pb-4 px-2 ">
        <div className="text-3xl font-medium ">Dashboard</div>
        <div className="flex gap-6 px-4">
          <div className="flex gap-4 bg-white dark:bg-[#35374B] rounded-full px-3 items-center py-1 text-sm">
            <div>Today</div>
            <div>Week</div>
            <div className="bg-[#EDEDEF] dark:bg-[#2C293D] rounded-full px-2 py-1.5">
              Month
            </div>
            <div>Year</div>
          </div>
          <div className="flex bg-white dark:bg-[#35374B]  rounded-full items-center px-4 py-1 gap-2">
            <CalendarDays />
            18 jun,2024 - 18 jul,2024
            <div className="bg-[#EDEDEF] dark:bg-[#2C293D] rounded-full py-1">
              <ChevronDown />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-200 dark:bg-[#2C293D] h-[78vh] flex">
        <div className="w-[79%]  flex flex-col justify-evenly items-center">
          <div className="bg-white dark:bg-[#35374B] h-[48%] w-[98%] rounded-xl"></div>
          <div className="flex w-[98%] h-[48%] justify-between gap-3">
            <div className="bg-white dark:bg-[#35374B] w-[70%] rounded-xl"></div>
            <div className="bg-white dark:bg-[#35374B] w-[30%] rounded-xl"></div>
          </div>
        </div>
        <div className="w-[20%] bg-white dark:bg-[#35374B] my-3 rounded-xl"></div>
      </div>
    </div>
  );
};

export default page;
