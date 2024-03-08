import Loader from "@/components/Loader/Loader";

const loading = () => {
  return (
    <div className="flex justify-center items-center w-[100vw] h-[100vh] text-white">
      <Loader />
    </div>
  );
};

export default loading;
