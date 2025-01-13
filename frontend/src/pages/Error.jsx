import React from "react";
import { useNavigate } from "react-router-dom";

function Error() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-scren z-30 absolute top-[50%] left-[50%] -translate-x-[50%] bg-white -translate-y-[50%] items-center justify-center">
      <div className="flex flex-col items-center justify-center h-screen  text-gray-800">
        <h1 className="text-8xl font-bold">404</h1>
        <p className="mt-4 text-lg">
          Oops! The page you’re looking for doesn’t exist.
        </p>
        <button
          className="mt-6 px-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          onClick={() => navigate("/")}
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
}

export default Error;
