"use client";
import client from "@/utils/apolliClient";
import { gql, useMutation } from "@apollo/client";

import { Trash2 } from "lucide-react";

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

const RecentEventCard = ({ event }) => {
  const [deleteEvent, { loading, error, data, reset }] = useMutation(
    DELETE_EVENT,
    {
      client: client,
      refetchQueries: [GET_EVENTS, "events"],
    }
  );

  if (loading) return "DEleting...";
  if (error) return `Deletion error! ${error.message}`;

  const submitClick = async () => {
    deleteEvent({ variables: { id: event.id } });
  };
  return (
    <div className=" border-b-2 border-black flex justify-between h-[50px] ">
      <div className="w-[30%]  flex items-center">{event.date}</div>
      <div className="w-[50%] flex items-center">{event.title}</div>
      <div className="w-[30%] flex items-center justify-end">{event.type}</div>
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
