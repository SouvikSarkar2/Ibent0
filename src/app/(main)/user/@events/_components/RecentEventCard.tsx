"use client";
import { useUserIdStore } from "@/store";
import { calculateTimeElapsed } from "@/utils/Data";
import client from "@/utils/apolloClient";
import { gql, useMutation } from "@apollo/client";

import { Trash2 } from "lucide-react";
import Link from "next/link";

const DELETE_EVENT = gql`
  mutation DeleteEvent($id: ID!) {
    deleteEvent(id: $id) {
      title
      type
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

const RecentEventCard = ({ event }: any) => {
  const { userId } = useUserIdStore();
  const [deleteEvent, { loading, error, data, reset }] = useMutation(
    DELETE_EVENT,
    {
      client: client,
      refetchQueries: [
        "Events",
        {
          query: GET_EVENT_BY_TYPE,
          variables: { userId: userId, type: event.type },
        },
      ],
    }
  );

  if (loading) return "DEleting...";
  if (error) return `Deletion error! ${error.message}`;

  const submitClick = async () => {
    deleteEvent({ variables: { id: event.id } });
  };
  return (
    <div className=" border-b-2 border-black flex justify-between h-[50px] ">
      <Link
        href={`/events/${event.id}`}
        className="w-[50%]   flex items-center"
      >
        {calculateTimeElapsed(event.createdAt)}
      </Link>
      <Link href={`/events/${event.id}`} className="w-[20%] flex items-center">
        {event.title}
      </Link>
      <Link
        href={`/events/${event.id}`}
        className="w-[30%] flex items-center justify-end"
      >
        {event.type}
      </Link>
      <div
        onClick={() => {
          submitClick();
        }}
        className="flex justify-center items-center px-2 m-2 rounded-xl cursor-pointer hover:bg-red-400 text-red-500 hover:text-black "
      >
        <Trash2 />
      </div>
    </div>
  );
};

export default RecentEventCard;
