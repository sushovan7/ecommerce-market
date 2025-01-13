import React from "react";
import Title from "../components/Title";
import Button from "../components/Button";
import { useForm } from "react-hook-form";
import { emailRegex, passwordRegex } from "../utils/validation";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";

function signup() {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
    },
  });
  async function onSubmit({ fullname, email, password }) {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_API_BASE_URL}/auth/signup`,
        {
          fullname,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response);
      if (response.data.success === false) {
        toast.error(response.data.message);
      } else {
        toast.success("Signup successfull. Please login!!");
        navigate("/login");
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
        <div className="w-full flex items-center justify-center h-screen ">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full h-full md:max-w-[50%] sm:min-w-[70%]  flex flex-col items-center justify-center"
          >
            <Title text1={"JOIN US"} text2={"TODAY"} className={"text-2xl "} />
            <div className="w-full mt-10 flex flex-col gap-5 items-center justify-center">
              <div className="flex flex-col w-full items-center justify-center flex-fol">
                <input
                  type="text"
                  placeholder="Fullname"
                  {...register("fullname", {
                    required: "Fullname is required",
                  })}
                  className="border border-gray-200 text-gray-600 outline-none rounded px-4 py-1 w-[80%]"
                />
                {errors.fullname && (
                  <p className="text-red-700">{errors.fullname.message}</p>
                )}
              </div>
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
                <p>Already have an Account ?</p>
                <Link to={"/login"} className="underline text-blue-400">
                  Login
                </Link>
              </div>
              <Button text={"Signup"} type={"submit"} disabled={isSubmitting} />
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default signup;
