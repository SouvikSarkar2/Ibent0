"use client";
import { useUserIdStore } from "@/store";
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

const EventCard = ({ event }: any) => {
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
    <div className=" w-[90%] min-h-[180px] flex font-urbanist">
      <div className="w-[25%] bg-[#E5E7EB] dark:bg-[#2C293D] h-auto rounded-l-2xl">
        <div
          className={`rounded-2xl h-full flex flex-col gap-1 justify-center items-center`}
          style={{ backgroundColor: event.color }}
        >
          <div className="text-xl">
            {event.hr}:{event.mn}
          </div>
          <div className=" text-md">{event.duration}min</div>
        </div>
      </div>
      <div className="w-[75%] bg-[#E5E7EB] dark:bg-[#2C293D] h-auto rounded-r-xl flex flex-col justify-center items-center">
        <div className="w-full h-[50%] flex flex-col justify-center items-center">
          <div className="font-bold text-[22px]">{event.title}</div>
          <div className="flex justify-center items-center gap-2 text-slate-600 dark:text-slate-400">
            <MapPin size={16} />
            New York
          </div>
        </div>
        <div className="w-full h-[50%] flex justify-end items-end gap-2 p-4">
          <div
            className="flex gap-1 text-lg rounded-md px-2 py-0.5 text-black justify-center items-center"
            style={{ backgroundColor: event.color }}
          >
            {event.attendees}
            <UsersRound size={20} />
          </div>
          <div
            className=" rounded-md cursor-pointer hover:scale-110 duration-300"
            style={{ backgroundColor: event.color }}
            onClick={() => {
              submitClick();
            }}
          >
            <div className="p-1 text-black">
              {" "}
              <Trash2 size={24} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
