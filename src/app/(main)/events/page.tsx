import { ProfileForm } from "./_components/EventForm";
import Map from "./_components/Map";

const page = () => {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="h-[90%] w-[95%] bg-white dark:bg-[#35374B] rounded-xl flex">
        <div className="rounded-xl w-[50%] h-full flex flex-col justify-center items-center ">
          <div className="flex font-[1000] text-2xl uppercase font-urbanist  justify-start w-[90%]  py-10  items-start h-[10%]">
            Add Event
          </div>
          <div className="h-[90%] flex flex-col overflow-y-scroll">
            <ProfileForm />
          </div>
        </div>
        <div className=" rounded-r-xl m-l w-[50%] h-full overflow-hidden relative">
          <Map />
          <div className="absolute bottom-2 left-2 font-urbanist text-xl italic ">
            Search To Add Location
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
