"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useUserIdStore } from "@/store";
import client from "@/utils/apolloClient";
import { gql, useMutation, useQuery } from "@apollo/client";
import { givePercentage } from "./Data";

const GET_EVENTS = gql`
  query Events($userId: String!) {
    events(id: $userId) {
      date
      hr
      mn
      duration
    }
  }
`;

const Percentage = () => {
  const { userId } = useUserIdStore();
  const {
    loading,
    error,
    data: eventData,
  } = useQuery(GET_EVENTS, {
    variables: { userId: userId },
    client: client,
  });
  if (loading) return <Skeleton className="w-full h-full" />;

  if (eventData.events.length === 0)
    return (
      <div className="bg-white dark:bg-[#35374B]  rounded-xl flex justify-center items-center italic">
        NO DATA
      </div>
    );

  return (
    <>
      <div className="bg-red-400 h-[28%] w-[90%] rounded-md">
        <div className="h-[70%] text-5xl flex w-full justify-center items-center">
          {eventData.events.length}
        </div>{" "}
        <div className="w-full h-[30%] flex justify-center items-start font-urbanist">
          EVENTS CREATED
        </div>
      </div>
      <div className="bg-sky-400 h-[28%] w-[90%] rounded-md">
        <div className="h-[70%] text-5xl flex w-full justify-center items-center">
          {givePercentage(eventData.events)}%
        </div>{" "}
        <div className="w-full h-[30%] flex justify-center items-start font-urbanist">
          COMPLETED
        </div>
      </div>
      <div className="bg-yellow-400 h-[28%] w-[90%] rounded-md">
        <div className="h-[70%] text-5xl flex w-full justify-center items-center">
          {100 - givePercentage(eventData.events)}%
        </div>{" "}
        <div className="w-full h-[30%] flex justify-center items-start font-urbanist">
          PENDING
        </div>
      </div>
    </>
  );
};

export default Percentage;
