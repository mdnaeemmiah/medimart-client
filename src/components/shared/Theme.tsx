"use client"; // for Next.js App Router

import { useEffect, useState } from "react";

const Theme = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // On mount, check for stored theme or system preference
    const storedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.classList.toggle("dark", storedTheme === "dark");
    } else {
      const defaultTheme = prefersDark ? "dark" : "light";
      setTheme(defaultTheme);
      document.documentElement.classList.toggle("dark", prefersDark);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm">{theme === "dark" ? "Dark" : "Light"} Mode</span>
      <button
        onClick={toggleTheme}
        className="px-3 py-1 rounded bg-gray-300 dark:bg-gray-700 text-black dark:text-white transition"
      >
        Toggle
      </button>
    </div>
  );
};

export default Theme;
