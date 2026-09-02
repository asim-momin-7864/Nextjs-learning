import { navbarOptions } from "@/constant/constant";
import Link from "next/link";
import React from "react";

const NavMenu = () => {
  return (
    <div className="absolute h-fit bg-black mt-5 right-5 rounded-2xl">
      <ul className="flex flex-col gap-y-5 py-5 px-15">
        <li key={6}>
          <Link href={"#"}>{"Register"}</Link>
        </li>
        {navbarOptions.map((item) => {
          return (
            <li key={item.id}>
              <Link href={item.url}>{item.title}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default NavMenu;
