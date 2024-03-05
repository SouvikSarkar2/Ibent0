"use client";
import { gql, useQuery } from "@apollo/client";
import client from "@/utils/apolliClient";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import SignoutButton from "./SignoutButton";
import Image from "next/image";
import { PenLine, Settings } from "lucide-react";
import { useUserIdStore } from "@/store";

const GET_USER = gql`
  query GetUser($id: String!) {
    user(id: $id) {
      name
      email
      img
      status
      color
    }
  }
`;

const User = () => {
  const { userId } = useUserIdStore();
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { id: userId },
    client: client,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const { user } = data;

  return (
    <div className="bg-[#15141A] rounded-xl overflow-hidden h-[50px] w-[50px]">
      <Popover>
        <PopoverTrigger>
          <Image width={50} height={50} alt="" src={`${user.img}`} />
        </PopoverTrigger>
        <PopoverContent className="mr-2 mt-2  min-w-[180px] max-w-[220px] h-[250px] bg-gray-300 dark:bg-[#35374B] relative">
          <div className="w-full h-full">
            <div className="w-full flex justify-center items-end">
              <div className="rounded-xl h-[50px] w-[50px] overflow-hidden">
                <Image width={50} height={50} alt="" src={`${user.img}`} />
              </div>
            </div>
            <div className=" font-urbanist h-[50px] flex justify-center items-center">
              {user.name}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400 text-center">
              {user.email}
            </div>
            <div
              className={`text-sm flex justify-center items-center h-[40px] text-[${user.color}] `}
            >
              {user.status}
            </div>
            <div className=" w-[95%] absolute bottom-1 right-1 flex gap-1 justify-end items-end pb-1 text-black">
              <div className="flex items-center">
                <div className="bg-yellow-400 rounded-md  h-[30px] w-[30px] flex justify-center items-center">
                  <Settings />
                </div>
              </div>
              <div
                className="flex justify-center items-center h-[30px] w-[70px]  font-urbanist
             bg-slate-400 rounded-lg text-md"
              >
                <div className="flex justify-center text-sm items-center">
                  EDIT
                  <PenLine size={18} />
                </div>
              </div>
              <div className="">
                <SignoutButton />
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default User;
