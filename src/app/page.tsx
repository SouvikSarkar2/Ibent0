"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import Image from "next/image";
import { ArrowUpRightFromSquare } from "lucide-react";

export default function Home() {
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const mainRef = useRef<HTMLDivElement | null>(null);
  const t1 = gsap.timeline();
  const t2 = gsap.timeline();

  useGSAP(() => {
    t1.to(loaderRef.current, {
      width: screen.width,
      duration: 3,
      ease: "power1.inOut",
    })
      .to(loaderRef.current, {
        height: "200px",
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
  return (
    <main className="h-screen overflow-hidden w-screen font-bold bg-black flex flex-col justify-center">
      <div
        ref={loaderRef}
        className="bg-slate-300 justify-center w-0 items-center flex h-[10px] text-8xl"
      >
        <div className="overflow-hidden text-black font-canopee">
          <div ref={textRef}>IBENT0</div>
        </div>
      </div>
      <div
        className="absolute w-screen h-screen flex flex-col items-center font-mono"
        ref={mainRef}
      >
        <div className="flex w-[80%] justify-between items-center h-[15vh] py-6">
          <div className="text-xl font-bold uppercase text-secondary">
            {" "}
            Welcome - TO - IBENT0
          </div>
          <div>
            <Image src={"/logo-black.png"} width={120} height={120} />
          </div>
        </div>
        <div className="h-[50vh]  flex flex-col justify-center w-[80%] items-start gap-1 text-[70px] font-bold text-primary">
          <div className="">&quot;PLAN.</div> <div>SCHEDULE.</div>{" "}
          <div>CONNECT&quot;</div>
        </div>
        <div className="text-3xl w-[80%] flex h-[30vh]">
          <div className="w-2/3 flex flex-col gap-2 text-secondary">
            <div>Today is 26FEB &</div> <div>Time is 7:45:45</div>
          </div>
          <div className="w-1/3 text-xl flex justify-end items-end">
            <div className="px-3 py-3 flex gap-2 items-center bg-primary rounded-xl text-white cursor-pointer">
              LOGIN
              <ArrowUpRightFromSquare />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
