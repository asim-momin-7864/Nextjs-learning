import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <div className="w-full flex flex-col gap-y-5 py-5 sm:flex-row sm:items-center bg-black text-white">
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
          <h3 className="font-bold">Top Software Development Company</h3>
          <h1 className="text-4xl font-bold">
            Providing software solutions for your any
            <span className="text-amber-300"> business</span>
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
            ab cumque, dolor corporis officiis deserunt reprehenderit pariatur
            iste
          </p>
        </div>
        <div>
          <button
            id="button"
            className="font-extrabold bg-white w-32 py-2 text-black rounded-2xl justify-center text-center"
          >
            Discover More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
