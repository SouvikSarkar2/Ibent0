"use client";
import { gql, useQuery } from "@apollo/client";
import client from "@/utils/apolliClient";
import { useUserIdStore } from "@/store";
import { Edit, Square } from "lucide-react";
import Image from "next/image";
import React from "react";
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
  const { userId } = useUserIdStore();
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { id: userId },
    client: client,
  });

  if (loading)
    return (
      <div className="flex flex-col h-full">
        <div className="h-[15%]  w-full flex justify-between items-center px-10">
          <Skeleton className="flex gap-2 font-urbanist w-[200px] h-6"></Skeleton>
          <Skeleton className="text-sm text-gray-600 dark:text-gray-300 w-[200px] h-6"></Skeleton>
        </div>
        <div className="h-[60%]  w-full flex justify-center items-center px-10">
          <Skeleton className=" w-[280px] h-[280px] rounded-full flex justify-center items-center overflow-hidden"></Skeleton>
        </div>
        <div className="h-[25%]  w-full px-10 flex justify-between items-center">
          <Skeleton className="flex italic gap-2 w-[200px]  h-6"></Skeleton>
          <Skeleton className="flex text-black rounded-xl p-2 gap-2 w-[100px] h-10"></Skeleton>
        </div>
      </div>
    );
  if (error) return <p>Error: {error.message}</p>;
  const { user } = data;

  return (
    <div className="flex flex-col h-full">
      <div className="h-[15%]  w-full flex justify-between items-center px-10">
        <div className="flex gap-2 font-urbanist">
          <Square /> {user.name}
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-300">
          {user.email}
        </div>
      </div>
      <div className="h-[60%]  w-full flex justify-center items-center px-10">
        <div className=" w-[280px] h-[280px] rounded-full flex justify-center items-center overflow-hidden">
          <Image src={user.img} alt="" width={280} height={280} />
        </div>
      </div>
      <div className="h-[25%]  w-full px-10 flex justify-between items-center">
        <div className="flex italic gap-2">
          <div>STATUS :: </div>
          {user.status}
        </div>
        <Link
          href={"/user/settings"}
          className="flex bg-yellow-400 text-black rounded-xl p-2 gap-2"
        >
          EDIT
          <Edit />
        </Link>
      </div>
    </div>
  );
};

export default User;
