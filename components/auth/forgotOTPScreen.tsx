"use client";
import {
  useResendForgotMutation,
  useVerifyMutation,
} from "@/store/slice/authSlices/authSlices";
import { Box, Container, Divider, Typography } from "@mui/material";

import Image from "next/image";
import React, { useState } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { ResetPasswordForm } from "./resetPasswordForm";

const ForgotOTPScreen = ({
  phoneNumber,
}: {
  phoneNumber: string;
}) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [verify, { isLoading: isVerifying }] = useVerifyMutation();
  const [resendforgotPassword, { isLoading }] = useResendForgotMutation();
  const [isVeified, setIsVerified] = useState(false);
  const [token, setToken] = useState("");

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return; // Prevent multiple digits
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

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

    try {
      const response = await verify({
        phone_number: phoneNumber,
        verification_code: verificationCode,
        verification_type: "registration",
      }).unwrap();

      toast.success("Account activated successfully!");
      setToken(response.reset_password_token);
      setIsVerified(true);
    } 
     // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch (error: any) {
      toast.error(
        error?.data?.message || "Activation failed. Please try again."
      );
    }
  };

  const handleResend = async (phoneNumber: string) => {
    try {
      await resendforgotPassword({
        phone_number: phoneNumber,
      }).unwrap();
      toast.success("Verification code sent successfully!");

       // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.data?.message || "Failed to send verification code.");
    }
  };

  if (isVeified) {
    return <ResetPasswordForm token={token} />;
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <Container
        maxWidth="sm"
        className="px-10 py-6 mt-16 bg-[#EEF0F2] flex gap-2 justify-around"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 3,
            gap: 3,
            width: "50%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Image src="/images/mail.png" alt="mail" width={70} height={70} />
            <Typography>Lend with Aloha </Typography>
          </Box>
          <Divider flexItem />
          <div className="space-y-4 text-center">
            <h1 className="text-2xl font-semibold text-gray-900">
              Verify Your Identity
            </h1>
            <p className="w-[400px] text-gray-500 ">
              We’ve sent a 4-digit verification code to your phone number. Enter
              the code below to proceed.
            </p>
            <div className="flex gap-4 justify-center py-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  inputMode="numeric"
                  pattern="\d*"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-20 max-sm:w-14 bg-transparent  h-14 text-center text-2xl font-semibold border border-gray-400 rounded-lg focus:border-gray-400 focus:ring-0 focus:outline-none"
                />
              ))}
            </div>
            <p className="text-center text-sm">
              Don&apos;t receive the OTP?{" "}
              <button
                className="text-gray-900 hover:underline font-medium"
                onClick={() => handleResend(phoneNumber)}
              >
                {isLoading ? (
                  <ClipLoader size={24} color="black" />
                ) : (
                  "Resend OTP"
                )}
              </button>
            </p>
            <button
              className="w-full bg-black text-white hover:bg-black/9 py-2 rounded"
              onClick={handleSubmit}
            >
              {isVerifying ? <ClipLoader size={24} color="white" /> : "Verify"}
            </button>
          </div>
        </Box>
      </Container>
    </div>
  );
};

export default ForgotOTPScreen;
