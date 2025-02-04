"use client";
import { Container, Divider, TextField, Typography } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useForgotMutation } from "@/store/slice/authSlices/authSlices";
import { ClipLoader } from "react-spinners";

import ForgotOTPScreen from "@/components/auth/forgotOTPScreen";

interface FormData {
  phone_number: string;
}

const ForgotPasswordPage = () => {
  const { register, handleSubmit, formState } = useForm<FormData>({
    mode: "onBlur",
  });
  const { errors } = formState;
  const [verificationSent, setVerificationSent] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const [forgotPassword, { isLoading }] = useForgotMutation();

  const onSubmit = async (data: FormData) => {
    try {
      await forgotPassword(data).unwrap();
      toast.success("Verification code sent successfully!");

      setPhoneNumber(data.phone_number); // Save phone number for the OTP screen
      setVerificationSent(true); //
    } 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch (error: any) {
      toast.error(error.data?.message || "Failed to send verification code.");
    }
  };

  if (verificationSent) {
    return (
      <ForgotOTPScreen
        phoneNumber={phoneNumber}
        // onBack={() => setVerificationSent(false)}
      />
    );
  }
  return (
    <div className="h-screen flex justify-center items-center p-4">
      <Container
        maxWidth="sm"
        className="px-6 py-8 bg-[#EEF0F2] rounded-lg shadow-lg w-full"
      >
        <div className="space-y-4 text-center flex flex-col items-center mb-5">
          <Image src="/images/mail.png" alt="Mail" width={50} height={50} />
          <h1 className="text-2xl font-semibold text-gray-900">
            Lend with Aloha
          </h1>
          <Divider className="w-full" />
          <h2 className="font-bold text-xl">Forgot Password?</h2>
          <p className="text-center text-gray-700 text-sm">
            Enter your registered phone number, and we’ll send you a
            verification code to reset your password.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="space-y-4 mb-4">
            <label
              htmlFor="phone_number"
              className="text-gray-700 text-sm font-semibold"
            >
              Phone Number
            </label>
            <TextField
              id="phone_number"
              variant="outlined"
              fullWidth
              type="text"
              placeholder="Enter your phone number"
              {...register("phone_number", {
                required: "This field is required",
                // pattern: {
                //   value: /^\d{10}$/,
                //   message: "Enter a valid 10-digit phone number",
                // },
              })}
              error={!!errors.phone_number}
              helperText={errors.phone_number?.message}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <ClipLoader color="white" size={20} />
            ) : (
              "Send Verification Code"
            )}
          </button>
        </form>

        <div className="flex items-center justify-center mt-4 gap-2 text-sm">
          <Typography>Remembered your password?</Typography>
          <a href="/login" className="text-black font-bold hover:underline">
            Sign in
          </a>
        </div>
      </Container>
    </div>
  );
};

export default ForgotPasswordPage;
