import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { shopContext } from "../context/ShopContext";

function Navbar() {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const { location, handleSearch, getCartCount, handleLogout, isLoggedIn } =
    useContext(shopContext);

  return (
    <nav className="flex mb-5 text-gray-800 py-2 items-center justify-between relative">
      <Link to={"/"}>
        <img src={assets.logo} alt="main-logo" className="sm:w-40 w-36" />
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden sm:flex sm:items-center gap-5 sm:text-lg text-gray-800">
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            isActive ? "text-black font-medium" : "hover:text-black"
          }
        >
          Home
        </NavLink>
        <NavLink
          to={"collection"}
          className={({ isActive }) =>
            isActive ? "text-black font-medium" : "hover:text-black"
          }
        >
          Collection
        </NavLink>
        <NavLink
          to={"about"}
          className={({ isActive }) =>
            isActive ? "text-black font-medium" : "hover:text-black"
          }
        >
          About
        </NavLink>
        <NavLink
          to={"contact"}
          className={({ isActive }) =>
            isActive ? "text-black font-medium" : "hover:text-black"
          }
        >
          Contact
        </NavLink>
      </div>

      {/* Right Side Icons */}
      <div className="flex sm:gap-4 gap-5 items-center text-gray-800">
        {/* Search Icon (only visible on collection page) */}
        {location.pathname === "/collection" && (
          <div
            onClick={handleSearch}
            className="cursor-pointer hover:opacity-80"
          >
            <img
              src={assets.search_icon}
              alt="search-icon"
              className="sm:w-5 w-6"
            />
          </div>
        )}

        {/* Profile Dropdown */}
        <div className="relative group">
          <div className="cursor-pointer flex items-center justify-center">
            {isLoggedIn ? (
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-black text-white font-medium">
                S
              </div>
            ) : (
              <img
                src={assets.profile_icon}
                alt="profile-icon"
                className="sm:w-5 w-6 hover:opacity-80"
              />
            )}
          </div>

          {/* Dropdown Menu */}
          <div
            className="absolute right-0 top-full mt-2 w-48 rounded-md shadow-lg bg-white py-1 z-50 
                         opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                         transition-all duration-200 transform group-hover:translate-y-0 translate-y-1"
          >
            {isLoggedIn ? (
              <>
                <Link
                  to={"/profile"}
                  className=" px-4 py-2 hidden text-sm text-gray-700 hover:bg-gray-100"
                >
                  My Profile
                </Link>
                <Link
                  to={"/orders"}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Orders
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to={"/login"}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Login
              </Link>
            )}
          </div>
        </div>

        {/* Cart Icon */}
        <Link to={"/cart"} className="cursor-pointer relative hover:opacity-80">
          <img src={assets.cart_icon} alt="cart-icon" className="sm:w-5 w-6" />
          <div className="bg-black flex justify-center items-center text-xs absolute -bottom-1 -right-3 text-white h-5 w-5 rounded-full">
            {getCartCount()}
          </div>
        </Link>

        <button
          onClick={() => setVisible(true)}
          className="sm:hidden w-6 cursor-pointer hover:opacity-80"
          aria-label="Open menu"
        >
          <img src={assets.menu_icon} alt="Menu" />
        </button>
      </div>

      {visible && (
        <div className="fixed inset-0 z-40 bg-white sm:hidden">
          <div className="absolute top-4 left-4">
            <button
              onClick={() => {
                setVisible(false);
                navigate(-1);
              }}
              className="flex items-center gap-2 text-lg hover:opacity-80"
            >
              <img
                src={assets.dropdown_icon}
                alt="Close menu"
                className="w-4 rotate-180"
              />
              Back
            </button>
          </div>

          <div className="flex flex-col items-center justify-center h-full gap-6 text-xl">
            <Link
              to={"/"}
              onClick={() => setVisible(false)}
              className="font-bold hover:text-black hover:underline"
            >
              Home
            </Link>
            <Link
              to={"collection"}
              onClick={() => setVisible(false)}
              className="font-bold hover:text-black hover:underline"
            >
              Collection
            </Link>
            <Link
              to={"about"}
              onClick={() => setVisible(false)}
              className="font-bold hover:text-black hover:underline"
            >
              About
            </Link>
            <Link
              to={"contact"}
              onClick={() => setVisible(false)}
              className="font-bold hover:text-black hover:underline"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
