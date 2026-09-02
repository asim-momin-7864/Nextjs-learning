"use client";
import { useState } from "react";
import { MdOutlineWbSunny } from "react-icons/md";
import { IoMdMoon } from "react-icons/io";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  return (
    <button
      onClick={() => setIsDark((prev) => !prev)}
      className="p-2 bg-gray-200 rounded-lg text-black font-bold"
    >
      {isDark ? <MdOutlineWbSunny size={16} /> : <IoMdMoon size={16} />}
    </button>
  );
};

export default ThemeToggle;
