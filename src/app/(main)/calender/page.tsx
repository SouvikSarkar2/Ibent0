import Calender from "./_components/Calender";

const page = () => {
  return (
    <div className="flex justify-center items-center h-full w-full ">
      <div className=" h-[95%] w-[91%] rounded-xl flex justify-center items-center">
        <Calender />
      </div>
      <div className=" h-[95%] w-[8%] flex justify-center items-center">
        <div className="flex justify-evenly items-center h-[75%] flex-col">
          <div className=" rotate-90 flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-red-500"></div>
            <div className="font-semibold text-red-500">WORK</div>
          </div>
          <div className=" rotate-90 flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-sky-600"></div>
            <div className="font-semibold text-sky-600">PERSONAL</div>
          </div>
          <div className=" rotate-90 flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-green-600"></div>
            <div className="font-semibold text-green-600">SOCIAL</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
