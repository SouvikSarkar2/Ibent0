"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import Image from "next/image";
import {
  ArrowBigRight,
  ArrowRight,
  ArrowUpRight,
  ArrowUpRightFromSquare,
  BoxSelect,
  Braces,
  CalendarCheck,
  Dot,
  DotSquare,
  Grip,
  Sparkle,
} from "lucide-react";
import TimeFunction from "@/components/TimeFunction/TimeFunction";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const mainRef = useRef<HTMLDivElement | null>(null);
  const t1 = gsap.timeline();
  const t2 = gsap.timeline();
  const session = useSession();
  console.log("session from home :", session);
  console.log(session.status);

  useGSAP(() => {
    t1.to(loaderRef.current, {
      width: screen.width,
      duration: 3,
      ease: "power1.inOut",
    })
      .to(loaderRef.current, {
        height: "220px",
        duration: 1,
        ease: "power1.inOut",
      })
      .to(loaderRef.current, {
        height: screen.height,
        duration: 1,
        ease: "power1.inOut",
      });
    t2.to(textRef.current, {
      opacity: 0,
      duration: 3.3,
    })
      .from(textRef.current, {
        y: 200,
        opacity: 1,
      })
      .to(textRef.current, {
        y: 0,
        duration: 0.3,
        ease: "power1.inOut",
      })
      .to(textRef.current, {
        y: -200,
        duration: 0.7,
        ease: "power1.inOut",
      })
      .from(mainRef.current, {
        opacity: 0,
        duration: 1,
      })
      .to(mainRef.current, {
        opacity: 1,
        duration: 1,
      });
  }, []);

  async function handleSignin() {
    await signIn("google", {
      callbackUrl: "/dashboard",
    });
  }

  return (
    <main className="h-screen overflow-hidden w-screen font-bold bg-black flex flex-col justify-center text-slate-100">
      <div
        ref={loaderRef}
        className="bg-white justify-center w-0 items-center flex h-[8px] text-9xl"
      >
        <div className="overflow-hidden text-black font-canopee">
          <div ref={textRef}>IBENT0</div>
        </div>
      </div>
      <div
        className="absolute w-screen h-screen flex flex-col items-center z-10 bg-white text-black font-[Oswald]"
        ref={mainRef}
      >
        <div className="absolute left-0 top-0 w-[100vw] h-[100vh] -z-10">
          <Image src={"/bg1.jpg"} fill alt="" />
        </div>
        <div className="w-full h-[15%] flex justify-center items-center">
          <div className="w-[95%] border-[1px] border-gray-500 h-[40%]  rounded-full flex items-center justify-between">
            <div>
              <div className="pl-6">
                <Image height={28} width={58} src={"/logo-dark2.png"} alt="" />
              </div>
            </div>
            <div className="flex  uppercase font-medium gap-6">
              <div className=" ">Dashboard</div>
              <div>Calender</div>
              <div>Location</div>
              <div>Live Updates</div>
            </div>

            <div className="flex justify-center items-center font-medium pr-1 gap-6">
              {session.status === "unauthenticated" ? (
                <div
                  onClick={() => handleSignin()}
                  className="w-[90px] cursor-pointer bg-black rounded-full text-sm flex justify-between px-0.5 pl-2 py-[3px] items-center"
                >
                  <div className="text-white">LOGIN</div>
                  <div className="bg-white  rounded-full h-6 w-6 flex justify-center items-center">
                    <ArrowRight size={18} />
                  </div>
                </div>
              ) : (
                <Link
                  href={"/dashboard"}
                  className="w-[90px] bg-black rounded-full text-sm flex justify-between px-0.5 pl-2 py-[3px] items-center"
                >
                  <div className="text-white">LET&apos;S GO</div>
                  <div className="bg-white  rounded-full h-6 w-6 flex justify-center items-center">
                    <ArrowRight size={18} />
                  </div>
                </Link>
              )}
              <div className="bg-black text-white flex justify-center items-center h-10 w-10 rounded-full">
                <Braces />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-[50%]">
          <div className="w-full h-[20%] flex justify-center items-center">
            <div className="flex gap-2 justify-center items-center">
              <div className="w-10 h-10 flex justify-center items-center bg-[#eca845] rounded-full">
                <Sparkle fill="black" />
              </div>
              {session.status === "unauthenticated" ? (
                <div className="h-7 min-w-[100px] rounded-full bg-[#eca845] flex font-medium justify-center items-center px-3">
                  START JOURNEY
                </div>
              ) : (
                <Link
                  href={"/dashboard"}
                  className="h-7 min-w-[100px] rounded-full bg-[#eca845] flex font-medium justify-center items-center px-3"
                >
                  START JOURNEY
                </Link>
              )}
            </div>
          </div>
          <div className="w-full h-[60%] flex flex-col font-normal justify-center items-center text-8xl">
            <div>SUPER SIMPLE </div>
            <div>VIRTUAL EVENTS</div>
          </div>

          <div className="w-full h-[15%]">
            <div className="border-gray-500 border-[1px] rounded-full w-[80px] flex justify-center items-center text-lg p-1 rotate-[270deg]">
              01-04
            </div>
          </div>
        </div>
        <div className="w-full h-[35%] flex justify-center items-center gap-10">
          <div className="min-h-[100px] min-w-[350px] border-2 p-6 border-black rounded-sm flex">
            <div className="h-[90px] w-[90px] flex justify-start items-center">
              <Image src={"/realtime.png"} alt="" height={70} width={70} />
            </div>
            <div>
              <div className="h-[70%] flex justify-between">
                <div className="h-full items-center justify-start text-2xl font-normal">
                  RealTime Events
                </div>
                <div className="rounded-full bg-gray-300 flex justify-center items-center h-6 w-6">
                  <ArrowUpRight size={18} />
                </div>
              </div>
              <div className="text-sm font-normal h-[30%]">
                Platform That Make Easy Connection
              </div>
            </div>
          </div>
          <div className="min-h-[100px] min-w-[350px] border-2 p-6 border-black rounded-sm flex">
            <div className="h-[90px] w-[90px] flex justify-start items-center">
              {" "}
              <Image src={"/category.png"} alt="" height={70} width={70} />
            </div>
            <div>
              <div className="h-[70%] flex justify-between">
                <div className="h-full items-center justify-start text-2xl font-normal">
                  Categorize Events
                </div>
                <div className="rounded-full bg-gray-300 flex justify-center items-center h-6 w-6">
                  <ArrowUpRight size={18} />
                </div>
              </div>
              <div className="text-sm font-normal h-[30%]">
                Platform That Provides Different Categories
              </div>
            </div>
          </div>
          <div className="min-h-[100px] min-w-[350px] border-2 p-6 border-black rounded-sm flex">
            <div className="h-[90px] w-[90px] flex justify-start items-center">
              {" "}
              <Image src={"/bar.png"} alt="" height={70} width={70} />
            </div>
            <div>
              <div className="h-[70%] flex justify-between">
                <div className="h-full items-center justify-start text-2xl font-normal">
                  Virtual Events
                </div>
                <div className="rounded-full bg-gray-300 flex justify-center items-center h-6 w-6">
                  <ArrowUpRight size={18} />
                </div>
              </div>
              <div className="text-sm font-normal h-[30%]">
                Platform That Gives One Click Events
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </main>
  );
}
