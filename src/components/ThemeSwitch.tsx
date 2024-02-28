"use client";

import { Moon, Sun } from "lucide-react";
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
    return <Moon size={20} onClick={() => setTheme("light")} />;
  }
  if (resolvedTheme === "light") {
    return <Sun size={20} onClick={() => setTheme("dark")} />;
  }
};

export default ThemeSwitch;
