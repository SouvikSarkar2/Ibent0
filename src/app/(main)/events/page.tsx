import Map from "./_components/Map";

const page = () => {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="h-[90%] w-[95%] bg-white dark:bg-[#35374B] rounded-xl flex">
        <div className="rounded-xl w-[50%] h-full"></div>
        <div className=" rounded-r-xl m-l w-[50%] h-full overflow-hidden">
          <Map />
        </div>
      </div>
    </div>
  );
};

export default page;
