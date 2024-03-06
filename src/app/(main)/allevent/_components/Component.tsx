"use client";
import { gql, useQuery } from "@apollo/client";
import client from "@/utils/apolliClient";
import { useUserIdStore } from "@/store";
import EventCard from "./EventCard";
import { Skeleton } from "@/components/ui/skeleton";

interface ComponentProps {
  type: string;
}

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

const Component: React.FC<ComponentProps> = ({ type }) => {
  const { userId } = useUserIdStore();
  const { loading, error, data } = useQuery(GET_EVENT_BY_TYPE, {
    variables: { userId: userId, type: type },
    client: client,
  });

  if (loading)
    return (
      <div className="bg-white dark:bg-[#35374B] h-[92%] w-[27%] rounded-xl ">
        <div className="w-full flex h-[10%] justify-center items-center text-2xl uppercase font-bold dark:text-slate-200">
          {type}
        </div>
        <div className="h-[90%] overflow-hidden">
          <div className="flex flex-col w-full justify-center items-center gap-6 py-10">
            <Skeleton className="w-[90%] h-[180px]"></Skeleton>
            <Skeleton className="w-[90%] h-[180px]"></Skeleton>
            <Skeleton className="w-[90%] h-[180px]"></Skeleton>
          </div>
        </div>
      </div>
    );
  if (error) return <p>Error: {error.message}</p>;

  console.log(`data of ${type} :`, data);
  return (
    <div className="bg-white dark:bg-[#35374B] h-[92%] w-[27%] rounded-xl ">
      <div className="w-full flex h-[10%] justify-center items-center text-2xl uppercase font-bold dark:text-slate-200">
        {type}
      </div>
      <div className="h-[90%] overflow-y-scroll">
        <div className="flex flex-col w-full justify-center items-center gap-6 py-10">
          {data.eventByType.map((event) => (
            <EventCard event={event} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Component;
