import React from "react";
import Image from "next/image";
import Link from "next/link";
import { GoLinkExternal } from "react-icons/go";

export const Card = () => {
  return (
    <div className="flex flex-col gap-y-5 p-5 rounded-xl bg-blue-900 w-80 sm:w-70">
      <div>
        <Image
          src="/s1.png"
          alt="icon"
          width={512}
          height={512}
          className="w-14 h-auto object-contain"
        />
      </div>
      <h3 className="font-semibold text-xl">Custome Software Design</h3>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo dicta
        pariatur cupiditate molestias, vitae dignissimos
      </p>
      <div>
        <Link
          href={"#"}
          className="flex gap-x-1 items-center font-bold text-lg"
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
