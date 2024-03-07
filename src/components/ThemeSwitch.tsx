"use client";

import { Moon, MoonStar, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <>...</>;
  }
  if (resolvedTheme === "dark") {
    return (
      <div
        onClick={() => setTheme("light")}
        className="flex cursor-pointer justify-center items-center bg-gray-300 dark:bg-[#15141A] rounded-xl border-2 dark:border-gray-400 border-black px-4"
      >
        <MoonStar size={18} />
      </div>
    );
  }
  if (resolvedTheme === "light") {
    return (
      <div
        onClick={() => setTheme("dark")}
        className="flex cursor-pointer justify-center items-center bg-gray-300 dark:bg-[#15141A] rounded-xl border-2 dark:border-gray-400 border-black px-4"
      >
        <Sun size={18} />
      </div>
    );
  }
};

export default ThemeSwitch;
