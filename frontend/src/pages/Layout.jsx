import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import InputSearchBar from "../components/InputSearchBar";

function Layout() {
  return (
    <>
      <Navbar />
      <InputSearchBar />
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
