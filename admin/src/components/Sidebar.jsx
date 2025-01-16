import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-[15%] px-6 py-6 flex flex-col gap-10 h-[calc(100vh-8vh)] border-r ">
      <NavLink to={"/"} className={`border px-4 py-4 `}>
        Add Product
      </NavLink>
      <NavLink to={"/list-items"} className="border px-4 py-4 ">
        List items
      </NavLink>
      <NavLink to={"/orders"} className="border  px-4 py-4 ">
        Orders
      </NavLink>
    </div>
  );
}

export default Sidebar;
