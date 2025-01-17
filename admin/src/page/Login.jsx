import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(event) {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/admin/signin`,
        {
          email,
          password,
        }
      );
      console.log(response);
      if (response.data.success) {
        localStorage.setItem("adminToken", response.data.token);
        toast.success("admin logged in successfully");
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error signing up:", error.response?.data || error.message);
      toast.error("Login failed. Please try again.");
    }
  }
  return (
    <>
      <div className="w-screen   h-screen flex items-center justify-center ">
        <div className="w-[50%] px-10 py-10 h-[30%] flex items-center justify-center border shadow-lg ">
          <form
            onSubmit={handleLogin}
            className=" w-full h-full flex flex-col items-center justify-center"
          >
            <h1 className="text-3xl">Please sign In:</h1>
            <div className="w-full mt-10 flex flex-col gap-5 items-center justify-center">
              <div className="flex w-full flex-col items-center justify-center flex-fol">
                <input
                  type="email"
                  required
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border border-gray-200 text-gray-600 outline-none rounded px-4 py-1 w-[80%]"
                />
              </div>
              <div className="flex w-full flex-col items-center justify-center flex-fol">
                <input
                  type="password"
                  required
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border border-gray-200 text-gray-600 outline-none rounded px-4 py-1 w-[80%]"
                />
              </div>
              <button
                type="submit"
                className="bg-gray-900 rounded-lg text-lg font-bold text-white px-12 py-2"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
