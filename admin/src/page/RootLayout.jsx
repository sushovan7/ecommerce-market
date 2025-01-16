import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function RootLayout() {
  return (
    <>
      <Navbar />
      <div className="flex w-screen gap-4">
        <Sidebar />
        <div className="px-10 py-6">
          {" "}
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default RootLayout;
