import React, { useRef, useEffect } from "react";
import { Box, Input } from "@mui/material";

interface OtpInputProps {
  length: number;
  value: string[];
  onChange: (otp: string[]) => void;
}

const OtpInput: React.FC<OtpInputProps> = ({ length, value, onChange }) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index: number, digit: string) => {
    if (digit.length > 1) return; // Prevent multiple digits
    const newOtp = [...value];
    newOtp[index] = digit;
    onChange(newOtp);

    // Move to next input if available
    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };



  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").slice(0, length);
    const newOtp = [...value];
    for (let i = 0; i < pastedData.length; i++) {
      if (/^\d+$/.test(pastedData[i])) {
        newOtp[i] = pastedData[i];
      }
    }
    onChange(newOtp);
    inputRefs.current[Math.min(pastedData.length, length - 1)]?.focus();
  };

  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      {[...Array(length)].map((_, index) => (
        <Input
          key={index}
          inputRef={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          value={value[index]}
          onChange={(e) => handleChange(index, e.target.value)}
          //s onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          sx={{
            width: "3rem",
            height: "3rem",
            fontSize: "1.5rem",
            textAlign: "center",
            "& input": {
              textAlign: "center",
              padding: 0,
            },
          }}
          inputProps={{
            maxLength: 1,
            style: { textAlign: "center" },
          }}
        />
      ))}
    </Box>
  );
};

export default OtpInput;
