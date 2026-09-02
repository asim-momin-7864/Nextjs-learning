import React from "react";
import Image from "next/image";

const About = () => {
  return (
    <div className="w-full bg-gray-800 text-white flex flex-col gap-y-5 py-5 lg:flex-row items-center">
      <div className="relative w-full h-50 sm:h-70 lg:w-1/2">
        <Image
          src="/about.png"
          alt="about-us"
          priority
          fill
          className="object-contain"
        />
      </div>
      <div className="space-y-5 px-5 lg:w-1/2">
        <div className="font-bold text-xl text-amber-300 tracking-wide">ABOUT US</div>
        <div className="font-semibold text-3xl lg:text-5xl">
          Innovations Excellence Building Digital Future Together
        </div>
        <div>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus
          pariatur velit suscipit ut vitae ab placeat odit similique
          exercitationem aliquid.
        </div>
        <div className=" grid grid-cols-1 justify-items-start gap-y-5 sm:grid-cols-2">
          <div className="flex flex-row items-center justify-center gap-x-2">
            <Image
              src="/a1.png"
              height={48}
              width={50}
              alt="icon"
              className="h-auto w-12"
            />
            <h3 className="font-bold text-lg w-40 leading-tight text-gray-200">
              IT Infrastructure Management
            </h3>
          </div>
          <div className="flex flex-row items-center justify-center gap-x-2">
            <Image
              src="/a1.png"
              height={48}
              width={50}
              alt="icon"
              className="h-auto w-12"
            />
            <h3 className="font-bold text-lg w-40 leading-tight text-gray-200">
              IT Infrastructure Management
            </h3>
          </div>
          <div className="flex flex-row items-center justify-center gap-x-2">
            <Image
              src="/a1.png"
              height={48}
              width={50}
              alt="icon"
              className="h-auto w-12"
            />
            <h3 className="font-bold text-lg w-40 leading-tight text-gray-200">
              IT Infrastructure Management
            </h3>
          </div>
          <div className="flex flex-row items-center justify-center gap-x-2">
            <Image
              src="/a1.png"
              height={48}
              width={50}
              alt="icon"
              className="h-auto w-12"
            />
            <h3 className="font-bold text-lg w-40 leading-tight text-gray-200">
              IT Infrastructure Management
            </h3>
          </div>
        </div>
        <div>
          <button className="font-bold bg-blue-800 py-4 px-6 rounded-full">
            ABOUT MORE
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
