import React from "react";
import Container from "../ui/Container";
import Image from "next/image";
import { Button } from "../ui/button";

const Hero = () => {
  //  why this div - so we can set bg color, full width, and sizing spacing if need accoridng to each section
  return (
    <div className="w-full bg-card h-auto py-5">
      <Container as="section">
        <div className="flex flex-col gap-y-5 lg:flex-row items-center justify-items-center ">
          <div className="relative w-full h-64 md:h-96">
            <Image
              src="/pizza-2.png"
              alt="banner-image"
              priority
              fill
              className="object-contain"
            />
          </div>
          <div className="flex flex-col gap-y-3 lg:w-1/2">
            <div>
              <p className="font-extrabold text-5xl">
                Super Delicious Pizza in
                <span className="lining-nums text-chart-2">
                  {" "}
                  Only 45 Minutes!
                </span>
              </p>
            </div>
            <div>
              <p>Enjoy a free meal if your order takes more than 45 minutes!</p>
            </div>
            <div>
              <Button className={"bg-chart-2"}>Get your pizza now</Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Hero;
