import { getServerSession } from "next-auth";
import Navbar from "./_components/Navbar";
import Sidebar from "./_components/Sidebar";
import { redirect } from "next/navigation";

const MainLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await getServerSession();
  if (!session) {
    redirect("/");
  }
  return (
    <div className=" ">
      <Navbar />
      <div className="duration-500 flex h-[90vh] dark:bg-[#020817]">
        <div className="bg-white dark:bg-[#020817] w-full rounded-xl flex justify-between mx-2 mb-2">
          <Sidebar />
          <div className="w-[85%] bg-gray-200 dark:bg-[#2c293d] rounded-xl ">
            {" "}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
