import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import Title from "../components/Title";
import { emailRegex, passwordRegex } from "../utils/validation";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import { shopContext } from "../context/ShopContext";

function Login() {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(shopContext);

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit({ email, password }) {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/signin`,
        {
          email,
          password,
        }
      );
      console.log(response);
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("isLoggedIn", false);
        toast.success("User loggedin successfully");

        localStorage.setItem("isLoggedIn", true);
        setIsLoggedIn(true);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error signing up:", error.response?.data || error.message);
    }
  }
  return (
    <>
      {isSubmitting ? (
        <Loader />
      ) : (
        <div className="w-full h-screen flex items-center justify-center ">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full h-full md:max-w-[50%] sm:min-w-[70%] flex flex-col items-center justify-center"
          >
            <Title text1={"WELCOME"} className={"text-2xl "} />
            <div className="w-full mt-10 flex flex-col gap-5 items-center justify-center">
              <div className="flex w-full flex-col items-center justify-center flex-fol">
                <input
                  type="email"
                  placeholder="Email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: emailRegex,
                      message: "Invalid email address",
                    },
                  })}
                  className="border border-gray-200 text-gray-600 outline-none rounded px-4 py-1 w-[80%]"
                />
                {errors.email && (
                  <p className="text-red-700">{errors.email.message}</p>
                )}
              </div>
              <div className="flex w-full flex-col items-center justify-center flex-fol">
                {" "}
                <input
                  type="password"
                  placeholder="Password"
                  {...register("password", {
                    required: "Password is required",
                    pattern: {
                      value: passwordRegex,
                      message: "Password is invalid",
                    },
                  })}
                  className="border border-gray-200 text-gray-600 outline-none rounded px-4 py-1 w-[80%]"
                />
                {errors.password && (
                  <p className="text-red-700 ">{errors.password.message}</p>
                )}
              </div>
              <div className="flex gap-3">
                <p>Don't have an Account ?</p>
                <Link to={"/signup"} className="underline text-blue-400">
                  Signup
                </Link>
              </div>
              <div className="flex gap-3">
                <p>Forget your password?</p>
                <Link
                  to={"/reset-password-otp"}
                  className="underline text-blue-400"
                >
                  Click here
                </Link>
              </div>
              <Button text={"Login"} type={"submit"} disabled={isSubmitting} />
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default Login;
