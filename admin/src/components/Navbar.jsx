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
      console.log(response);
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
    <nav className="flex h-[10vh] px-10  border-b w-screen text-gray-800 items-center justify-between">
      <Link to={"/"}>
        <img src={logo} alt="main-logo" className="sm:w-40 w-36" />
      </Link>
      <div className="flex items-center gap-3">
        <Link
          to="/login"
          className="px-6 py-2 rounded-full text-white  bg-gray-700 hover:bg-gray-500"
        >
          Signin
        </Link>
        <button
          onClick={handleLogout}
          className="px-6 py-2 rounded-full text-white  bg-gray-700 hover:bg-gray-500"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
