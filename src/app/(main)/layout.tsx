import Navbar from "./_components/Navbar";
import Sidebar from "./_components/Sidebar";

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <Navbar />
      <div className="flex h-[90vh] dark:bg-[#21212D]">
        <div className="bg-slate-200 dark:bg-[#35374B] w-full rounded-3xl flex justify-between">
          <Sidebar />
          <div className="w-[85%] bg-[#EDEDEF] dark:bg-[#2c293d] rounded-3xl">
            {" "}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
