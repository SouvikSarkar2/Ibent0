"use client";
import { gql, useQuery } from "@apollo/client";
import client from "@/utils/apolloClient";
import Loader from "@/components/Loader/Loader";
import { formatRevalidate } from "next/dist/server/lib/revalidate";
import { formatDateOnly } from "@/utils/Data";
import { formatEventTime } from "@/app/(main)/calender/_components/FilterEvents";
import ViewMap from "./ViewMap";

const GET_EVENT = gql`
  query Event($eventId: String!) {
    event(id: $eventId) {
      attendees
      color
      createdAt
      date
      description
      duration
      hr
      id
      mn
      title
      type
    }
  }
`;

const Event = ({ id }: { id: string }) => {
  const { loading, error, data } = useQuery(GET_EVENT, {
    variables: { eventId: id },
    client: client,
  });
  if (loading) return <Loader />;
  if (error) return <p>Error: {error.message}</p>;
  const { event } = data;
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-[95%] h-[95%] bg-white dark:bg-[#35374B] rounded-xl flex">
        <div className="w-[50%] h-full rounded-l-xl flex flex-col items-center justify-start">
          <div
            className="mt-10 w-[90%] rounded-xl"
            style={{ backgroundColor: event.color }}
          >
            <div className="font-normal font-[Oswald] text-5xl p-10">
              {event.title}
            </div>
            <div className="pl-10  py-4 text-lg font-urbanist">
              {event.description}
            </div>
          </div>
          <div></div>
        </div>
        <div className="w-[50%] h-full rounded-l-xl flex flex-col items-center justify-start ">
          <div className="mt-10 w-[90%] rounded-xl ">
            <div className="font-normal font-[Oswald] ">
              <div
                className="flex justify-end pr-10 border-r-4 text-5xl border-black dark:border-white"
                style={{ color: event.color }}
              >
                {formatDateOnly(event.date)}
              </div>
              <div className="flex justify-end pr-10 border-r-4 text-3xl border-black dark:border-white pt-6">
                {formatEventTime(event.hr, event.mn, event.duration)}
              </div>
            </div>
          </div>
          <div className="h-full w-full flex justify-end items-end pr-8 pb-6">
            <div className="w-[400px] h-[400px] overflow-hidden flex justify-center items-center">
              <ViewMap />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Event;
