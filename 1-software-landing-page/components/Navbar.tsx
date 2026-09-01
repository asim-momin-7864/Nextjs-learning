"use client";

import Image from "next/image";
import { VscLayoutMenubar } from "react-icons/vsc";
import { navbarOptions } from "@/constant/constant";
import Link from "next/link";
import NavMenu from "./NavMenu";
import { useState } from "react";

const Navbar = () => {
  // state for menu button
  const [showNavMenu, setShowNavMenu] = useState(false);

  const menuButtonHandler = () => {
    setShowNavMenu((prev) => !prev);
  };

  return (
    <nav className="w-full h-fit bg-gray-800 text-white p-5 ">
      <div className=" mx-auto flex flex-row items-center justify-between py-2 pr-4 pl-2 xl:max-w-5xl bg-black rounded-full">
        {/* Logo Container */}
        <div className=" bg-white rounded-full p-1">
          <div className="relative w-10 h-10">
            <Image src="/s4.png" alt="Logo" fill className="object-contain" />
          </div>
        </div>

        <div className="hidden sm:flex flex-row gap-x-4">
          {navbarOptions.map((item) => {
            return (
              <Link href={item.url} key={item.id} className="font-semibold">
                {item.title}
              </Link>
            );
          })}
        </div>
        <div className="hidden sm:block text-center align-baseline px-2 py-1 bg-white text-black rounded-full">
          fox3@gmail.com
        </div>
        <div className="block sm:hidden" onClick={menuButtonHandler}>
          <VscLayoutMenubar size={30} />
        </div>
      </div>
      {showNavMenu && <NavMenu />}
    </nav>
  );
};

export default Navbar;
