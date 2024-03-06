"use client";
import { gql, useQuery } from "@apollo/client";
import client from "@/utils/apolliClient";
import { useUserIdStore } from "@/store";
import RecentEventCard from "./_components/RecentEventCard";
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
      <div className="w-full h-[100%]   rounded-b-xl flex justify-center items-center p-2">
        <div className="w-full h-full">
          <div className="font-urbanist px-8">
            <div className="text-xl uppercase border-b-2 border-black pb-6">
              All Events
            </div>
            <div className="h-[180px] w-full overflow-y-scroll">
              <div className=" w-full h-full flex flex-col justify-center items-center gap-1">
                <Skeleton className="w-[100%] h-[180px]"></Skeleton>
                <Skeleton className="w-[100%] h-[180px]"></Skeleton>
                <Skeleton className="w-[100%] h-[180px]"></Skeleton>
                <Skeleton className="w-[100%] h-[180px]"></Skeleton>
                <Skeleton className="w-[100%] h-[180px]"></Skeleton>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  if (error) return <p>Error: {error.message}</p>;
  const { events } = data;
  console.log(events);
  return (
    <div className="w-full h-[100%]   rounded-b-xl flex justify-center items-center p-2">
      <div className="w-full h-full">
        <div className="font-urbanist px-8">
          <div className="text-xl uppercase border-b-2 border-black pb-6">
            All Events
          </div>
          <div className="h-[180px] w-full overflow-y-scroll">
            <div className=" w-full h-full">
              {events.map((event) => (
                <RecentEventCard event={event} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentEvents;
