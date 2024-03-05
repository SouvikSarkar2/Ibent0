"use client";
import { gql, useQuery } from "@apollo/client";
import client from "@/utils/apolliClient";
import { useUserIdStore } from "@/store";
import RecentEventCard from "./RecentEventCard";

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const { events } = data;
  console.log(events);
  return (
    <div className=" w-full h-full">
      <RecentEventCard event={events[0]} />
      <RecentEventCard event={events[1]} />
      <RecentEventCard event={events[2]} />
    </div>
  );
};

export default RecentEvents;
