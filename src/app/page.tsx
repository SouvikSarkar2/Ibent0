import Image from "next/image";

export default function Home() {
  return (
    <main className="h-full w-full text-8xl font-bold bg-black flex justify-center items-center flex-col">
      <div className="text-primary">&quot;Plan. Schedule. Connect.&quot;</div>
      <div className="text-secondary bg-white w-full text-center">
        &quot;Plan. Schedule. Connect.&quot;
      </div>
      <div className="text-tertiary">&quot;Plan. Schedule. Connect.&quot;</div>
      <div className="text-outline bg-white w-full text-center">
        &quot;Plan. Schedule. Connect.&quot;
      </div>
      <div className="text-extra">&quot;Plan. Schedule. Connect.&quot;</div>
      <div className="text-text  bg-white w-full text-center">
        &quot;Plan. Schedule. Connect.&quot;
      </div>
      <div className="absolute right-2 bottom-2"></div>
    </main>
  );
}
