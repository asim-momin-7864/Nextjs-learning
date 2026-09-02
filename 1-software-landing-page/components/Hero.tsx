import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <div className="w-full flex flex-col gap-y-5 py-5 sm:flex-row sm:items-center bg-slate-950 text-white">
      <div className="relative w-full h-50 sm:order-2">
        <Image
          src={"/hero.png"}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
          className="object-contain"
          alt="hero"
        />
      </div>
      <div className="flex flex-col gap-y-5 px-5 sm:order-1">
        <div className="flex flex-col gap-y-3">
          <h3 className="font-bold text-lg text-gray-300">Top Software Development Company</h3>
          <h1 className="text-4xl font-bold">
            Providing software solutions for your any
            <span className="text-blue-400"> business</span>
          </h1>
          <p className="text-gray-200">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
            ab cumque, dolor corporis officiis deserunt reprehenderit pariatur
            iste
          </p>
        </div>
        <div>
          <button
            id="button"
            className="font-extrabold bg-blue-600 hover:bg-blue-500 px-8 py-3 w-fit text-white rounded-2xl transition-all hover:scale-105"
          >
            Discover More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
