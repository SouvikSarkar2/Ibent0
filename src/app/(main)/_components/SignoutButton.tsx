"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import React from "react";

const SignoutButton = () => {
  return (
    <Button
      onClick={() => signOut()}
      variant={"destructive"}
      className="w-[70px] h-[30px] text-black"
    >
      SignOut
    </Button>
  );
};

export default SignoutButton;
