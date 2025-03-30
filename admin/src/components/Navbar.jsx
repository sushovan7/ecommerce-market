import axios from "axios";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Navbar() {
  const navigate = useNavigate();
  async function handleLogout() {
    const token = localStorage.getItem("adminToken");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/admin/logout`,
        {},
        {
          headers: {
            token: token,
          },
        }
      );
      if (response.data.success) {
        localStorage.removeItem("adminToken");
        toast.success("Logout successfully");
        navigate("/login");
      }
    } catch (error) {
      toast.error("Logout failed");
    }
  }

  return (
    <nav className="h-16 px-4 sm:px-6 border-b w-full flex items-center justify-between bg-white sticky top-0 z-10">
      <Link to={"/"}>
        <img src={logo} alt="main-logo" className="w-36 sm:w-40" />
      </Link>
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={handleLogout}
          className="px-4 py-1.5 sm:px-6 sm:py-2 rounded-full text-white bg-gray-900 hover:bg-gray-700 text-sm sm:text-base"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
