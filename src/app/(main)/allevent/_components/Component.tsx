"use client";

interface ComponentProps {
  type: string;
}

const Component: React.FC<ComponentProps> = ({ type }) => {
  return (
    <div className="bg-white dark:bg-[#35374B] h-[92%] w-[27%] rounded-xl">
      <div className="w-full flex h-[10%] justify-center items-center text-2xl uppercase font-bold dark:text-slate-200">
        {type}
      </div>
    </div>
  );
};

export default Component;
