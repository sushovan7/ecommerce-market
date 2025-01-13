import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { shopContext } from "../context/ShopContext";

function InputSearchBar() {
  const {
    showSearchBar,
    setShowSearchBar,
    location,
    inputValue,
    setInputValue,
  } = useContext(shopContext);

  return (
    <div
      className={`bg-gray-100 mb-5 w-full min-h-[10vh] flex items-center justify-center ${
        location.pathname === "/collection" && showSearchBar
          ? "block"
          : "hidden"
      }`}
    >
      <div className="flex  w-full justify-center items-center gap-5">
        <div className="relative w-[70%]">
          <input
            onChange={(e) => setInputValue(e.target.value)}
            type="text"
            value={inputValue}
            placeholder="Search"
            className="px-4 outline-none w-full rounded-full border  border-black py-2"
          />
          <img
            src={assets.search_icon}
            alt=""
            className="w-5 absolute top-[50%] cursor-pointer right-4 -translate-y-[50%]"
          />
        </div>

        <img
          onClick={() => setShowSearchBar(false)}
          src={assets.cross_icon}
          alt=""
          className="w-4 cursor-pointer"
        />
      </div>
    </div>
  );
}

export default InputSearchBar;
