import RecentEvents from "./_components/RecentEvents";

const page = () => {
  return (
    <div className="w-full h-full  rounded-b-xl flex justify-center items-center p-2">
      <div className="w-full h-full">
        <div className="font-urbanist px-8">
          <div className="text-xl uppercase border-b-2 border-black pb-6">
            Recent Events
          </div>
          <RecentEvents />
        </div>
      </div>
    </div>
  );
};

export default page;
