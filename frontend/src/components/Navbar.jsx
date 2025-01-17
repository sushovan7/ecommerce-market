import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { shopContext } from "../context/ShopContext";

function Navbar() {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const { location, handleSearch, getCartCount, handleLogout, isLoggedIn } =
    useContext(shopContext);
  console.log(isLoggedIn);

  return (
    <nav className="flex mb-5 text-gray-800  py-2 items-center justify-between">
      <Link to={"/"}>
        <img src={assets.logo} alt="main-logo" className="sm:w-40 w-36" />
      </Link>
      <div className=" hidden sm:flex sm:items-center gap-5 sm:text-lg text-gray-800">
        <NavLink to={"/"}>
          <p>Home</p>
          <hr className="border-none hidden w-full h-[1.5px]  bg-gray-900 " />
        </NavLink>
        <NavLink to={"collection"}>
          <p>Collection</p>
          <hr className="border-none hidden w-full h-[1.5px]  bg-gray-900 " />
        </NavLink>
        <NavLink to={"about"}>
          <p>About</p>
          <hr className="border-none hidden w-full h-[1.5px]  bg-gray-900 " />
        </NavLink>
        <NavLink to={"contact"}>
          <p>Contact</p>
          <hr className="border-none hidden w-full h-[1.5px]  bg-gray-900 " />
        </NavLink>
      </div>
      <div className="flex sm:gap-4 gap-5 items-center text-gray-800">
        <div
          onClick={handleSearch}
          className={`${
            location.pathname === "/collection" ? "block" : "hidden"
          } cursor-pointer`}
        >
          <img
            src={assets.search_icon}
            alt="search-icon"
            className="sm:w-5 w-6"
          />
        </div>
        <div className="cursor-pointer group relative ">
          {isLoggedIn ? (
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-black text-white ">
              S
            </div>
          ) : (
            <img
              src={assets.profile_icon}
              alt="profile-icon"
              className="sm:w-5 w-6"
            />
          )}

          <div className="absolute hidden py-6  w-[10vw] pt-4 group-hover:block top-0 -right-5">
            <div className="flex  rounded shadow-lg flex-col gap-4 bg-gray-100 px-4 py-2 mt-4">
              {isLoggedIn ? (
                <>
                  <Link
                    className="hover:text-black hover:bg-gray-300 px-3 py-2"
                    to={"/orders"}
                  >
                    Orders
                  </Link>{" "}
                  <Link
                    onClick={handleLogout}
                    className="hover:text-black hover:bg-gray-300 px-3 py-2"
                    to={"/"}
                  >
                    Logout
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    className="hover:text-black hover:bg-gray-300 px-3 py-2"
                    to={"/login"}
                  >
                    Login
                  </Link>{" "}
                </>
              )}
            </div>
          </div>
        </div>
        <Link to={"/cart"} className="cursor-pointer relative">
          <img src={assets.cart_icon} alt="cart-icon" className="sm:w-5 w-6 " />
          <div className="bg-black flex justify-center items-center text-xs absolute -bottom-1 -right-3 text-white h-5 w-5 rounded-full">
            {getCartCount()}
          </div>
        </Link>
        <div
          onClick={() => setVisible(true)}
          className="sm:hidden w-6 cursor-pointer"
        >
          <img src={assets.menu_icon} alt="" />
        </div>
      </div>
      <div
        className={`w-screen sm:hidden pt-4 px-6 absolute z-40 top-0 left-0 h-screen bg-white ${
          visible ? "block" : "hidden"
        } `}
      >
        <div
          onClick={() => {
            setVisible(false);
            navigate(-1);
          }}
          className="flex absolute top-4 left-10 cursor-pointer gap-4 text-lg"
        >
          <img
            src={assets.dropdown_icon}
            alt="dropdown-icon"
            className="w-4 rotate-180"
          />
          Back
        </div>
        <div className="w-full h-full relative ">
          <div className="flex mt-20 flex-col justify-center items-center text-xl  gap-6">
            {" "}
            <Link
              to={"/"}
              onClick={() => {
                setVisible(false);
              }}
              className="pt-3 font-bold hover:text-black"
            >
              Home
            </Link>
            <Link
              to={"collection"}
              onClick={() => {
                setVisible(false);
              }}
              className="pt-3 font-bold hover:text-black"
            >
              Collection
            </Link>
            <Link
              to={"about"}
              onClick={() => {
                setVisible(false);
              }}
              className="pt-3 font-bold hover:text-black"
            >
              About
            </Link>
            <Link
              to={"contact"}
              onClick={() => {
                setVisible(false);
              }}
              className="pt-3 font-bold hover:text-black"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
