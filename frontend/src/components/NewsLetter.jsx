import React from "react";

function NewsLetter() {
  return (
    <div className="w-full py-2 mt-20 flex flex-col  gap-2 items-center  ">
      <div className="text-2xl text-center font-bold text-gray-800">
        <h1 className="font-mono tracking-tighter">
          Subscribe now & get 10% off
        </h1>
      </div>
      <p className="text-sm w-full sm:w-[60%] text-center text-gray-400">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi totam in,
        sed et architecto repudiandae!
      </p>
      <div className="mt-2 w-full sm:[80%] justify-center flex  ">
        <input
          className="px-4 border w-full  -mr-3 outline-none sm:w-[60%]"
          type="email"
          placeholder="Enter your email"
          required
        />
        <button className="bg-black text-lg text-white py-2 px-6">
          Subscribe
        </button>
      </div>
    </div>
  );
}

export default NewsLetter;
