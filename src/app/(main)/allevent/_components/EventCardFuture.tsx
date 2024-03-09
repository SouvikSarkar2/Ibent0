"use client";
import { useUserIdStore } from "@/store";
import { formatDate } from "@/utils/Data";
import client from "@/utils/apolloClient";
import { gql, useMutation } from "@apollo/client";
import {
  Delete,
  LocateIcon,
  MapPin,
  Trash,
  Trash2,
  User,
  UsersRound,
} from "lucide-react";
import Link from "next/link";

const DELETE_EVENT = gql`
  mutation DeleteEvent($id: ID!) {
    deleteEvent(id: $id) {
      title
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

const EventCardFuture = ({ event }: any) => {
  const { userId } = useUserIdStore();
  const [deleteEvent, { loading, error, data, reset }] = useMutation(
    DELETE_EVENT,
    {
      client: client,
      refetchQueries: [
        "EventByType",
        { query: GET_EVENTS, variables: { userId: userId } },
      ],
    }
  );

  if (loading)
    return <div className=" text-red-500 italic text-sm">...DELETING...</div>;
  if (error) return `Deletion error! ${error.message}`;
  const submitClick = async () => {
    deleteEvent({ variables: { id: event.id } });
  };
  return (
    <div className=" w-[90%] min-h-[60px] flex flex-col font-urbanist ">
      <Link
        href={`/events/${event.id}`}
        className="w-full bg-[#E5E7EB] dark:bg-[#2C293D] h-[50%] rounded-t-xl"
      >
        <div
          className={`rounded-t-xl rounded-b-sm h-full flex flex-col gap-1 justify-center items-center`}
          style={{ backgroundColor: event.color }}
        >
          <div className="flex justify-center items-center text-center text-md">
            {formatDate(event.date)}
          </div>
        </div>
      </Link>
      <div className="w-full bg-[#E5E7EB] dark:bg-[#2C293D] h-[50%] rounded-b-xl flex flex-col justify-center items-center">
        <div className="w-full h-[50%] flex justify-between items-end gap-2 p-4">
          <Link
            href={`/events/${event.id}`}
            className="font-semibold text-md w-full"
          >
            {event.title}
          </Link>

          <div
            className="rounded-md cursor-pointer"
            style={{
              backgroundColor: event.color,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "red";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = event.color;
            }}
            onClick={() => {
              submitClick();
            }}
          >
            <div className="p-1 text-black">
              {" "}
              <Trash2 size={18} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCardFuture;
