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
import { Cog, PenLine, Settings } from "lucide-react";
import { useUserIdStore } from "@/store";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

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
  const [color, setColor] = useState("#000000");
  const { userId } = useUserIdStore();
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { id: userId },
    client: client,
  });
  useEffect(() => {
    if (data) {
      setColor(data.user.color);
    }
  }, [data]);

  if (loading)
    return (
      <Skeleton className=" rounded-xl overflow-hidden h-[50px] w-[50px]">
        <Popover>
          <PopoverTrigger>
            <Skeleton className="h-[50px] w-[50px] rounded-xl"></Skeleton>
          </PopoverTrigger>
          <PopoverContent className="mr-2 mt-2  min-w-[180px] max-w-[220px] h-[250px] bg-gray-300 dark:bg-[#35374B] relative">
            <div className="w-full flex flex-col  h-full gap-2">
              <div className="w-full flex justify-center items-end">
                <Skeleton className="rounded-xl h-[50px] w-[50px] overflow-hidden"></Skeleton>
              </div>
              <Skeleton className=" font-urbanist h-[20px] flex justify-center items-center w-full"></Skeleton>
              <Skeleton className="text-xs text-gray-600 dark:text-gray-400 text-center h-[20px] w-full"></Skeleton>
              <Skeleton
                className={`text-sm flex justify-center items-center h-[20px] w-full`}
              ></Skeleton>
              <div className=" w-[95%] absolute bottom-1 right-1 flex gap-1 justify-end items-end pb-1 text-black">
                <div className="flex items-center"></div>

                <Skeleton className="flex justify-center text-sm items-center gap-1 h-5 w-10"></Skeleton>

                <Skeleton className="w-10 h-5"></Skeleton>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </Skeleton>
    );
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
              className={`text-sm flex justify-center items-center h-[40px] `}
              style={{ color: color }}
            >
              {user.status}
            </div>
            <div className=" w-[95%] absolute bottom-1 right-1 flex gap-1 justify-end items-end pb-1 text-black">
              <div className="flex items-center"></div>
              <div
                className="flex justify-center items-center h-[30px] w-[110px] font-urbanist
             bg-slate-400 rounded-lg text-md"
              >
                <Link
                  href={"/user/settings"}
                  className="flex justify-center text-sm items-center gap-1"
                >
                  <Cog size={18} />
                  SETTINGS
                </Link>
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
