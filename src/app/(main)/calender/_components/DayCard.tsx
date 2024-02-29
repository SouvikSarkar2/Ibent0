"use client";

const DayCard = ({ index }) => {
  return (
    <div className=" h-full w-full">
      <div className=" border-t-2 border-black dark:border-gray-100 text-xl py-1 pl-2 font-semibold w-[60%]">
        {index}
      </div>
      <div className="text-xs text-gray-500">Other</div>
    </div>
  );
};

export default DayCard;
