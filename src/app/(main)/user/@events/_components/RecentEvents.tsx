"use client";
import { gql, useQuery } from "@apollo/client";
import client from "@/utils/apolliClient";
import { useUserIdStore } from "@/store";
import RecentEventCard from "./RecentEventCard";
import { Skeleton } from "@/components/ui/skeleton";

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

const RecentEvents = () => {
  const { userId } = useUserIdStore();
  const { loading, error, data } = useQuery(GET_EVENTS, {
    variables: { userId: userId },
    client: client,
  });

  if (loading)
    return (
      <div className="w-full h-full flex flex-col gap-4 pt-2">
        <Skeleton className="h-[40px] w-full"></Skeleton>
        <Skeleton className="h-[40px] w-full"></Skeleton>
        <Skeleton className="h-[40px] w-full"></Skeleton>
      </div>
    );
  if (error) return <p>Error: {error.message}</p>;
  const { events } = data;
  console.log(events);
  return (
    <div className=" w-full h-full">
      {events.length >= 3 && (
        <>
          {" "}
          <RecentEventCard event={events[0]} />
          <RecentEventCard event={events[1]} />
          <RecentEventCard event={events[2]} />
        </>
      )}
      {events.length < 3 &&
        events.map((event) => <RecentEventCard event={event} />)}
    </div>
  );
};

export default RecentEvents;
