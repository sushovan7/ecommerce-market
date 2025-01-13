import React from "react";
import { assets } from "../assets/assets";
function HeroSection() {
  return (
    <>
      <div className="w-full h-[65vh] border border-gray-800 flex flex-col  sm:h-2/5 sm:flex-row sm:justify-center sm:items-center ">
        <div className="w-full h-[25vh] sm:h-full sm:w-1/2 flex gap-3 md:gap-5 flex-col justify-center items-center">
          <div className="flex items-center gap-2">
            <hr className="rounded-full bg-black h-1 w-20" />{" "}
            <p className="font-bold text-lg text-gray-700">OUR BESTSELLERS</p>
          </div>
          <h1 className="font-mono  font-bold md:text-3xl text-gray-600 text-2xl">
            LATEST ARRIVALS
          </h1>
          <div className="flex items-center gap-2">
            {" "}
            <p className="font-bold text-lg text-gray-700">SHOP NOW</p>
            <hr className="rounded-full bg-black h-1 w-20" />
          </div>
        </div>
        <div className="w-full h-[40vh] sm:w-1/2 sm:h-full overflow-hidden">
          <img
            src={assets.hero_img}
            alt="hero-img"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </>
  );
}

export default HeroSection;
