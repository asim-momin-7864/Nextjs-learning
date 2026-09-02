import React from "react";
import Image from "next/image";
import Link from "next/link";
import { GoLinkExternal } from "react-icons/go";

export const Card = () => {
  return (
    <div className="flex flex-col gap-y-5 p-5 rounded-xl bg-slate-800 w-full h-full">
      <div>
        <Image
          src="/s1.png"
          alt="icon"
          width={512}
          height={512}
          className="w-14 h-auto object-contain"
        />
      </div>
      <h3 className="font-semibold text-lg">Custome Software Design</h3>
      <p className="text-gray-300 text-sm">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo dicta
        pariatur cupiditate molestias, vitae dignissimos
      </p>
      <div>
        <Link
          href={"#"}
          className="flex gap-x-1 items-center font-bold text-base hover:text-blue-400 transition-colors"
        >
          Learn More
          <span>
            <GoLinkExternal />
          </span>
        </Link>
      </div>
    </div>
  );
};
