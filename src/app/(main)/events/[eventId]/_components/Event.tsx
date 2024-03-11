"use client";
import { useUserIdStore } from "@/store";
import { gql, useMutation, useQuery } from "@apollo/client";
import client from "@/utils/apolloClient";
import Loader from "@/components/Loader/Loader";
import { formatRevalidate } from "next/dist/server/lib/revalidate";
import { formatDateOnly } from "@/utils/Data";
import { formatEventTime } from "@/app/(main)/calender/_components/FilterEvents";
import ViewMap from "./ViewMap";
import {
  Pencil,
  PersonStanding,
  Trash,
  Trash2,
  Users,
  UsersRound,
} from "lucide-react";
import { formatDate } from "./createdAt";
import { usePathname, useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const DELETE_EVENT = gql`
  mutation DeleteEvent($id: ID!) {
    deleteEvent(id: $id) {
      title
    }
  }
`;

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
      createdAt
      coordinates
    }
  }
`;

const GET_EVENT_BY_TYPE = gql`
  query EventByType($userId: String!, $type: String!) {
    eventByType(id: $userId, type: $type) {
      id
      title
      attendees
      color
      date
      duration
      hr
      mn
    }
  }
`;

const GET_EVENTS = gql`
  query Events($userId: String!) {
    events(id: $userId) {
      title
      id
      date
      type
    }
  }
`;

const Event = ({ id }: { id: string }) => {
  const [type, setType] = useState<string>("");
  const pathname = usePathname();
  const router = useRouter();
  const { userId } = useUserIdStore();
  useEffect(() => {
    const searchParams: any = new URLSearchParams(window.location.search);
    setType(searchParams.get("type"));
  }, []);

  const [
    deleteEvent,
    { loading: deleteLoader, error: deleteError, data: deleteData, reset },
  ] = useMutation(DELETE_EVENT, {
    client: client,
    refetchQueries: [
      { query: GET_EVENTS, variables: { userId: userId } },
      {
        query: GET_EVENT_BY_TYPE,
        variables: { userId: userId, type: type },
      },
    ],
  });

  const { loading, error, data } = useQuery(GET_EVENT, {
    variables: { eventId: id },
    client: client,
  });
  if (loading)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-[95%] h-[95%] bg-white dark:bg-[#35374B] rounded-xl flex">
          <div className="w-[50%] h-full rounded-l-xl flex flex-col items-center justify-start">
            <Skeleton className="mt-10 w-[90%] min-h-[20%] rounded-xl flex justify-between items-center flex-col"></Skeleton>
            <div className="w-full h-full max-h-[85%] flex justify-between flex-col pl-10 pb-10 pt-4">
              <div className="w-[90%] flex flex-col gap-2">
                <Skeleton className="flex gap-2 w-[80%]">
                  <div></div>
                  <div className="flex justify-start items-center  text-black rounded-sm  w-full p-4 text-lg font-urbanist"></div>
                </Skeleton>
                <Skeleton className="flex justify-start items-center">
                  <div className="text-2xl font-[Oswald]"></div>
                  <div></div>
                </Skeleton>
              </div>
              <Skeleton className="h-[10%] font-urbanist text-xl w-[95%] flex items-center justify-between">
                <div></div>
              </Skeleton>
            </div>
          </div>
          <div className="w-[50%] h-full rounded-l-xl flex flex-col items-end justify-start ">
            <Skeleton className="mt-10 mr-10 w-[60%] rounded-xl h-[30%]">
              <div className="font-normal font-[Oswald] "></div>
            </Skeleton>
            <div className="h-full w-full flex justify-end relative items-end pr-8 pb-6">
              <Skeleton className="w-[60%] h-[70%] absolute bottom-10 right-10 overflow-hidden flex justify-center items-center rounded-xl"></Skeleton>
            </div>
          </div>
        </div>
      </div>
    );
  if (error) return <p>Error: {error.message}</p>;
  if (deleteLoader) return <Loader />;
  const submitClick = async () => {
    await deleteEvent({ variables: { id: id } });
    router.push("/allevent");
  };
  const { event } = data;
  const haveLocation: boolean =
    event.coordinates[0] !== 0 && event.coordinates[1] !== 1;
  // console.log(haveLocation);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-[95%] h-[95%] bg-white dark:bg-[#35374B] rounded-xl flex">
        <div className="w-[50%] h-full rounded-l-xl flex flex-col items-center justify-start">
          <div
            className="mt-10 w-[90%] min-h-[20%] rounded-xl flex justify-between items-center flex-col"
            style={{ backgroundColor: event.color }}
          >
            <div className="font-normal font-[Oswald] text-5xl pt-4 flex justify-start w-full items-center px-4">
              {event.title}
            </div>
          </div>
          <div className="w-full h-full max-h-[85%] flex justify-between flex-col pl-10 pb-10 pt-4">
            <div className="w-[90%] flex flex-col gap-2">
              <div className="flex gap-2 w-[80%]">
                <div
                  className={` font-urbanist w-[50%] text-xl rounded-sm p-0.5 ${
                    event.type === "Work" &&
                    "bg-red-200 text-red-600 border-2 border-red-600"
                  } ${
                    event.type === "Personal" &&
                    "bg-sky-200 text-sky-600 border-2 border-sky-600"
                  } ${
                    event.type === "Social" &&
                    "bg-green-200 text-green-600 border-2 border-green-600"
                  }`}
                >
                  {event.type}
                </div>
                <div className="flex justify-start items-center bg-slate-200 text-black rounded-sm border-2 border-slate-400 w-full p-4 text-lg font-urbanist">
                  {event.description ? event.description : "no description"}
                </div>
              </div>
              <div className="flex justify-start items-center">
                <div className="text-2xl font-[Oswald]">
                  {event.attendees} People
                </div>
                <div>
                  <PersonStanding style={{ color: event.color }} size={30} />
                </div>
              </div>
            </div>
            <div className=" font-urbanist text-xl w-[95%] flex items-center justify-between">
              <div>
                <div className="italic">{formatDate(event.createdAt)}</div>
              </div>
              <div className="flex items-center gap-2">
                <div
                  onClick={() => {
                    submitClick();
                  }}
                  className="flex justify-center items-center gap-1 bg-red-500 text-black p-1 rounded-md cursor-pointer"
                >
                  <Trash2 />
                </div>
                <div className="flex gap-1 justify-center items-center bg-yellow-500 text-black p-1 rounded-md cursor-pointer">
                  <Pencil />
                </div>
              </div>
            </div>
          </div>
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
          <div className="h-full w-full flex justify-end relative items-end pr-8 pb-6">
            <div className="w-[60%] h-[70%] absolute bottom-10 right-10 overflow-hidden flex justify-center items-center rounded-xl">
              {haveLocation ? (
                <ViewMap coordinates={event.coordinates} />
              ) : (
                <div className="bg-[#E5E7EB] dark:bg-[#2C293D] flex justify-center items-center text-xl uppercase italic  rounded-e-xl w-full h-full">
                  No Location Found
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Event;
