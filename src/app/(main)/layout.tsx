import { getServerSession } from "next-auth";
import Navbar from "./_components/Navbar";
import Sidebar from "./_components/Sidebar";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";

const MainLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await getServerSession();
  const prisma = new PrismaClient();
  let id: undefined | string = undefined;
  const email = session?.user?.email;

  const data = await prisma.user.findFirst({
    where: {
      email: email ?? "",
    },
  });
  id = data?.id;
  // console.log("data :", data);

  if (!session) {
    redirect("/");
  }

  if (data === null) {
    const user = await prisma.user.create({
      data: {
        name: session?.user?.name ?? "",
        email: session?.user?.email ?? "",
        color: "#0284C7",
        status: "My Status",
        img: session?.user?.image,
      },
    });
    id = user.id;
    // console.log("user :", user);
  }

  return (
    <div className=" ">
      <Navbar id={id} />
      <div className="duration-500 flex h-[90vh] dark:bg-[#020817]">
        <div className="bg-white dark:bg-[#020817] w-full rounded-xl flex justify-between mx-2 mb-2">
          <Sidebar />
          <div className="w-[85%] bg-gray-200 dark:bg-[#2c293d] rounded-xl ">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
