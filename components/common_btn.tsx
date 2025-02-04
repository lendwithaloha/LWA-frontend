import React from "react";
import { Button } from "@mui/material";
import Link from "next/link";

type ReusableButtonProps = {
  label: string; // Button text
  onTap?: () => void; // Click handler
  disabled?: boolean; // Disable state
  variant?: "text" | "contained" | "outlined"; // MUI Button variants
  link?: string; // Optional link for navigation
  className?: string; // Additional CSS classes
  sx?: object; // Material-UI `sx` styles
  isCustom?: boolean; // For custom button styles
};

const ReusableButton: React.FC<ReusableButtonProps> = ({
  label,
  onTap,
  disabled = false,
  variant = "contained",
  link,
  className = "",
  sx = {},
  isCustom = false,
}) => {
  const buttonContent = isCustom ? (
    <button
      onClick={onTap}
      disabled={disabled}
      className={`${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {link ? <Link href={link}>{label}</Link> : label}
    </button>
  ) : (
    <Button
      variant={variant}
      onClick={onTap}
      disabled={disabled}
      sx={{
        boxShadow: "none",
        "&:hover": { boxShadow: "none" },
        ...sx,
      }}
      className={className}
    >
      {link ? <Link href={link}>{label}</Link> : label}
    </Button>
  );

  return <div className="mt-4 flex justify-start">{buttonContent}</div>;
};

export default ReusableButton;
