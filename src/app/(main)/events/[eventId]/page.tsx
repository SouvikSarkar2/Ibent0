"use client";
import Event from "./_components/Event";

const page = ({ params }: any) => {
  // console.log(params);
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Event id={params.eventId} />
    </div>
  );
};

export default page;
