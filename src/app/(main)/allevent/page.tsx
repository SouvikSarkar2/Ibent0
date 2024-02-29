import Component from "./_components/Component";

const page = () => {
  return (
    <div className="flex justify-evenly h-full w-full items-center">
      <Component type={"work"} />
      <Component type={"personal"} />
      <Component type={"social"} />
    </div>
  );
};

export default page;
