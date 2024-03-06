"use client";

import { Button } from "@/components/ui/button";
import { DoorOpen } from "lucide-react";
import { signOut } from "next-auth/react";
import React from "react";

const SignoutButton = () => {
  return (
    <Button
      onClick={() => signOut()}
      variant={"destructive"}
      className="flex justify-center items-center  w-[100px] h-[30px] text-black font-urbanist uppercase"
    >
      <div>
        {" "}
        <DoorOpen size={18} />
      </div>
      SignOut
    </Button>
  );
};

export default SignoutButton;
