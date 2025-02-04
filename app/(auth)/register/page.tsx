"use client";

import { Box, Container, Divider } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useSignUpMutation } from "@/store/slice/authSlices/authSlices";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/slice/user/userSlice";
import { ClipLoader } from "react-spinners";
import { useState } from "react";
import ActivationOtp from "@/components/auth/activationOTP";
import { ApiError } from "@/types/api-error";
import { useSearchParams } from "next/navigation";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

export default function RegistrationForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();
  const [signUp, { isLoading }] = useSignUpMutation();
  const [registered, setRegistered] = useState(false);
  const dispatch = useDispatch(); // Initialize Redux dispatch
  const password = watch("password");
  const searchParams = useSearchParams();
  const invitationToken = searchParams.get("invitation_token") || "";

  const onSubmit = async (data: FormData) => {
    try {
      const jsonData = {
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone_number: data.phoneNumber,
        password: data.password,
        confirm_password: data.confirmPassword,
        invitation_token: invitationToken,
      };

      const response = await signUp(jsonData).unwrap();

      const { id, email, username, first_name, last_name, phone_number,role } =
        response;

      const userData = {
        id,
        email,
        username,
        first_name,
        last_name,
        phone_number,
        role
      };

      // Store non-sensitive user data in localStorage
      localStorage.setItem("userData", JSON.stringify(userData));


      // Update Redux state
      dispatch(setUser({ user: userData }));

      toast.success(`Registration successful!`);
      setRegistered(true);
    } catch (err) {
      const apiError = err as ApiError;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      console.log("Error occurred:", err);

      if (apiError instanceof TypeError && apiError.message.includes("CORS")) {
        toast.error("CORS error: Unable to reach the backend.");
      } else if (apiError?.data?.error) {
        toast.error(apiError.data.error);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };

  if (registered) {
    return <ActivationOtp onBack={() => setRegistered(false)} />;
  }

  return (
    <div className="min-h-screen flex justify-center items-center p-4">
      <Container
        maxWidth="lg"
        className="flex max-sm:flex-col bg-[#EEF0F2] mt-10 lg:mt-20 p-8 lg:p-10 justify-center gap-8 rounded-lg shadow-lg"
      >
        {/* Left Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            maxWidth: "400px",
            gap: 6,
          }}
        >
          <div className="flex flex-col items-center gap-2 max-sm:flex-col">
            <Image
              src="/images/loha.png"
              alt="Mail"
              width="60"
              height="60"
              className="self-center"
            />
            <h1 className="text-lg text-primaryColor font-semibold">
              Lend with Aloha
            </h1> 
          </div>
          <Image
            src="/images/registration-illustration.png"
            alt="Mail"
            width="300"
            height="300"
          />
        </Box>

        <Divider orientation="vertical" flexItem className="hidden lg:block" />

        {/* Right Section */}
        <Box className="w-full max-w-lg">
          <h1 className="text-2xl font-semibold text-primaryColor mb-6">
            Create Your Account
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-3">
            {/* First and Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <input
                  {...register("firstName", {
                    required: "First Name is required",
                  })}
                  id="firstName"
                  type="text"
                  className="bg-transparent w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-black focus:outline-none"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <input
                  {...register("lastName", {
                    required: "Last Name is required",
                  })}
                  id="lastName"
                  type="text"
                  className="bg-transparent w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-black focus:outline-none"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            {/* Email and Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email format",
                    },
                  })}
                  id="email"
                  type="email"
                  className="bg-transparent w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-black focus:outline-none"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  {...register("phoneNumber", {
                    required: "Phone Number is required",
                  })}
                  id="phoneNumber"
                  type="tel"
                  className="bg-transparent w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-black focus:outline-none"
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-xs">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>
            </div>

            {/* Password and Confirm Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                id="password"
                type="password"
                className="bg-transparent w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-black focus:outline-none"
              />
              {errors.password && (
                <p className="text-red-500 text-xs">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                id="confirmPassword"
                type="password"
                className="bg-transparent w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-black focus:outline-none"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Terms Agreement */}
            <div className="flex items-center space-x-2 mb-2">
              <input
                {...register("agreeToTerms", {
                  required: "You must agree to the terms and conditions",
                })}
                id="terms"
                type="checkbox"
                className="h-4 w-4 text-primaryColor focus:ring-black border-gray-300 rounded"
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the Terms of Service and Privacy Policy.
              </label>
            </div>
            {errors.agreeToTerms && (
              <p className="text-red-500 text-xs">
                {errors.agreeToTerms.message}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-primaryColor text-white py-2 px-4 rounded-md hover:bg-primaryColor/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              disabled={isLoading}
            >
              {isLoading ? <ClipLoader color="white" size={24} /> : "Register"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-2">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primaryColor hover:underline font-medium"
            >
              Sign In
            </Link>
          </p>
        </Box>
      </Container>
    </div>
  );
}


