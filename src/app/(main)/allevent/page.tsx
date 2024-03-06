import Component from "./_components/Component";

const page = () => {
  return (
    <div className="flex justify-evenly h-full w-full items-center">
      <Component type={"Work"} />
      <Component type={"Personal"} />
      <Component type={"Social"} />
    </div>
  );
};

export default page;
