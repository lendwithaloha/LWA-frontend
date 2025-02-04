"use client";
import {
  useActivateMutation,
  useResendActivationMutation,
} from "@/store/slice/authSlices/authSlices";
import { RootState } from "@/store/store";
import { ApiError } from "@/types/api-error";
import { ArrowBack } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Divider,
  Typography,
  CircularProgress,
} from "@mui/material";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ActivationOtp = ({ onBack }: { onBack: () => void }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [activateAccount, { isLoading: isActivating }] = useActivateMutation();
  const [resendAcitvationCode, { isLoading: IsResending }] =
    useResendActivationMutation();
  const router = useRouter();
  const phoneNumber = useSelector(
    (state: RootState) => state.user?.user?.phone_number
  );

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return; // Prevent multiple digits
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmit = async () => {
    const verificationCode = otp.join("");

    if (verificationCode.length !== 4 || isNaN(Number(verificationCode))) {
      toast.error("Please enter a valid 4-digit OTP.");
      return;
    }

    interface ApiError {
      data?: {
        message?: string;
      };
    }

    try {
      await activateAccount({
        phone_number: phoneNumber,
        verification_code: verificationCode,
        verification_type: "registration",
      }).unwrap();

      toast.success("Account activated successfully!");
      router.push("/done");
    } catch (error) {
      const apiError = error as ApiError; // Type assertion
      toast.error(
        apiError?.data?.message || "Activation failed. Please try again."
      );
    }
  };
  const handlResend = async () => {
    try {
      await resendAcitvationCode({
        phone_number: phoneNumber,
      }).unwrap();
      toast.success("OTP resend Successfully");
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const apiError = error as ApiError;
      toast.error(apiError?.data?.message || "Resend Fail. Please try again.");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center p-4">
      <Container
        maxWidth="lg"
        className="bg-[#EEF0F2] px-6 py-8 rounded-lg shadow-lg flex flex-col md:flex-row items-center gap-6 md:gap-0"
      >
        {/* Left Section */}
        <Box className="flex flex-col items-center gap-4 w-full md:w-1/2">
          <Image
            src="/images/loha.png"
            alt="Logo"
            width={60}
            height={60}
            className="w-12"
          />
          <Typography className="text-lg text-primaryColor font-semibold">
            Lend with Aloha
          </Typography>
          <Image
            src="/images/registration-illustration.png"
            alt="Logo"
            width={290}
            height={290}
            className="w-60 md:w-72"
          />
        </Box>

        {/* Divider */}
        <Divider
          orientation="horizontal"
          flexItem
          className="md:orientation-vertical hidden md:block"
        />

        {/* Right Section */}
        <Box className="flex flex-col items-center w-full md:w-1/2 gap-6">
          {/* Back Button */}
          <Box
            className="flex text-primaryColor items-center self-start gap-2 cursor-pointer"
            onClick={onBack}
          >
            <ArrowBack />
            <Typography className="text-sm  font-medium">Back</Typography>
          </Box>

          {/* OTP Content */}
          <div className="space-y-4 text-center">
            <h1 className="text-2xl font-semibold text-primaryColor">
              OTP Verification
            </h1>
            <p className="text-gray-500 text-sm md:text-base px-2 md:px-6">
              Enter the OTP sent to your phone number to finalize your
              registration
            </p>

            {/* OTP Input */}
            <div className="flex justify-center gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="bg-transparent w-20 h-14 text-center text-2xl font-semibold border border-gray-400 rounded-md focus:border-gray-600 focus:outline-none"
                />
              ))}
            </div>

            <p className="text-sm text-gray-700 mb-2">
              Don&apos;t receive the OTP?{" "}
              <button
                className="text-primaryColor hover:underline font-medium"
                onClick={handlResend}
              >
                {IsResending ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Resend "
                )}
              </button>
            </p>
          </div>
          <div className="w-full">
            <Button
              variant="contained"
              className="w-full bg-primaryColor text-white hover:bg-primaryColor/90 py-3 rounded-md"
              onClick={handleSubmit}
              disabled={isActivating}
            >
              {isActivating ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </Box>
      </Container>
    </div>
  );
};

export default ActivationOtp;
