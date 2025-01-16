import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

function Navbar() {
  function handleLogout() {}

  return (
    <nav className="flex h-[8vh] px-10 py-6 border-b w-screen text-gray-800items-center justify-between">
      <Link to={"/"}>
        <img src={logo} alt="main-logo" className="sm:w-40 w-36" />
      </Link>
      <button
        onClick={handleLogout}
        className="px-6 py-3 rounded-full text-white font-bold bg-gray-700 hover:bg-gray-500"
      >
        Logout
      </button>
    </nav>
  );
}

export default Navbar;
