import React from "react";
import Title from "../components/Title";
import { useForm } from "react-hook-form";
import { emailRegex, passwordRegex } from "../utils/validation";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function PasswordReset() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      otp: "",
      newPassword: "",
    },
  });
  async function onSubmit({ email, otp, newPassword }) {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_API_BASE_URL}/auth/reset-password`,
        {
          email,
          otp,
          newPassword,
        }
      );

      if (response.data.success === false) {
        toast.error(response.data.message);
      } else {
        toast.success(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.error(
        "Error sending otp:",
        error.response?.data || error.message
      );
    }
  }
  return (
    <div className="w-full h-screen flex items-center justify-center ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full h-full sm:w-[70%]    flex flex-col items-center justify-center"
      >
        <Title
          text1={"CHANGE YOUR"}
          text2={"PASSWORD"}
          className={"text-2xl "}
        />
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
          </div>{" "}
          <div className="flex w-full flex-col items-center justify-center flex-fol">
            <input
              type="text"
              placeholder="OTP"
              {...register("otp", {
                required: "OTP is required",
                pattern: {
                  message: "Invalid OTP",
                },
              })}
              className="border border-gray-200 text-gray-600 outline-none rounded px-4 py-1 w-[80%]"
            />
            {errors.otp && <p className="text-red-700">{errors.otp.message}</p>}
          </div>
          <div className="flex w-full flex-col items-center justify-center flex-fol">
            <input
              type="password"
              placeholder="New password"
              {...register("newPassword", {
                required: "Password is required",
                pattern: {
                  value: passwordRegex,
                  message: "Password is invalid",
                },
              })}
              className="border border-gray-200 text-gray-600 outline-none rounded px-4 py-1 w-[80%]"
            />
            {errors.newPassword && (
              <p className="text-red-700 ">{errors.newPassword.message}</p>
            )}
          </div>
          <Button text={"Submit"} type={"submit"} disabled={isSubmitting} />
        </div>
      </form>
    </div>
  );
}

export default PasswordReset;
