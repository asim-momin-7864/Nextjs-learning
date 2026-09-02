"use client";
import { useTheme } from "next-themes";
import { MdOutlineWbSunny } from "react-icons/md";
import { IoMdMoon } from "react-icons/io";

const ThemeToggle = () => {
  const { setTheme } = useTheme();

  const handlerToggle = () => {
    // Read the current theme from the html class directly, not from resolvedTheme
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "light" : "dark");
  };

  // Both icons are always rendered on server AND client → no hydration mismatch.
  // CSS dark: classes control which one is visible.
  return (
    <button
      onClick={handlerToggle}
      className="p-2 bg-gray-200 dark:bg-gray-800 rounded-lg text-black dark:text-white font-bold"
    >
      {/* Sun: visible in dark mode */}
      <MdOutlineWbSunny size={16} className="hidden dark:block" />
      {/* Moon: visible in light mode */}
      <IoMdMoon size={16} className="block dark:hidden" />
    </button>
  );
};

export default ThemeToggle;
