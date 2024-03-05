export default function Layout({
  user,
  events,
}: {
  events: React.ReactNode;
  user: React.ReactNode;
}) {
  return (
    <div className="h-full w-full rounded-xl flex justify-center items-center">
      <div className="w-[99%] h-[95%] m-10 bg-white dark:bg-[#35374B]  rounded-xl">
        <div className="h-[60%]  w-full rounded-t-xl">{user}</div>
        <div className="h-[40%]  w-full rounded-b-xl">{events}</div>
      </div>
    </div>
  );
}
