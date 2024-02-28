import { CalendarDays, ChevronDown } from "lucide-react";

const page = () => {
  return (
    <div>
      <div className=" h-[10vh] flex justify-between items-end pb-4 px-2">
        <div className="text-3xl font-medium">Dashboard</div>
        <div className="flex gap-6 px-4">
          <div className="flex gap-4 bg-white rounded-full px-3 items-center py-1 text-sm">
            <div>Today</div>
            <div>Week</div>
            <div className="bg-[#EDEDEF] rounded-full px-2 py-1.5">Month</div>
            <div>Year</div>
          </div>
          <div className="flex bg-white rounded-full items-center px-4 py-1 gap-2">
            <CalendarDays />
            18 jun,2024 - 18 jul,2024
            <div className="bg-[#EDEDEF] rounded-full py-1">
              <ChevronDown />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#EDEDEF] h-[78vh] flex">
        <div className="w-[78%]  flex flex-col justify-evenly items-center">
          <div className="bg-white h-[47%] w-[98%] rounded-xl"></div>
          <div className="flex w-[98%] h-[47%] justify-between gap-3">
            <div className="bg-white w-[70%] rounded-xl"></div>
            <div className="bg-white w-[30%] rounded-xl"></div>
          </div>
        </div>
        <div className="w-[20%] bg-white my-3 rounded-xl"></div>
      </div>
    </div>
  );
};

export default page;
